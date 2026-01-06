import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5002';

// Create axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await api({
            url: endpoint,
            method: options.method || 'GET',
            data: options.body ? JSON.parse(options.body) : undefined,
            params: options.params,
            headers: {
                ...options.headers
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error.response?.data || error;
    }
};
