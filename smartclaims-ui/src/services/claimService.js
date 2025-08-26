import axios from 'axios';

const API_URL = 'http://localhost:8080/claims';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllClaims = () => {
    return apiClient.get('/');
};

export const getClaimById = (id) => {
    return apiClient.get(`/${id}`);
};

export const createClaim = (claim) => {
    return apiClient.post('/', claim);
};

export const updateClaim = (id, claim) => {
    return apiClient.put(`/${id}`, claim);
};

export const deleteClaim = (id) => {
    return apiClient.delete(`/${id}`);
};

export const searchClaims = (query) => {
    return apiClient.get('/search', { params: { query } });
};

const claimService = {
    getAllClaims,
    getClaimById,
    createClaim,
    updateClaim,
    deleteClaim,
    searchClaims,
};

export default claimService;
