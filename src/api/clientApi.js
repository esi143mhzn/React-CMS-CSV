import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: false,
})

export const getClients = (page = 1, filter = "") => api.get(`/clients?page=${page}&filter=${filter}`);
export const getExportClients = async (filter = "") => {
    const response = await api.get(`/clients/export?filter=${filter}`, {
        responseType: "blob",
    })
    return response;
}
export const importClients = (file) => {
    const formData = new FormData();
    formData.append('csv_file', file);
    return api.post('clients/import', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
    });
}
export const getDuplicateClients = (page = 1) => api.get(`/clients/duplicate-records?page=${page}`);
export const updateDuplicateClient = (id, data) => api.patch(`/clients/duplicate-records/${id}`, data);
export const deleteDuplicateClient = (id) => api.delete(`/clients/duplicate-records/${id}`);