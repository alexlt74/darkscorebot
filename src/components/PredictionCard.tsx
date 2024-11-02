import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Flag, Clock, Goal, Percent } from "lucide-react";
import type { GamePrediction } from "@/services/predictionService";

interface PredictionCardProps {
  prediction: GamePrediction;
}

export const PredictionCard = ({ prediction }: PredictionCardProps) => {
  return (
    <Card className="neon-card">
      <CardHeader>
        <CardTitle className="text-lg text-center">
          {prediction.home} vs {prediction.away}
        </CardTitle>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
          <Clock size={16} />
          {prediction.date} - {prediction.time}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-neon-cyan" size={20} />
            <span>Vencedor: {prediction.predictedWinner}</span>
          </div>
          <div className="flex items-center gap-2">
            <Goal className="text-neon-pink" size={20} />
            <span>Gols: {prediction.predictedGoals.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="text-neon-purple" size={20} />
            <span>Escanteios: {prediction.predictedCorners}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center text-yellow-400">🟨</div>
            <span>Cartões: {prediction.predictedCards}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neon-purple/20">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div>Casa: {prediction.odds.home.toFixed(2)}</div>
              <div>Empate: {prediction.odds.draw.toFixed(2)}</div>
              <div>Fora: {prediction.odds.away.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Percent size={20} className="text-neon-cyan" />
              <span className="text-lg font-semibold">
                {(prediction.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};