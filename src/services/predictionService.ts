import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GamePrediction {
  id: string;
  home: string;
  away: string;
  date: string;
  time: string;
  predictedGoals: number;
  predictedWinner: string;
  predictedCorners: number;
  predictedCards: number;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  confidence: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const usePredictions = () => {
  return useQuery({
    queryKey: ["predictions"],
    queryFn: async () => {
      try {
        const response = await axios.get<GamePrediction[]>(`${API_URL}/api/predictions`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar previsões:", error);
        // Fallback para dados mockados em caso de erro
        return mockPredictions;
      }
    },
    refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
  });
};

// Dados mockados para desenvolvimento/fallback
const mockPredictions: GamePrediction[] = [
  {
    id: "1",
    home: "Flamengo",
    away: "Palmeiras",
    date: "2024-03-20",
    time: "20:00",
    predictedGoals: 2.5,
    predictedWinner: "Flamengo",
    predictedCorners: 9,
    predictedCards: 3,
    odds: {
      home: 2.1,
      draw: 3.2,
      away: 3.5
    },
    confidence: 0.75
  },
  {
    id: "2",
    home: "São Paulo",
    away: "Corinthians",
    date: "2024-03-20",
    time: "21:30",
    predictedGoals: 1.8,
    predictedWinner: "Draw",
    predictedCorners: 11,
    predictedCards: 4,
    odds: {
      home: 2.4,
      draw: 3.1,
      away: 3.2
    },
    confidence: 0.68
  }
];