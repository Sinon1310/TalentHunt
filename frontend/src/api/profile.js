import { apiRequest } from './config';

export const profileApi = {
    // Get user profile
    getProfile: async () => {
        return apiRequest('/api/profile', {
            method: 'GET'
        });
    },

    // Update basic profile information
    updateBasicProfile: async (data) => {
        return apiRequest('/api/profile/basic', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Update detailed profile information
    updateDetailedProfile: async (data) => {
        return apiRequest('/api/profile/detailed', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Update user skills
    updateSkills: async (data) => {
        return apiRequest('/api/profile/skills', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Update user interests
    updateInterests: async (data) => {
        return apiRequest('/api/profile/interests', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Portfolio management
    addPortfolioProject: async (data) => {
        return apiRequest('/api/profile/portfolio', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    updatePortfolioProject: async (projectId, data) => {
        return apiRequest(`/api/profile/portfolio/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    deletePortfolioProject: async (projectId) => {
        return apiRequest(`/api/profile/portfolio/${projectId}`, {
            method: 'DELETE'
        });
    },

    // Skills assessment
    submitSkillsAssessment: async (data) => {
        return apiRequest('/api/profile/skills-assessment', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // Team preferences
    updateTeamPreferences: async (data) => {
        return apiRequest('/api/profile/team-preferences', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Onboarding
    updateOnboarding: async (data) => {
        return apiRequest('/api/profile/onboarding', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Get potential matches
    getPotentialMatches: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/api/profile/matches${queryString ? `?${queryString}` : ''}`, {
            method: 'GET'
        });
    },

    // File uploads
    uploadFiles: async (formData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // Don't set Content-Type for FormData - browser will set it with boundary
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'File upload failed');
        }

        return response.json();
    },

    // Skills assessment helper functions
    startSkillsAssessment: async () => {
        return apiRequest('/api/profile/skills-assessment/start', {
            method: 'POST'
        });
    },

    getSkillsAssessmentQuestions: async () => {
        return apiRequest('/api/profile/skills-assessment/questions', {
            method: 'GET'
        });
    },

    // Profile analytics
    getProfileAnalytics: async () => {
        return apiRequest('/api/profile/analytics', {
            method: 'GET'
        });
    },

    // Profile visibility and privacy
    updatePrivacySettings: async (data) => {
        return apiRequest('/api/profile/privacy', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // Achievement system
    getAchievements: async () => {
        return apiRequest('/api/profile/achievements', {
            method: 'GET'
        });
    },

    // Profile completion suggestions
    getProfileSuggestions: async () => {
        return apiRequest('/api/profile/suggestions', {
            method: 'GET'
        });
    },

    // Search and discovery
    searchProfiles: async (query, filters = {}) => {
        const params = { query, ...filters };
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/api/profile/search?${queryString}`, {
            method: 'GET'
        });
    },

    // Profile verification
    verifyProfile: async (data) => {
        return apiRequest('/api/profile/verify', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // Profile recommendations
    getRecommendations: async (type = 'all') => {
        return apiRequest(`/api/profile/recommendations?type=${type}`, {
            method: 'GET'
        });
    }
};

export default profileApi;
