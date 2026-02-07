import axios from 'axios';

const API_URL = 'http://localhost:4000/candidate';

const api = axios.create({
    baseURL: API_URL,
});

export const getCandidates = async () => {
    const response = await api.get('/');
    return response.data;
};

export const createCandidate = async (candidateData) => {
    const response = await api.post('/', candidateData);
    return response.data;
};

export const updateStatus = async (id, status) => {
    const response = await api.put(`/${id}/status`, { status });
    return response.data;
};

export const deleteCandidate = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export const getResumeUrl = (path) => {
    return `http://localhost:4000/${path}`;
};

export default api;
