import api from "@/lib/api";

export const applicationsServices = {
  create: (data: any) => api.post("/applications", data),
  getAll: (params?: any) => api.get("/applications", { params }),
  getById: (id: string) => api.get(`/applications/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/applications/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/applications/${id}`),
};
