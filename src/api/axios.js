import axios from 'axios';

const api = axios.create({
    baseURL: 'https://taskbuddy-api-8d58.onrender.com/api', // Live Render Backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
