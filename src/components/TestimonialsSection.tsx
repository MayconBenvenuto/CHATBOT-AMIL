import { Star } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Após contratar o plano empresarial da Amil Seguros, nossa taxa de absenteísmo caiu 22%. A ampla rede credenciada e o programa Amil Resgate para emergências proporcionam uma segurança incrível para todos os nossos colaboradores.",
    name: "Ricardo Martins",
    role: "Diretor Administrativo, TechPoint Sistemas",
  },
  {
    text: "Como gestor de RH, posso afirmar que a parceria com a Amil Seguros foi um divisor de águas para nossa empresa. A facilidade de gestão do plano, a telemedicina e a satisfação dos funcionários são diferenciais notáveis.",
    name: "Amanda Souza",
    role: "Gerente de RH, Grupo Conexão",
  },
  {
    text: "O que mais me impressionou no plano empresarial da Amil foi a agilidade no atendimento e a extensa rede de hospitais. Nossa equipe tem acesso a hospitais de referência e o aplicativo simplificou todos os processos administrativos.",
    name: "Carlos Mendonça",
    role: "CEO, Construtora Horizonte",
  },
  {
    text: "Após cotação com várias operadoras, escolhemos a Amil Seguros pela melhor relação custo-benefício e cobertura odontológica integrada. Hoje, 95% dos nossos colaboradores classificam o plano como excelente nas pesquisas internas de satisfação.",
    name: "Mariana Oliveira",
    role: "Diretora Financeira, Grupo Inovar",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="text-center mb-10 sm:mb-16">          <span className="inline-block px-4 py-1 bg-blue-100 text-amil-blue rounded-full text-sm font-medium mb-3">Casos de sucesso</span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            O que nossos clientes empresariais dizem
          </h2>
          <p className="text-sm xs:text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Gestores e empresários que confiam na Amil Seguros para cuidar da saúde de suas equipes e impulsionar seus negócios
          </p>
        </div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{`"${t.text}"`}</p>
              <div className="flex items-center border-t border-gray-100 pt-3">                <div className="w-8 h-8 rounded-full bg-amil-blue text-white flex items-center justify-center font-semibold mr-3">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-gray-900">{t.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
