import { usePredictions } from "@/services/predictionService";
import { PredictionCard } from "./PredictionCard";

export const PredictionsSection = () => {
  const { data: predictions, isLoading } = usePredictions();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-neon-cyan">Carregando previsões...</div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Previsões de Hoje</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions?.map((prediction, index) => (
            <PredictionCard key={index} prediction={prediction} />
          ))}
        </div>
      </div>
    </section>
  );
};