import BenefitsSection from "./BenefitsSection";
import DifferentialsSection from "./DifferentialsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import { CheckCircle } from "lucide-react";

interface LandingPageProps {
  onOpenChatbot: () => void;
}

export default function LandingPage({ onOpenChatbot }: LandingPageProps) {
  // Função para abrir o WhatsApp com mensagem predefinida
  const openWhatsApp = () => {
    const phone = "5581988242023"; // Formato: código do país + DDD + número
    const message = encodeURIComponent("Olá! Gostaria de mais informações e valores dos planos Amil..");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={openWhatsApp}
          className="bg-[#25D366] hover:bg-[#20BA5C] rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Fale com um consultor pelo WhatsApp"
        >
          <img 
            src="/whatsapp-logo.png" 
            alt="WhatsApp" 
            className="w-8 h-8 sm:w-9 sm:h-9" 
          />
        </button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-auto py-2 sm:py-3 min-h-[3.5rem] sm:min-h-[4rem] gap-1 sm:gap-2">
            <div className="flex items-center min-w-0 max-w-[70%] sm:max-w-none">              <img src="/logo-amil.png" alt="Logo Amil Seguros" className="w-20 xs:w-24 sm:w-32 h-auto object-contain rounded-lg overflow-hidden" />
              <span className="ml-1 sm:ml-2 text-xs xs:text-sm sm:text-xl font-bold text-gray-900 truncate">Planos Empresariais</span>
            </div>
            <nav className="hidden md:flex flex-wrap space-x-4 sm:space-x-8 mt-2 md:mt-0">              <a href="#beneficios" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Benefícios</a>
              <a href="#diferenciais" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Diferenciais</a>
              <a href="#depoimentos" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Depoimentos</a>
              <a href="#contato" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Contato</a>
            </nav>
            <button
              onClick={onOpenChatbot}
              className="bg-amil-blue text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-primary-hover transition-colors font-semibold w-auto text-[10px] xs:text-xs sm:text-base"
            >
              Solicitar Cotação
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-cover bg-center bg-no-repeat relative text-white py-6 xs:py-8 sm:py-12 md:py-20" style={{ backgroundImage: "url('/edf-amil.png')" }}>
        <div className="absolute inset-0 bg-black opacity-65"></div>
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 md:mb-6">
                Planos de Saúde Empresas <br />
                <span className="block text-blue-200">Amil Seguros</span>
              </h1>
              <p className="text-xs xs:text-sm sm:text-base lg:text-xl mb-3 sm:mb-5 md:mb-8 text-gray-100">
                Proteja sua empresa e seus colaboradores com o melhor plano de saúde do mercado. 
                Cobertura completa, atendimento humanizado e economia garantida.
              </p>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
                <button
                  onClick={onOpenChatbot}
                  className="bg-amil-blue text-white px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg hover:bg-primary-hover transition-colors font-semibold text-xs xs:text-sm sm:text-base lg:text-lg w-full xs:w-auto"
                >
                  Solicitar Cotação
                </button>
                <button
                  onClick={onOpenChatbot}
                  className="border border-white xs:border-2 text-white px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg hover:bg-white hover:text-amil-blue transition-colors font-semibold text-xs xs:text-sm sm:text-base lg:text-lg w-full xs:w-auto"
                >
                  Saiba Mais
                </button>
              </div>
            </div>
            <div className="relative mt-4 xs:mt-5 sm:mt-6 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-5 lg:p-8">
                <h3 className="text-sm xs:text-base sm:text-xl lg:text-2xl font-bold mb-1.5 xs:mb-2 sm:mb-3 lg:mb-4">Por que escolher a Amil Seguros?</h3>
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                  <div className="flex items-start">                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-200 mr-1.5 xs:mr-2 sm:mr-3 mt-0.5" />
                    <span className="text-[10px] xs:text-xs sm:text-sm lg:text-base">Uma das maiores redes de atendimento do Brasil</span>
                  </div>
                  <div className="flex items-start">                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-200 mr-1.5 xs:mr-2 sm:mr-3 mt-0.5" />
                    <span className="text-[10px] xs:text-xs sm:text-sm lg:text-base">Atendimento 24h em emergências</span>
                  </div>
                  <div className="flex items-start">                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-200 mr-1.5 xs:mr-2 sm:mr-3 mt-0.5" />
                    <span className="text-[10px] xs:text-xs sm:text-sm lg:text-base">Ampla cobertura com hospitais de referência</span>
                  </div>
                  <div className="flex items-start">                    <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-200 mr-1.5 xs:mr-2 sm:mr-3 mt-0.5" />
                    <span className="text-[10px] xs:text-xs sm:text-sm lg:text-base">Planos para PEQUENAS, MÉDIAS E GRANDES EMPRESAS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <BenefitsSection />

      {/* Diferenciais */}
      <DifferentialsSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection onOpenChatbot={onOpenChatbot} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
