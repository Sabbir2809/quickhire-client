import api from "@/lib/api";

export const dashboardServices = {
  getStats: () => api.get("/dashboard"),
};
