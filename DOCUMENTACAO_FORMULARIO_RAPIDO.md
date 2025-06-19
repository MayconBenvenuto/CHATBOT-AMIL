# 📋 DOCUMENTAÇÃO - FORMULÁRIO DE CAPTURA RÁPIDA

## 🎯 Objetivo
Criar um formulário simples e rápido para capturar leads interessados em planos de saúde empresariais, complementando o chatbot existente e aumentando as conversões.

---

## 🚀 Como Funciona

### 1. **Formulário Rápido vs Chatbot**
- **Formulário Rápido**: 3 campos apenas (Nome, Telefone, Empresa)
- **Chatbot**: Processo completo com múltiplas perguntas
- **Ambos**: Integrados ao mesmo sistema de email via Convex

### 2. **Localização na Página**
- Posicionado entre o Hero Section e a seção de Benefícios
- Destaque visual com cores da Amil
- Design responsivo para mobile e desktop

### 3. **Sistema de Identificação**
- **Leads do Formulário**: Email fictício com padrão `quickform_[telefone]@lead.capture`
- **Leads do Chatbot**: Email real fornecido pelo usuário
- **Diferenciação automática** no sistema de email

---

## 📧 Como Você Recebe os Leads

### **EMAILS DIFERENCIADOS:**

#### 🔥 Lead do Chatbot (Completo):
- **Assunto**: `🔥 Lead Qualificado: [Nome] ([Empresa])`
- **Cor**: Azul (Amil)
- **Conteúdo**: Dados completos, CNPJ, situação atual, etc.
- **Status**: PRÉ-QUALIFICADO

#### ⚡ Lead do Formulário (Rápido):
- **Assunto**: `⚡ Lead Rápido: [Nome] (Requer Qualificação)`
- **Cor**: Laranja
- **Conteúdo**: Nome, telefone, empresa
- **Status**: REQUER QUALIFICAÇÃO

### **INFORMAÇÕES NO EMAIL:**
```
👤 Dados de Contato:
- Nome: João Silva (Empresa XYZ)
- WhatsApp: (11) 99999-9999
- Botão direto para conversar no WhatsApp

📋 ORIGEM: FORMULÁRIO RÁPIDO - REQUER QUALIFICAÇÃO

📞 AÇÃO REQUERIDA:
Este lead precisa ser qualificado via telefone/WhatsApp para obter:
• Número de funcionários
• CNPJ da empresa  
• Situação atual do plano de saúde
• Necessidades específicas
```

---

## 🔧 Arquivos Criados/Modificados

### **1. Novo Componente:** `src/components/QuickLeadForm.tsx`
- Formulário com validação automática de telefone
- Integração com Convex
- Estados de loading e sucesso
- Design responsivo

### **2. Integração:** `src/components/LandingPage.tsx`
- Import do QuickLeadForm
- Posicionamento estratégico
- Identificação da fonte (`source="landing-hero"`)

### **3. Sistema de Email:** `convex/email.ts`
- Detecção automática do tipo de lead
- Templates diferenciados
- Cores e layouts distintos
- Instruções específicas para cada tipo

---

## 📱 Como Replicar em Outras Páginas

### **Passo 1: Copiar o Componente**
```tsx
// Em qualquer página nova
import QuickLeadForm from "./QuickLeadForm";

// No JSX da página:
<section className="py-12 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <QuickLeadForm source="nome-da-pagina" />
  </div>
</section>
```

### **Passo 2: Personalizar a Source**
Troque `source="nome-da-pagina"` para identificar de onde veio o lead:
- `source="landing-hero"`
- `source="pme-page"`
- `source="beneficios-page"`
- `source="popup-exit-intent"`

### **Passo 3: Customizar Posicionamento** 
Posicione onde fizer mais sentido:
- **Topo da página**: Máxima visibilidade
- **Após benefícios**: Usuário já está convencido
- **Before footer**: Última chance de conversão
- **Modal/Popup**: Para usuários que vão sair

---

## 🎨 Personalizações Disponíveis

### **Cores e Textos:**
```tsx
// No componente QuickLeadForm.tsx, você pode alterar:
- Título: "Solicite uma Cotação Gratuita"
- Subtítulo: "Preencha os dados abaixo e receba uma proposta..."
- Placeholders dos campos
- Cores do gradiente: from-amil-blue to-amil-light-blue
- Mensagem de sucesso
```

### **Campos Adicionais:**
Se quiser adicionar mais campos (ex: número de funcionários):
```tsx
// Adicione no estado:
const [formData, setFormData] = useState({
  nome: "",
  telefone: "",
  empresa: "",
  numeroFuncionarios: "", // Novo campo
});

// Adicione no JSX:
<input
  type="number"
  value={formData.numeroFuncionarios}
  onChange={(e) => setFormData({ ...formData, numeroFuncionarios: e.target.value })}
  placeholder="Número de funcionários"
  className="w-full..."
/>
```

---

## 📊 Vantagens da Implementação

### **Para Conversão:**
- ✅ Reduz fricção (3 campos vs 8+ perguntas)
- ✅ Processo mais rápido (10-15 segundos)
- ✅ Visível o tempo todo na página
- ✅ Mobile-friendly

### **Para Gestão:**
- ✅ Leads identificados por origem
- ✅ Emails diferenciados por cores
- ✅ Instruções claras para cada tipo
- ✅ Integração com sistema existente

### **Para Follow-up:**
- ✅ Link direto para WhatsApp
- ✅ Dados básicos para primeira abordagem
- ✅ Status claro (qualificado vs requer qualificação)

---

## 🔄 Próximos Passos Sugeridos

1. **Testar o formulário** na página atual
2. **Monitorar emails** para ver a diferenciação
3. **Replicar em outras páginas** importantes
4. **Adicionar popup com formulário** para exit-intent
5. **Criar landing pages específicas** para campanhas

---

## 🆘 Troubleshooting

### **Se não receber emails do formulário rápido:**

1. **Verificar variáveis de ambiente no Convex:**
   - CONVEX_RESEND_API_KEY
   - CONVEX_EMAIL_DESTINATION  
   - CONVEX_EMAIL_FROM

2. **Verificar logs no Console do navegador:**
   ```javascript
   // Abra o Console (F12) e procure por estas mensagens:
   "Iniciando criação de lead do formulário rápido..."
   "Lead criado com ID: [ID]"
   "Disparando email para lead: [ID]"
   "Email enviado com sucesso"
   ```

3. **Verificar logs no Dashboard do Convex:**
   - Acesse o dashboard do Convex
   - Vá na aba "Logs"
   - Procure por logs com "[sendLeadEmail]"
   - Verifique se aparecem mensagens como:
     ```
     [sendLeadEmail] Tipo de lead identificado: FORMULÁRIO RÁPIDO
     [sendLeadEmail] É lead do formulário rápido? true
     ```

4. **Teste simples:**
   - Preencha o formulário com dados de teste
   - Nome: "Teste Formulário"
   - Telefone: "(11) 99999-9999"  
   - Empresa: "Empresa Teste"
   - Verifique no console se todos os logs aparecem

### **Se houver erros no formulário:**
1. Verificar se todos os campos estão preenchidos
2. Testar formatação automática do telefone
3. Checar console do navegador para erros

### **Diferenças entre emails:**
- **Chatbot**: Assunto com "🔥 Lead Qualificado" (azul)
- **Formulário**: Assunto com "⚡ Lead Rápido" (laranja)

---

**📞 Pronto para capturar mais leads!** 
O sistema está configurado e funcionando. Qualquer dúvida, consulte esta documentação ou analise os códigos criados.
