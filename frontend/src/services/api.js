import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCandidates = async () => {
    const response = await api.get('/candidate');
    return response.data;
};

export const createCandidate = async (candidateData) => {
    const config = {};
    if (candidateData instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.post('/candidate', candidateData, config);
    return response.data;
};

export const getStats = async () => {
    const response = await api.get('/candidate/stats');
    return response.data;
};

export const updateStatus = async (id, status) => {
    const response = await api.put(`/candidate/${id}/status`, { status });
    return response.data;
};

export const deleteCandidate = async (id) => {
    const response = await api.delete(`/candidate/${id}`);
    return response.data;
};

export const getResumeUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `http://localhost:3000/${path}`;
};

export default api;
