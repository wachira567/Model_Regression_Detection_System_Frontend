import axios from "axios";

// Determine the base URL from the environment or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Normally you'd attach a Bearer token or API key here if required by the backend
    // "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`
  },
});

let interceptorId: number | null = null;

export const setupApiAuth = (getToken: () => Promise<string | null> | string | null) => {
  if (interceptorId !== null) {
    apiClient.interceptors.request.eject(interceptorId);
  }
  
  interceptorId = apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Initialize auth interceptor to read from localStorage by default
setupApiAuth(() => localStorage.getItem('access_token'));

export const api = {
  getEvalRuns: async (page: number = 1, size: number = 10, search?: string) => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append("search", search);
    const response = await apiClient.get(`/eval-runs?${params.toString()}`);
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
  },
  getPrompts: async (page: number = 1, size: number = 10, search?: string) => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append("search", search);
    const response = await apiClient.get(`/prompts?${params.toString()}`);
    return response.data;
  },
  getDatasets: async (page: number = 1, size: number = 10, search?: string) => {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (search) params.append("search", search);
    const response = await apiClient.get(`/datasets?${params.toString()}`);
    return response.data;
  },
  getAnalyticsTrends: async (days: number = 7) => {
    const response = await apiClient.get(`/reports/analytics/trends?days=${days}`);
    return response.data;
  },
  bootstrapDataset: async (featureId: string, daysBack: number = 7, maxCases: number = 50) => {
    const response = await apiClient.post(`/datasets/${featureId}/bootstrap?days_back=${daysBack}&max_cases=${maxCases}`);
    return response.data;
  },
  getAutopilotStats: async () => {
    const response = await apiClient.get(`/autopilot/stats`);
    return response.data;
  },
  getFlags: async () => {
    const response = await apiClient.get(`/flags`);
    return response.data;
  },
  updateFlag: async (flagId: string, updates: any) => {
    const response = await apiClient.put(`/flags/${flagId}`, updates);
    return response.data;
  },
  getEvalTraces: async (evalResultId: string) => {
    const response = await apiClient.get(`/traces/eval/${evalResultId}`);
    return response.data;
  },
  getCacheStats: async () => {
    const response = await apiClient.get(`/cache/stats`);
    return response.data;
  },
  getAdminStats: async () => {
    const response = await apiClient.get(`/admin/stats`);
    return response.data;
  }
};
