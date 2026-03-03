import api from "@/lib/api";

export const jobServices = {
  getAll: (params?: any) => api.get("/jobs", { params }),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post("/jobs", data),
  update: (id: string, data: any) => api.patch(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  getCategories: () => api.get("/jobs/categories"),
};
