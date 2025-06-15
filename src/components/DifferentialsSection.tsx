import { CheckCircle } from "lucide-react";

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Os Diferenciais da Amil Saúde
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amil-blue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ampla Rede Credenciada
                  </h3>
                  <p className="text-gray-600">
                    Mais de 31.000 prestadores credenciados em todo Brasil, com hospitais, laboratórios 
                    e clínicas de referência para atendimento de qualidade em todas as regiões do país.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amil-light-blue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Amil Resgate e Telemedicina
                  </h3>
                  <p className="text-gray-600">
                    Serviço de resgate de emergência, consultas online com médicos e outros profissionais de saúde, aplicativo exclusivo com carteirinha digital, 
                    reembolso 100% digital e agendamento online para maior comodidade.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amil-blue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Programas de Medicina Preventiva
                  </h3>
                  <p className="text-gray-600">
                    Programas como "Amil Total Care", "Amil Resolve" e ações de medicina preventiva para promoção 
                    da saúde e melhor qualidade de vida dos colaboradores da sua empresa.
                  </p>
                </div>
              </div>
            </div>
          </div>          <div className="bg-gradient-to-br from-amil-blue to-amil-light-blue rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Números que Impressionam</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">45+</div>
                <div className="text-blue-200">Anos de História</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5.6 milhões+</div>
                <div className="text-blue-200">Beneficiários em Saúde</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">31.000+</div>
                <div className="text-blue-200">Prestadores Credenciados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5.800+</div>
                <div className="text-blue-200">Municípios Atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
