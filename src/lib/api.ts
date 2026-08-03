import axios from "axios";

// Determine the base URL from the environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Normally you'd attach a Bearer token or API key here if required by the backend
    // "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`
  },
});

export const api = {
  getEvalRuns: async (limit: number = 20) => {
    const response = await apiClient.get(`/eval-runs?limit=${limit}`);
    return response.data;
  },
  getEvalRun: async (runId: string) => {
    const response = await apiClient.get(`/eval-runs/${runId}`);
    return response.data;
  },
  getEvalResults: async (runId: string) => {
    const response = await apiClient.get(`/eval-runs/${runId}/results`);
    return response.data;
  },
  getDiff: async (currentRunId: string, baselineRunId: string) => {
    const response = await apiClient.get(`/eval-runs/${currentRunId}/diff/${baselineRunId}`);
    return response.data;
  },
  triggerEvalRun: async (featureId: string) => {
    const response = await apiClient.post(`/eval/run/${featureId}`);
    return response.data;
  }
};
