import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5002';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
