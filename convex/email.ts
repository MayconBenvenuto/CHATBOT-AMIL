// convex/email.ts

"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Resend } from "resend";

export const sendLeadEmail = action({
  args: {
    leadId: v.id("leads"),
    isWarmLead: v.optional(v.boolean()), // Adicionado para diferenciar o lead
  },
  handler: async (ctx, { leadId, isWarmLead }) => {
    console.log(`[sendLeadEmail] Recebida solicitação para enviar email do lead: ${leadId}, Morno: ${!!isWarmLead}`);
    
    try {
      // Validação das variáveis de ambiente
      const resendApiKey = process.env.CONVEX_RESEND_API_KEY;
      if (!resendApiKey) {
        console.error("[sendLeadEmail] ERRO - CONVEX_RESEND_API_KEY não configurada");
        throw new Error("A variável de ambiente CONVEX_RESEND_API_KEY não está configurada.");
      }
      
      const emailDestination = process.env.CONVEX_EMAIL_DESTINATION;
      if (!emailDestination) {
        console.error("[sendLeadEmail] ERRO - CONVEX_EMAIL_DESTINATION não configurada");
        throw new Error("A variável de ambiente CONVEX_EMAIL_DESTINATION não está configurada.");
      }

      const emailFrom = process.env.CONVEX_EMAIL_FROM;
      if (!emailFrom) {
        console.error("[sendLeadEmail] ERRO - CONVEX_EMAIL_FROM não configurada");
        throw new Error("A variável de ambiente CONVEX_EMAIL_FROM não está configurada.");
      }

      console.log("[sendLeadEmail] Variáveis de ambiente validadas com sucesso");

      // Busca os dados do lead no banco
      console.log("[sendLeadEmail] Buscando dados do lead:", leadId);
      const lead = await ctx.runQuery(api.leads.getLead, { leadId: leadId });
      
      if (!lead) {
        console.error("[sendLeadEmail] ERRO - Lead não encontrado para ID:", leadId);
        throw new Error("Lead não encontrado");
      }
      
      console.log("[sendLeadEmail] Dados do lead obtidos com sucesso");

      // --- LÓGICA PARA LEAD MORNO VS COMPLETO ---
      const subject = isWarmLead
        ? "[AMIL] Lead PME Morno: Contato Parcial"
        : "🔥 [AMIL] Lead PME Qualificado:";
      const leadStatus = isWarmLead ? "morno" : "completo";

      // Atualiza o status do lead no banco de dados
      await ctx.runMutation(api.leads.updateLeadStatus, { leadId, status: leadStatus });
      console.log(`[sendLeadEmail] Status do lead ${leadId} atualizado para '${leadStatus}'`);

      let dadosEmpresa = null;
      let dadosEmpresaHtml = "";

      // A busca de dados da empresa só faz sentido para leads completos
      if (!isWarmLead) {
        // Se o lead já tiver dados da empresa armazenados, usamos primeiro
        if (lead.dadosEmpresa) {
          dadosEmpresa = lead.dadosEmpresa;
          console.log("[sendLeadEmail] Usando dados da empresa já armazenados");
        }
        // Se não tiver, mas tiver CNPJ, tentamos validar e buscar os dados
        else if (lead.temCnpj && lead.numeroCnpj) {
          try {
            const cleanedCnpj = lead.numeroCnpj.replace(/\D/g, "");
            console.log("[sendLeadEmail] Buscando dados do CNPJ:", cleanedCnpj);
            const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanedCnpj}`);
            if (response.ok) {
              dadosEmpresa = await response.json();
              // Salva os dados da empresa no banco para futuras consultas
              await ctx.runMutation(api.leads.updateLead, {
                leadId: leadId,
                dadosEmpresa: dadosEmpresa,
              });
              console.log("[sendLeadEmail] Dados da empresa obtidos e salvos");
            }
          } catch (error) {
            console.error("Falha ao buscar dados do CNPJ na BrasilAPI:", error);
          }
        }

        // Monta o HTML se houver dados da empresa
        if (dadosEmpresa) {
          dadosEmpresaHtml = `
          <div class="section">
            <h3>🏢 Dados da Empresa (Validados)</h3>
            <div class="info-item"><strong>Razão Social:</strong> ${dadosEmpresa.razao_social || 'N/A'}</div>
            <div class="info-item"><strong>Nome Fantasia:</strong> ${dadosEmpresa.nome_fantasia || 'N/A'}</div>
            <div class="info-item"><strong>Situação Cadastral:</strong> ${dadosEmpresa.descricao_situacao_cadastral || 'N/A'}</div>
            <div class="info-item"><strong>Atividade Principal:</strong> ${dadosEmpresa.cnae_fiscal_descricao || 'N/A'}</div>
            <div class="info-item"><strong>Endereço:</strong> ${dadosEmpresa.logradouro || ''}, ${dadosEmpresa.numero || ''}, ${dadosEmpresa.bairro || ''} - ${dadosEmpresa.municipio || ''}/${dadosEmpresa.uf || ''}</div>
            <div class="info-item"><strong>CEP:</strong> ${dadosEmpresa.cep || 'N/A'}</div>
            <div class="info-item"><strong>Data de Abertura:</strong> ${dadosEmpresa.data_inicio_atividade || 'N/A'}</div>
          </div>
        `;
        }
      }

      // Preparação do link do WhatsApp e do conteúdo do e-mail
      const whatsappLink = `https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`;
      
      // --- CONSTRUÇÃO DO CORPO DO E-MAIL ---
      const emailBody = isWarmLead
        ? `
        <div style="background:#2196f3;padding:24px 16px 12px 16px;border-radius:12px 12px 0 0;text-align:left;">
          <h1 style="color:#fff;font-size:2rem;margin:0;display:flex;align-items:center;gap:8px;">
            <span style="font-size:2rem;">🧊</span> [AMIL] Lead Morno (Incompleto): ${lead.nome}
          </h1>
        </div>
        <div style="background:#fffbe6;padding:16px 20px;margin-bottom:16px;border-radius:0 0 8px 8px;border:1px solid #ffe58f;">
          <span style="color:#a8071a;font-weight:bold;">Atenção:</span> Este lead não completou o preenchimento no chatbot. Entre em contato para dar continuidade.
        </div>
        <div style="margin:16px 0 8px 0;font-size:1.1rem;font-weight:bold;color:#1e40af;display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.3rem;">📞</span> Dados de Contato
        </div>
        <div style="margin-bottom:8px;"><b>Nome:</b> ${lead.nome}</div>
        <div style="margin-bottom:8px;"><b>WhatsApp:</b> <span style="color:#222;">${lead.whatsapp}</span> <a href="${whatsappLink}" style="background:#22c55e;color:#fff;padding:4px 16px;border-radius:6px;text-decoration:none;font-weight:bold;margin-left:8px;">Conversar</a></div>
        <div style="color:#555;font-size:0.95rem;margin-top:16px;border-top:1px solid #bbb;padding-top:8px;">Lead capturado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</div>
        `
        : `
        <div style="background:#2196f3;padding:24px 16px 12px 16px;border-radius:12px 12px 0 0;text-align:left;">
          <h1 style="color:#fff;font-size:2rem;margin:0;display:flex;align-items:center;gap:8px;">
            <span style="font-size:2rem;">🧊</span> [AMIL] Lead PME Qualificado: ${lead.nome}
          </h1>
        </div>
        <div style="margin:16px 0 8px 0;font-size:1.1rem;font-weight:bold;color:#1e40af;display:flex;align-items:center;gap:8px;">
          <span style="font-size:1.3rem;">📞</span> Dados de Contato
        </div>
        <div style="margin-bottom:8px;"><b>Nome:</b> ${lead.nome}</div>
        <div style="margin-bottom:8px;"><b>WhatsApp:</b> <span style="color:#222;">${lead.whatsapp}</span> <a href="${whatsappLink}" style="background:#22c55e;color:#fff;padding:4px 16px;border-radius:6px;text-decoration:none;font-weight:bold;margin-left:8px;">Conversar</a></div>
        <div style="margin-bottom:8px;"><b>Email:</b> ${lead.email}</div>
        <div style="margin-bottom:8px;"><b>Possui CNPJ?</b> ${lead.temCnpj ? 'Sim' : 'Não'}</div>
        ${lead.temCnpj ? `<div style="margin-bottom:8px;"><b>CNPJ:</b> ${lead.numeroCnpj}</div>` : ''}
        <div style="margin-bottom:8px;"><b>Tipo de Contratação:</b> ${lead.enquadramentoCnpj || 'N/A'}</div>
        <div style="margin-bottom:8px;"><b>Possui Funcionários?</b> ${lead.temFuncionarios ? 'Sim' : 'Não'}</div>
        <div style="margin-bottom:8px;"><b>Idade dos Beneficiários:</b> ${lead.idadesBeneficiarios || 'N/A'}</div>
        <div style="margin-bottom:8px;"><b>Possui plano atual?</b> ${lead.temPlanoAtual ? 'Sim' : 'Não'}</div>
        ${lead.temPlanoAtual ? `<div style="margin-bottom:8px;"><b>Operadora:</b> ${lead.nomePlanoAtual || 'N/A'}</div>` : ''}
        ${lead.temPlanoAtual ? `<div style="margin-bottom:8px;"><b>Valor Mensal:</b> ${lead.valorPlanoAtual || 'N/A'}</div>` : ''}
        ${lead.temPlanoAtual ? `<div style="margin-bottom:8px;"><b>Maior Dificuldade:</b> ${lead.maiorDificuldade || 'N/A'}</div>` : ''}
        ${dadosEmpresaHtml}
        <div style="color:#555;font-size:0.95rem;margin-top:16px;border-top:1px solid #bbb;padding-top:8px;">Lead capturado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</div>
        `;

      const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${subject}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f7f6; margin: 0; padding: 20px; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .header { border-bottom: 2px solid #eeeeee; padding-bottom: 10px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 22px; color: #004a80; }
            .header p { margin: 5px 0 0; font-size: 16px; color: #666; }
            .section { margin-bottom: 20px; padding: 15px; border-radius: 8px; background-color: #f9f9f9; border-left: 5px solid #004a80; }
            .section h3 { margin-top: 0; font-size: 18px; color: #004a80; }
            .info-item { margin-bottom: 8px; }
            .info-item strong { color: #0056b3; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .footer { margin-top: 25px; text-align: center; font-size: 0.9em; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            ${emailBody}
            <div class="footer">
              <p>E-mail enviado automaticamente pelo Chatbot Amil.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const resend = new Resend(resendApiKey);

      console.log("[sendLeadEmail] Enviando e-mail...");
      await resend.emails.send({
        from: emailFrom,
        to: emailDestination,
        subject: subject,
        html: emailContent,
      });

      console.log("[sendLeadEmail] E-mail enviado com sucesso para:", emailDestination);

    } catch (error) {
      console.error("[sendLeadEmail] Falha ao processar a solicitação:", error);
      // Lançar o erro novamente para que a chamada no frontend possa capturá-lo se necessário
      throw error;
    }
  },
});