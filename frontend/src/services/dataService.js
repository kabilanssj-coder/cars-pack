import api from "./api";

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const fetchMe = () => api.get("/auth/me").then((r) => r.data);

export const submitEnquiry = (payload) => api.post("/enquiries", payload).then((r) => r.data);

export const fetchEnquiries = (params = {}) =>
  api.get("/enquiries", { params }).then((r) => r.data);

export const updateEnquiry = (id, payload) =>
  api.put(`/enquiries/${id}`, payload).then((r) => r.data);

export const submitSellRequest = (payload) =>
  api.post("/sell-requests", payload).then((r) => r.data);

export const fetchSellRequests = (params = {}) =>
  api.get("/sell-requests", { params }).then((r) => r.data);

export const updateSellRequest = (id, payload) =>
  api.put(`/sell-requests/${id}`, payload).then((r) => r.data);

export const fetchBranches = () => api.get("/branches").then((r) => r.data);

export const updateBranch = (id, payload) =>
  api.put(`/branches/${id}`, payload).then((r) => r.data);

export const fetchStats = () => api.get("/stats").then((r) => r.data);
