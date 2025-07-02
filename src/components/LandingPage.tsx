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
    const phone = "5581992998558"; // Formato: código do país + DDD + número
    const message = encodeURIComponent("Olá! Gostaria de mais informações e valores dos planos Amil..");
    
    // Dispara evento do Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_category: 'WhatsApp',
        content_name: 'Botão WhatsApp Flutuante',
        value: 1,
        currency: 'BRL'
      });
    }
    
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // Função para abrir chatbot com tracking do Facebook Pixel
  const handleOpenChatbot = (buttonLocation: string) => {
    // Dispara evento do Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_category: 'Chatbot',
        content_name: `Botão ${buttonLocation}`,
        value: 10,
        currency: 'BRL'
      });
    }
    
    onOpenChatbot();
  };

  return (
    <div className="min-h-screen">      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">        <button 
          onClick={openWhatsApp}
          className="bg-[#25D366] hover:bg-[#20BA5C] rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Fale com um consultor pelo WhatsApp"
          id="whatsapp-button"
          data-testid="whatsapp-contact-button"
          data-fb-track="contact"
          data-event-name="Contact"
          role="button"
          tabIndex={0}
          title="Conversar no WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7 sm:w-8 sm:h-8 fill-white">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-auto py-2 sm:py-3 min-h-[3.5rem] sm:min-h-[4rem] gap-1 sm:gap-2">            <div className="flex items-center min-w-0 max-w-[70%] sm:max-w-none">
              <img src="/logo-amil.png" alt="Logo Amil Seguros" className="w-20 xs:w-24 sm:w-32 h-auto object-contain rounded-lg" />
              <span className="ml-1 sm:ml-2 text-xs xs:text-sm sm:text-xl font-bold text-gray-900 truncate">Planos Empresariais</span>
            </div>
            <nav className="hidden md:flex flex-wrap space-x-4 sm:space-x-8 mt-2 md:mt-0">              
              <a href="#beneficios" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Benefícios</a>
              <a href="#diferenciais" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Diferenciais</a>
              <a href="#depoimentos" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Depoimentos</a>
              <a href="#contato" className="text-gray-700 hover:text-amil-blue text-sm sm:text-base">Contato</a>
            </nav>
            <button
              onClick={() => handleOpenChatbot('Header')}
              className="bg-amil-blue text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-primary-hover transition-colors font-semibold w-auto text-[10px] xs:text-xs sm:text-base"
              data-testid="solicitar-cotacao-header"
              data-fb-track="lead"
            >
              Solicitar Cotação
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}      <section className="bg-cover bg-center bg-no-repeat relative text-white py-6 xs:py-8 sm:py-12 md:py-20" style={{ backgroundImage: "url('/edf-amil.png')" }}>
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
                  onClick={() => handleOpenChatbot('Hero Solicitar')}
                  className="bg-amil-blue text-white px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg hover:bg-primary-hover transition-colors font-semibold text-xs xs:text-sm sm:text-base lg:text-lg w-full xs:w-auto"
                  data-testid="solicitar-cotacao-hero"
                  data-fb-track="lead"
                >
                  Solicitar Cotação
                </button>
                <button
                  onClick={() => handleOpenChatbot('Hero Saiba Mais')}
                  className="border border-white xs:border-2 text-white px-3 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg hover:bg-white hover:text-amil-blue transition-colors font-semibold text-xs xs:text-sm sm:text-base lg:text-lg w-full xs:w-auto"
                  data-testid="saiba-mais-hero"
                  data-fb-track="lead"
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
        </div>      </section>

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
