import { useEffect, useReducer, useRef } from "react";
import { useAction, useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotMessages from "./ChatbotMessages";
import ChatbotInput from "./ChatbotInput";
import ChatbotFinalCTA from "./ChatbotFinalCTA";

// --- INTERFACES E TIPOS ---
interface ChatbotProps {
  onClose: () => void;
  fullPage?: boolean; // Nova prop para modo página completa
}

type ChatStep =
  | "nome"
  | "whatsapp"
  | "plano_atual"
  | "nome_plano"
  | "valor_plano"
  | "dificuldade"
  | "idades_beneficiarios"
  | "numero_cnpj" // Movido para ser a última pergunta
  | "finalizado";

interface ChatData {
  nome: string;
  whatsapp: string;
  email: string; // Campo obrigatório para envio de email
  temCnpj: boolean;
  enquadramentoCnpj: string;
  numeroCnpj: string;
  dadosEmpresa?: any; // Adicionando os dados da empresa
  temPlanoAtual: boolean;
  nomePlanoAtual: string;
  valorPlanoAtual: string;
  maiorDificuldade: string;
  idadesBeneficiarios: string;
  cidade?: string;
  estado?: string;
}

interface Message {
  type: "user" | "bot";
  text: string;
  options?: string[];
}

// --- LÓGICA DO REDUCER ---
interface ChatState {
  step: ChatStep;
  input: string;
  leadId: Id<"leads"> | null;
  chatData: Partial<ChatData>;
  messages: Message[];
  isTyping: boolean; // Usaremos para indicar validação também
}

type ChatAction =
  | { type: "SET_INPUT"; payload: string }
  | { type: "SET_IS_TYPING"; payload: boolean }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_LEAD_ID"; payload: Id<"leads"> }
  | { type: "SET_LOCATION"; payload: { cidade: string; estado: string } }
  | { type: "PROCEED_STEP"; payload: { nextStep: ChatStep; newData: Partial<ChatData> } };

const initialState: ChatState = {
  step: "nome",
  input: "",
  leadId: null,
  chatData: {},
  messages: [
    {
      type: "bot",
      text: "👋 Olá! Sou o Davi, assistente virtual da Amil Seguros. Vou te ajudar a encontrar o melhor plano PME para sua empresa!",
    },
  ],
  isTyping: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_IS_TYPING":
      return { ...state, isTyping: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_LEAD_ID":
      return { ...state, leadId: action.payload };
    case "SET_LOCATION":
      return {
        ...state,
        chatData: {
          ...state.chatData,
          cidade: action.payload.cidade,
          estado: action.payload.estado,
        },
      };
    case "PROCEED_STEP":
      return {
        ...state,
        step: action.payload.nextStep,
        chatData: action.payload.newData,
        input: "",
      };
    default:
      return state;
  }
}

// !!! REMOVIDO: Função de validação CNPJ com API desativada !!!

export default function Chatbot({ onClose, fullPage = false }: ChatbotProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { step, input, leadId, chatData, messages, isTyping } = state;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isManualClose = useRef(false); // Flag para rastrear se o fechamento foi manual

  const createLead = useMutation(api.leads.createLead);
  const updateLead = useMutation(api.leads.updateLead);
  const sendEmail = useAction(api.email.sendLeadEmail);
  
  // Efeito para capturar o abandono do chat (lead morno)
  useEffect(() => {
    // A função de limpeza é executada quando o componente é desmontado (fechado)
    return () => {
      console.log(`[Chatbot Unmount] Verificando condições para lead morno:`, {
        leadId,
        nome: chatData.nome,
        whatsapp: chatData.whatsapp,
        step,
        isManualClose: isManualClose.current
      });
      
      // Só envia email de lead morno se:
      // 1. Existe leadId, nome e whatsapp
      // 2. O chat NÃO foi finalizado (step !== "finalizado")
      // 3. O fechamento foi manual (isManualClose.current = true)
      if (leadId && chatData.nome && chatData.whatsapp && step !== "finalizado" && isManualClose.current) {
        console.log(`[Chatbot Unmount] Lead morno detectado: ${leadId}. Enviando...`);
        // Envia o email para o lead morno
        sendEmail({ leadId, isWarmLead: true }).catch((error) => {
          // Apenas loga o erro no console, não exibe para o usuário
          console.error("[Chatbot Unmount] Erro ao enviar email de lead morno:", error);
        });
      } else {
        console.log(`[Chatbot Unmount] Condições não atendidas para lead morno`);
      }
    };
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Função para buscar localização via IP
  const fetchLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const { city, region_code } = data;
      if (city && region_code) {
        dispatch({
          type: "SET_LOCATION",
          payload: { cidade: city, estado: region_code },
        });
        if ((window as any).fbq) {
          (window as any).fbq("track", "FindLocation", {
            city,
            region: region_code,
          });
        }
      }
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  // useEffect para capturar localização automaticamente
  useEffect(() => {
    void fetchLocation();
  }, []);

  const addBotMessage = (text: string, options?: string[]) => {
    dispatch({ type: "SET_IS_TYPING", payload: true });
    setTimeout(() => {
      dispatch({ type: "SET_IS_TYPING", payload: false });
      dispatch({ type: "ADD_MESSAGE", payload: { type: "bot", text, options } });
    }, 1500);
  };

  // Função para lidar com o fechamento manual do chatbot
  const handleManualClose = () => {
    console.log(`[handleManualClose] Fechamento manual detectado no step: ${step}`);
    // Marca que o fechamento foi manual
    isManualClose.current = true;
    // Chama a função original de fechamento
    onClose();
  };

  // Função para finalização natural do chatbot (sem envio de lead morno)
  const handleNaturalFinish = () => {
    console.log("[handleNaturalFinish] Finalização natural do chatbot");
    // Não marca como fechamento manual
    isManualClose.current = false;
    // Chama a função original de fechamento após a conclusão
    onClose();
  };
  
  useEffect(() => {
    setTimeout(() => {
      addBotMessage("Para começar, qual é o seu nome? 😊");
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    switch (step) {
      case "whatsapp":
        value = value
          .replace(/\D/g, "")
          .slice(0, 11)
          .replace(/^(\d{2})(\d)/g, "($1) $2")
          .replace(/(\d{4,5})(\d{4})/, "$1-$2");
        break;
      case "numero_cnpj":
        value = value
          .replace(/\D/g, "")
          .slice(0, 14)
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d)/, "$1-$2");
        break;
      case "valor_plano":
        value = value.replace(/\D/g, "");
        if (value) {
          const numberValue = parseInt(value, 10) / 100;
          value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(numberValue);
        } else {
          value = "";
        }
        break;
    }
    dispatch({ type: "SET_INPUT", payload: value });
  };  const getNextStep = (currentStep: ChatStep, data: Partial<ChatData>): ChatStep => {
    switch (currentStep) {
      case "nome": return "whatsapp";
      case "whatsapp": return "plano_atual"; // Mudou: agora vai direto para plano atual
      case "plano_atual": return data.temPlanoAtual ? "nome_plano" : "dificuldade";
      case "nome_plano": return "valor_plano";
      case "valor_plano": return "dificuldade";
      case "dificuldade": return "idades_beneficiarios";
      case "idades_beneficiarios": return "numero_cnpj";
      case "numero_cnpj": return "finalizado"; // Mudou: CNPJ leva ao final
      default: return "finalizado";
    }
  };const getBotMessage = (step: ChatStep, data: Partial<ChatData>): { text: string; options?: string[] } => {
  switch (step) {
    case "whatsapp": 
      return { text: `Perfeito, ${data.nome}! 📱 Agora preciso do seu WhatsApp para nosso consultor entrar em contato:` };
    case "plano_atual": 
      return { 
        text: "🏥 Vocês já possuem algum plano de saúde atualmente?", 
        options: ["Sim", "Não"] 
      };
    case "nome_plano": 
      return { 
        text: "📝 Qual é o nome do plano de saúde atual?",
        options: ["Amil", "SulAmérica", "Bradesco Saúde", "NotreDame", "Hapvida", "Outro"]
      };
    case "valor_plano": 
      return { text: "💰 Quanto vocês pagam mensalmente pelo plano atual? (Ex: R$ 350,00)" };
    case "dificuldade": 
      return { 
        text: "🤔 Qual é a maior dificuldade que vocês enfrentam com planos de saúde?",
        options: [
          "Alto custo",
          "Rede médica limitada", 
          "Demora no atendimento",
          "Cobertura insuficiente",
          "Burocracia excessiva",
          "Outro"
        ]
      };
    case "idades_beneficiarios":
      return {
        text: "👨‍👩‍👧‍👦 Para calcular a cotação, preciso saber as idades dos beneficiários que utilizarão o plano. Digite as idades separadas por vírgula (Ex: 32, 28, 5, 2):"
      };
    case "numero_cnpj":
      return { text: "🏢 Para finalizar, qual é o CNPJ da sua empresa? (Opcional - pode pular se preferir)" };
    case "finalizado": 
      return { text: `🎉 Perfeito, ${data.nome}! Recebi todas as informações. Nossa equipe analisará seu perfil e entrará em contato em até 24 horas com as melhores opções para sua empresa. Obrigado!` };
    default: 
      return { text: "" };
  }
  };

  const validateInput = (step: ChatStep, value: string): boolean => {
    switch (step) {
      case "nome":
        return value.trim().length >= 2;
      case "whatsapp": {
        const cleanPhone = value.replace(/\D/g, "");
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
      }
      case "numero_cnpj": {
        // Desativado: aceita qualquer entrada, inclusive vazia
        return true; // Sempre válido agora
      }
      case "idades_beneficiarios": {
        const agesPattern = /^(\d+)(\s*,\s*\d+)*$/;
        return agesPattern.test(value.trim());
      }
      case "valor_plano":
        return /\d+/.test(value);
      default:
        return value.trim().length >= 2;
    }
  };
  const getInputPlaceholder = (step: ChatStep): string => {
    switch (step) {
        case "nome": return "Digite seu nome completo...";
        case "whatsapp": return "(11) 99999-9999";
        case "numero_cnpj": return "00.000.000/0000-00";
        case "idades_beneficiarios": return "Ex: 32, 28, 5, 2";
        case "valor_plano": return "R$ 0,00";
        default: return "Digite sua resposta...";
    }
  };

  const handleOptionClick = (option: string) => {
    dispatch({ type: "SET_INPUT", payload: option });
    setTimeout(() => { void handleSubmit(null, option); }, 100);
  };

  const handleSubmit = async (e: React.FormEvent | null, optionValue?: string) => {
    if (e) e.preventDefault();

    const value = optionValue || input;
    if (!value.trim() && step !== "numero_cnpj") return; // CNPJ pode ser vazio

    if (!validateInput(step, value)) {
      // Removido o toast de erro de validação para uma experiência mais limpa
      return;
    }

    const newData = { ...chatData };
    
    // Removido: Validação do CNPJ com API
    // O CNPJ agora é aceito sem validação

    dispatch({ type: "ADD_MESSAGE", payload: { type: "user", text: value } });    switch (step) {
      case "nome": newData.nome = value; break;
      case "whatsapp": newData.whatsapp = value; break;
      case "numero_cnpj": newData.numeroCnpj = value; break;
      case "plano_atual": newData.temPlanoAtual = value.toLowerCase() === "sim"; break;
      case "nome_plano": newData.nomePlanoAtual = value; break;
      case "valor_plano": newData.valorPlanoAtual = value; break;
      case "idades_beneficiarios": newData.idadesBeneficiarios = value; break;
      case "dificuldade": newData.maiorDificuldade = value; break;
    }

    const nextStep = getNextStep(step, newData);
    dispatch({ type: "PROCEED_STEP", payload: { nextStep, newData } });

    // ... (O restante da função handleSubmit, com a lógica de salvar e enviar e-mail, permanece igual)
    let currentLeadId = leadId;
    try {
      // Criamos o lead quando tivermos os dados básicos de contato (nome e whatsapp)
      if (step === "whatsapp" && newData.nome && newData.whatsapp) {
        // Geramos um email fictício baseado no número de WhatsApp para mantermos compatibilidade
        const whatsappEmail = `${newData.whatsapp.replace(/\D/g, "")}@whatsapp.cliente`;
        
        console.log("Criando novo lead com dados básicos:", {
          nome: newData.nome,
          whatsapp: newData.whatsapp,
          email: whatsappEmail
        });
        
        const id = await createLead({
          nome: newData.nome,
          whatsapp: newData.whatsapp,
          email: whatsappEmail,
          temCnpj: false, // Mudou: inicialmente não sabemos se tem CNPJ
        });
        
        console.log("Lead criado com ID:", id);
        dispatch({ type: "SET_LEAD_ID", payload: id });
        currentLeadId = id;      } else if (leadId) {
        // Para as atualizações subsequentes
        console.log("Atualizando lead:", leadId, "com dados:", {
          numeroCnpj: newData.numeroCnpj,
          temCnpj: newData.numeroCnpj ? true : false,
          dadosEmpresa: newData.dadosEmpresa, // Incluindo dados da empresa
          temPlanoAtual: newData.temPlanoAtual,
          nomePlanoAtual: newData.nomePlanoAtual,
          valorPlanoAtual: newData.valorPlanoAtual,
          maiorDificuldade: newData.maiorDificuldade,
          idadesBeneficiarios: newData.idadesBeneficiarios,
          cidade: newData.cidade,
          estado: newData.estado,
          status: step === "dificuldade" ? "completo" : "em_andamento", // Atualizado: agora a conclusão é na etapa "dificuldade"
        });
        
        await updateLead({
          leadId,
          numeroCnpj: newData.numeroCnpj,
          temCnpj: newData.numeroCnpj ? true : false,
          dadosEmpresa: newData.dadosEmpresa, // Incluindo dados da empresa (se houver)
          temPlanoAtual: newData.temPlanoAtual,
          nomePlanoAtual: newData.nomePlanoAtual,
          valorPlanoAtual: newData.valorPlanoAtual,
          maiorDificuldade: newData.maiorDificuldade,
          idadesBeneficiarios: newData.idadesBeneficiarios,
          cidade: newData.cidade,
          estado: newData.estado,
          status: step === "numero_cnpj" ? "completo" : "em_andamento", // Mudou: agora a conclusão é na etapa do CNPJ
        });
      }
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      // Removido toast de erro para não notificar o usuário de problemas internos
    }
    
    if (nextStep === "finalizado" && currentLeadId) {
      try {
        // Garantimos que todas as informações estejam atualizadas antes de enviar o email
        console.log("Finalizando fluxo do chatbot com leadId:", currentLeadId);        await updateLead({
          leadId: currentLeadId,
          status: "completo",
          // Garantimos que todas as informações estejam atualizadas          
          enquadramentoCnpj: newData.enquadramentoCnpj,
          numeroCnpj: newData.numeroCnpj,
          temPlanoAtual: newData.temPlanoAtual,
          nomePlanoAtual: newData.nomePlanoAtual,
          valorPlanoAtual: newData.valorPlanoAtual,
          maiorDificuldade: newData.maiorDificuldade,
          idadesBeneficiarios: newData.idadesBeneficiarios,
          cidade: newData.cidade,
          estado: newData.estado,
        });
        
        // Adicionamos um pequeno delay para garantir que a atualização foi concluída
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enviamos o email
        console.log("Enviando email para leadId:", currentLeadId);
        toast.loading("Enviando suas informações...");
        
        try {
          await sendEmail({ leadId: currentLeadId });
          console.log("E-mail para lead completo enviado com sucesso.");

          toast.success("✅ Informações enviadas com sucesso! Em breve nosso consultor entrará em contato.");

        } catch (emailError: any) {
          console.error("Erro ao enviar e-mail:", emailError);
          toast.error(`❌ Erro ao enviar e-mail: ${emailError.message || "Tente novamente"}`);
        }
      } catch (error) {
        console.error("Erro ao finalizar processo:", error);
        toast.error("❌ Seus dados foram salvos, mas ocorreu um erro ao processá-los. Nossa equipe entrará em contato em breve!");
      }
    }

    const botResponse = getBotMessage(nextStep, newData);
    addBotMessage(botResponse.text, botResponse.options);
  };    const getStepIcon = (step: ChatStep) => {
    switch (step) {
      case "nome": return "👤";
      case "whatsapp": return "📱";
      case "numero_cnpj": return "🏢";
      case "plano_atual": return "🏥";
      case "nome_plano": return "📝";
      case "valor_plano": return "💰";
      case "dificuldade": return "🤔";
      case "idades_beneficiarios": return "👨‍👩‍👧‍👦";
      case "finalizado": return "🎉";
      default: return "💬";
    }
  };
  const getProgressPercentage = () => {
    const steps = ["nome", "whatsapp", "plano_atual", "nome_plano", "valor_plano", "dificuldade", "idades_beneficiarios", "numero_cnpj", "finalizado"];
    const currentIndex = steps.indexOf(step);
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  };
  
  return (
    <div className={fullPage 
      ? "h-full bg-white flex flex-col" 
      : "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    }>
      <div className={fullPage 
        ? "h-full flex flex-col" 
        : "bg-white rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md h-[70vh] max-h-[90vh] flex flex-col shadow-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300"
      }
        style={!fullPage ? {width: '100%', maxWidth: '350px'} : {}}>
        {/* Header */}
        {!fullPage && <ChatbotHeader onClose={handleManualClose} progress={getProgressPercentage()} />}
        <ChatbotMessages
          messages={messages}
          step={step as string}
          isTyping={isTyping}
          getStepIcon={getStepIcon as (step: string) => string}
          handleOptionClick={handleOptionClick}
          messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
        />
        {/* Input */}
        {step !== "finalizado" && !isTyping && (
          <ChatbotInput
            input={input}
            step={step as string}
            isTyping={isTyping}
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
            handleInputChange={handleInputChange}
            handleSubmit={(e) => { void handleSubmit(e); }}
            getInputPlaceholder={getInputPlaceholder as (step: string) => string}
            handleOptionClick={handleOptionClick}
          />
        )}

        {/* Final CTA */}
        {step === "finalizado" && (
          <ChatbotFinalCTA onClose={handleNaturalFinish} />
        )}
      </div>
    </div>
  );
}