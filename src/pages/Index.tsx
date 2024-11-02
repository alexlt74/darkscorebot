import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Star, MessageSquare, Users, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleTryNow = () => {
    setIsLoading(true);
    toast({
      title: "Bem-vindo!",
      description: "Experimente gratuitamente por 7 dias!",
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent">
          Assistente IA de Estatísticas do Futebol
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Potencializado pelo Claude 3.5, obtenha acesso instantâneo a estatísticas profundas e previsões de futebol
        </p>
        <button onClick={handleTryNow} className="neon-button" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Experimente Grátis"}
        </button>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Planos e Preços</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`neon-card ${plan.featured ? 'border-neon-cyan' : ''}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4">
                    {plan.price === 0 ? "Grátis" : `R$${plan.price}/mês`}
                  </div>
                  <ul className="text-left space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="text-neon-cyan" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`neon-button w-full ${plan.featured ? 'border-neon-cyan text-neon-cyan' : ''}`}>
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Recursos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="neon-card">
                <div className="text-neon-cyan mb-4">{feature.icon}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Experimente Gratuitamente</h2>
          <div className="max-w-2xl mx-auto">
            <div className="neon-card">
              <h3 className="text-xl font-display font-semibold mb-4">Faça uma pergunta sobre futebol</h3>
              <p className="text-gray-400 mb-6">
                Você tem direito a 3 perguntas gratuitas para testar nosso assistente IA. 
                Experimente perguntar sobre estatísticas de jogadores, probabilidades de resultados ou análises táticas.
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ex: Qual a probabilidade do Brasil ganhar hoje?"
                  className="flex-1 bg-dark-base border border-neon-purple/20 rounded-lg px-4 py-2"
                />
                <button className="neon-button">Perguntar</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="neon-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <MessageSquare className="text-neon-pink" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-4">{testimonial.text}</p>
                    <p className="font-semibold text-neon-cyan">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-dark-lighter py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Trusted By Leading Betting Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 mx-auto filter brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Level Up Your Game</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="neon-card text-center">
                <div className="text-neon-purple mb-4 flex justify-center">
                  <Trophy size={32} />
                </div>
                <h3 className="font-display font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <Star size={32} />,
    title: "Análise com IA",
    description: "Obtenha insights profundos e previsões alimentadas pelos algoritmos avançados do Claude 3.5",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Chat Interativo",
    description: "Faça perguntas naturalmente e receba respostas precisas instantaneamente",
  },
  {
    icon: <Trophy size={32} />,
    title: "Acompanhamento de Performance",
    description: "Acompanhe sua precisão nas previsões e ganhe conquistas",
  },
];

const pricingPlans = [
  {
    name: "Gratuito",
    price: 0,
    features: [
      "3 perguntas por dia",
      "Estatísticas básicas",
      "Histórico de partidas",
      "Suporte por email",
    ],
    buttonText: "Começar Grátis",
  },
  {
    name: "Premium",
    price: 49.90,
    featured: true,
    features: [
      "Perguntas ilimitadas",
      "Estatísticas avançadas",
      "Previsões em tempo real",
      "Análise de probabilidades",
      "Suporte prioritário",
    ],
    buttonText: "Assinar Premium",
  },
  {
    name: "Pro",
    price: 99.90,
    features: [
      "Tudo do Premium",
      "API de acesso",
      "Análises personalizadas",
      "Consultoria exclusiva",
      "Suporte 24/7",
    ],
    buttonText: "Assinar Pro",
  },
];

const testimonials = [
  {
    text: "This AI assistant has completely transformed how I analyze football matches. The insights are incredible!",
    author: "John Smith",
    role: "Professional Bettor",
  },
  {
    text: "The accuracy of predictions and depth of statistical analysis is unlike anything I've seen before.",
    author: "Maria Garcia",
    role: "Sports Analyst",
  },
];

const partners = [
  { name: "Bet365", logo: "/partners/bet365.svg" },
  { name: "Betfair", logo: "/partners/betfair.svg" },
  { name: "William Hill", logo: "/partners/williamhill.svg" },
  { name: "Bwin", logo: "/partners/bwin.svg" },
];

const achievements = [
  {
    title: "Prediction Master",
    description: "Achieve 90% accuracy in your predictions",
  },
  {
    title: "Analysis Expert",
    description: "Complete 100 detailed match analyses",
  },
  {
    title: "Stats Guru",
    description: "Access advanced statistics for 30 days straight",
  },
  {
    title: "Community Leader",
    description: "Help 50 other users with your insights",
  },
];

export default Index;
