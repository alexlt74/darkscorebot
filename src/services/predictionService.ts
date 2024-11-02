import { useQuery } from "@tanstack/react-query";

export interface GamePrediction {
  home: string;
  away: string;
  date: string;
  time: string;
  predictedGoals: number;
  predictedWinner: string;
  predictedCorners: number;
  predictedCards: number;
}

// Simulando dados de previsão - em produção, isso viria da sua API
const mockPredictions: GamePrediction[] = [
  {
    home: "Flamengo",
    away: "Palmeiras",
    date: "2024-03-20",
    time: "20:00",
    predictedGoals: 2.5,
    predictedWinner: "Flamengo",
    predictedCorners: 9,
    predictedCards: 3,
  },
  {
    home: "São Paulo",
    away: "Corinthians",
    date: "2024-03-20",
    time: "21:30",
    predictedGoals: 1.8,
    predictedWinner: "Draw",
    predictedCorners: 11,
    predictedCards: 4,
  },
];

export const usePredictions = () => {
  return useQuery({
    queryKey: ["predictions"],
    queryFn: async () => {
      // Em produção, substitua por uma chamada real à API
      return mockPredictions;
    },
  });
};