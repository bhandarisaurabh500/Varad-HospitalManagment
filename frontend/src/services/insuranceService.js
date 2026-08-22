import api from './api';

const insuranceService = {
  getProviders: async () => {
    const response = await api.get('/insurance/providers');
    return response.data;
  },
  
  addProvider: async (data) => {
    const response = await api.post('/insurance/providers', data);
    return response.data;
  },
  
  getPatientPolicies: async (patientId) => {
    const response = await api.get(`/insurance/policies/${patientId}`);
    return response.data;
  },
  
  addPatientPolicy: async (data) => {
    const response = await api.post('/insurance/policies', data);
    return response.data;
  },
  
  getAllClaims: async () => {
    const response = await api.get('/insurance/claims');
    return response.data;
  },
  
  submitClaim: async (data) => {
    const response = await api.post('/insurance/claims', data);
    return response.data;
  },
  
  updateClaimStatus: async (id, data) => {
    const response = await api.put(`/insurance/claims/${id}`, data);
    return response.data;
  }
};

export default insuranceService;
