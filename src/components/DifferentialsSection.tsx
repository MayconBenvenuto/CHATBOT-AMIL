import { CheckCircle } from "lucide-react";

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Os Diferenciais da Amil Saúde
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amil-blue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Estrutura Própria de Atendimento
                  </h3>
                  <p className="text-gray-600">
                    31 unidades hospitalares próprias, mais de 80 unidades ambulatoriais, incluindo os centros médicos 
                    Amil Espaço Saúde com atendimento multidisciplinar exclusivo para beneficiários.
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
                    Serviço pioneiro de UTIs móveis em operação desde 1993, com equipamentos de última geração e profissionais 
                    altamente qualificados para atendimento de emergências e remoções.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amil-blue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    CuidadosMil - Programas Especializados
                  </h3>
                  <p className="text-gray-600">
                    Programas de saúde especializados em cardiologia, endocrinologia, saúde mental, ortopedia, 
                    oncologia e outras especialidades, com foco em prevenção e tratamento integrado.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amil-blue to-amil-light-blue rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Amil em Números</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">47</div>
                <div className="text-blue-200">Anos de História</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5.4 milhões</div>
                <div className="text-blue-200">Beneficiários em Saúde</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+508 mil</div>
                <div className="text-blue-200">Empresas Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+21 mil</div>
                <div className="text-blue-200">Médicos e Serviços</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">+1.5 mil</div>
                <div className="text-blue-200">Hospitais Credenciados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">7</div>
                <div className="text-blue-200">Centros de Excelência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
