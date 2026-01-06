import { apiRequest } from './config';

export const competitionsApi = {
    // Get all competitions
    getAllCompetitions: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/api/competitions${query ? '?' + query : ''}`, {
            method: 'GET'
        });
    },

    // Get competition details
    getCompetition: async (competitionId) => {
        return apiRequest(`/api/competitions/${competitionId}`, {
            method: 'GET'
        });
    },

    // Register for competition
    registerForCompetition: async (competitionId) => {
        return apiRequest(`/api/competitions/${competitionId}/register`, {
            method: 'POST'
        });
    },

    // Withdraw from competition
    withdrawFromCompetition: async (competitionId) => {
        return apiRequest(`/api/competitions/${competitionId}/withdraw`, {
            method: 'POST'
        });
    },

    // Get user's registered competitions
    getMyCompetitions: async () => {
        return apiRequest('/api/competitions/my', {
            method: 'GET'
        });
    },

    // Create competition (admin only)
    createCompetition: async (competitionData) => {
        return apiRequest('/api/competitions', {
            method: 'POST',
            body: JSON.stringify(competitionData)
        });
    }
};
