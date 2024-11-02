import axios from "axios";
import type { GamePrediction } from "./predictionService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchPredictions = async () => {
  const response = await axios.get<GamePrediction[]>(`${API_URL}/api/predictions`);
  return response.data;
};

export const fetchHistoricalData = async () => {
  const response = await axios.get(`${API_URL}/api/historical`);
  return response.data;
};

export const fetchUpcomingGames = async () => {
  const response = await axios.get(`${API_URL}/api/upcoming`);
  return response.data;
};