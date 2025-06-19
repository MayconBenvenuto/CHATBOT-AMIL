import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Phone, Building, User, Send } from "lucide-react";

interface QuickLeadFormProps {
  source?: string; // Para identificar de qual página veio o lead
}

export default function QuickLeadForm({ source: _source = "landing-page" }: QuickLeadFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    empresa: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createLead = useMutation(api.leads.createLead);

  // Função para formatar telefone automaticamente
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefone || !formData.empresa) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);    try {
      // Cria o lead no Convex com dados do formulário rápido
      await createLead({
        nome: `${formData.nome} (${formData.empresa})`, // Inclui empresa no nome
        whatsapp: formData.telefone,
        email: `quickform_${formData.telefone.replace(/\D/g, "")}@lead.capture`, // Email fictício identificável
        temCnpj: true, // Assumimos que empresa tem CNPJ
      });

      setIsSubmitted(true);
      
      // Reset form após 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ nome: "", telefone: "", empresa: "" });
      }, 3000);

    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Formulário Enviado!</h3>
        <p className="text-green-100">
          Recebemos seus dados. Nossa equipe entrará em contato em breve para apresentar as melhores opções de planos para sua empresa.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amil-blue to-amil-light-blue rounded-2xl p-8 text-white shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Solicite uma Cotação Gratuita</h3>
        <p className="text-blue-100">
          Preencha os dados abaixo e receba uma proposta personalizada em até 24 horas
        </p>
      </div>

      <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-4">
        {/* Campo Nome */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-blue-200" />
          </div>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome completo *"
            className="w-full pl-10 pr-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        {/* Campo Telefone */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-blue-200" />
          </div>
          <input
            type="tel"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="Telefone/WhatsApp *"
            className="w-full pl-10 pr-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        {/* Campo Empresa */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building className="h-5 w-5 text-blue-200" />
          </div>
          <input
            type="text"
            value={formData.empresa}
            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            placeholder="Nome da empresa *"
            className="w-full pl-10 pr-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-amil-blue font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amil-blue mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Solicitar Cotação Gratuita
            </>
          )}
        </button>

        {/* Aviso de privacidade */}
        <p className="text-xs text-blue-100 text-center">
          Seus dados estão protegidos. Não compartilhamos informações com terceiros.
        </p>
      </form>
    </div>
  );
}
