import api from "./api";

export const fetchCars = (params = {}) => api.get("/cars", { params }).then((r) => r.data);

export const fetchCarById = (id) => api.get(`/cars/${id}`).then((r) => r.data);

export const createCar = (payload) => api.post("/cars", payload).then((r) => r.data);

export const updateCar = (id, payload) => api.put(`/cars/${id}`, payload).then((r) => r.data);

export const deleteCar = (id) => api.delete(`/cars/${id}`).then((r) => r.data);

export const updateCarStatus = (id, status) =>
  api.patch(`/cars/${id}/status`, { status }).then((r) => r.data);

export const togglePublish = (id, published) =>
  api.patch(`/cars/${id}/publish`, { published }).then((r) => r.data);

export const uploadCarImages = (id, formData, onProgress) =>
  api
    .post(`/cars/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) onProgress(Math.round((evt.loaded / evt.total) * 100));
      },
    })
    .then((r) => r.data);

export const deleteCarImage = (id, publicId) =>
  api.delete(`/cars/${id}/images/${encodeURIComponent(publicId)}`).then((r) => r.data);
