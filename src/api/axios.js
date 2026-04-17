import axios from 'axios';

const api = axios.create({
    baseURL: 'https://taskbuddy-api-production.up.railway.app/api', // Live Railway Backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
