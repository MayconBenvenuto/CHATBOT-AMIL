export default function CTASection({ onOpenChatbot }: { onOpenChatbot: () => void }) {
  // Função para abrir chatbot com tracking do Facebook Pixel
  const handleOpenChatbot = () => {
    onOpenChatbot();
  };

  return (    <section className="py-20 bg-amil-blue">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Pronto para Transformar a Saúde da sua Empresa?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Solicite uma cotação personalizada e descubra como a Amil Seguros pode 
          oferecer o melhor plano de saúde para sua PME.
        </p>
        <button
          onClick={handleOpenChatbot}
          className="bg-white text-amil-blue px-12 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
          data-testid="solicitar-cotacao-cta"
          data-fb-track="lead"
          id="cta-button"
        >
          Solicitar Cotação Gratuita
        </button>
      </div>
    </section>
  );
}
