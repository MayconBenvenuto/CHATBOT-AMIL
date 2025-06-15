import { Shield, Users, Heart, Clock, Smartphone } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Benefícios Exclusivos para Empresas de Todos os Portes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Amil oferece soluções específicas para pequenas, médias e grandes empresas, 
            garantindo a saúde e bem-estar de todos os colaboradores.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amil-blue rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ampla Rede Credenciada</h3>
            <p className="text-gray-600">
              Acesso a mais de 21 mil médicos e serviços de saúde, 5 mil laboratórios 
              e mais de 1.500 hospitais em todo o Brasil.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amil-light-blue rounded-lg flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Atendimento de Emergência</h3>
            <p className="text-gray-600">
              Serviço Amil Resgate com UTIs móveis e profissionais qualificados para emergências, 
              pioneiro e em operação desde 1993.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amil-blue rounded-lg flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Programas de Saúde</h3>
            <p className="text-gray-600">
              Programas especializados de prevenção em diversas especialidades como cardiologia, 
              endocrinologia, saúde mental e outras áreas essenciais.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amil-light-blue rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Amil Espaço Saúde</h3>
            <p className="text-gray-600">
              Unidades ambulatoriais exclusivas para clientes Amil, oferecendo atendimento 
              multidisciplinar, pronto atendimento e exames em um só lugar.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amil-blue rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Aplicativo Digital</h3>
            <p className="text-gray-600">
              Carteirinha digital, agendamento online de consultas e exames, 
              reembolso 100% digital e acesso a todos os serviços na palma da mão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
