import { apiRequest } from './config';

export const teamsApi = {
    // Get user's teams
    getMyTeams: async () => {
        return apiRequest('/api/teams/my', {
            method: 'GET'
        });
    },

    // Get all teams (for discovery)
    getAllTeams: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/api/teams${query ? '?' + query : ''}`, {
            method: 'GET'
        });
    },

    // Create new team
    createTeam: async (teamData) => {
        return apiRequest('/api/teams/create', {
            method: 'POST',
            body: JSON.stringify(teamData)
        });
    },

    // Join team
    joinTeam: async (teamId) => {
        return apiRequest(`/api/teams/${teamId}/join`, {
            method: 'POST'
        });
    },

    // Leave team
    leaveTeam: async (teamId) => {
        return apiRequest(`/api/teams/${teamId}/leave`, {
            method: 'POST'
        });
    },

    // Get team details
    getTeam: async (teamId) => {
        return apiRequest(`/api/teams/${teamId}`, {
            method: 'GET'
        });
    },

    // Get team recommendations
    getRecommendations: async () => {
        return apiRequest('/api/teams/recommendations', {
            method: 'GET'
        });
    },

    // Handle team join requests
    handleJoinRequest: async (teamId, userId, action) => {
        return apiRequest(`/api/teams/${teamId}/requests/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ action })
        });
    }
};
