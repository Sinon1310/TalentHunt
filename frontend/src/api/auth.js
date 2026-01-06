import { api } from './config';

export const authAPI = {
    // Register new user
    register: async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    },

    // Verify email
    verifyEmail: async (token) => {
        const response = await api.get(`/api/auth/verify-email?token=${token}`);
        return response.data;
    },

    // Request password reset
    forgotPassword: async (email) => {
        const response = await api.post('/api/auth/forgot-password', { email });
        return response.data;
    },

    // Reset password
    resetPassword: async (token, newPassword) => {
        const response = await api.post('/api/auth/reset-password', { token, newPassword });
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/api/auth/me');
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await api.post('/api/auth/logout');
        return response.data;
    },

    // Google authentication
    googleAuth: async (userData) => {
        const response = await api.post('/api/auth/google', userData);
        return response.data;
    }
};
