import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  register: (userData) => api.post('/accounts/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/accounts/profile/'),
  updateProfile: (data) => api.patch('/accounts/profile/', data),
};

// Beneficiary Services
export const beneficiaryService = {
  list: () => api.get('/beneficiaries/'),
  create: (data) => api.post('/beneficiaries/', data),
  get: (id) => api.get(`/beneficiaries/${id}/`),
  update: (id, data) => api.put(`/beneficiaries/${id}/`, data),
  delete: (id) => api.delete(`/beneficiaries/${id}/`),
};

// Transaction Services
export const transactionService = {
  list: () => api.get('/transactions/'),
  transfer: (data) => api.post('/transactions/transfer/', data),
  billPayments: () => api.get('/transactions/bill-payments/'),
  createBillPayment: (data) => api.post('/transactions/bill-payments/', data),
  getBillPayment: (id) => api.get(`/transactions/bill-payments/${id}/`),
};

export default api;
