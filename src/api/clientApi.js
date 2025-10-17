import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const getClients = (page = 1, filter = "") => api.get(`/clients?page=${page}&filter=${filter}`);
export const getExportClients = async (filter = "") => {
    const response = await api.get(`/clients/export?filter=${filter}`, {
        responseType: "blob",
    })
    return response;
}