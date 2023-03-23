import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5025', // the base URL of your API
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // get the JWT from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // attach the JWT to the request
    }
    return config;
});

export default axiosInstance;
