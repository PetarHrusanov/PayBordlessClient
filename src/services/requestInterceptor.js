import axios from "axios";

export const requestInterceptor = () => {
    const request = async (method, url, data) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const options = {
            method,
            url,
            headers,
            data,
        };

        const response = await axios(options);

        if (response.status === 204) {
            return {};
        }

        return response.data;
    };

    return {
        get: request.bind(null, 'GET'),
        post: request.bind(null, 'POST'),
        put: request.bind(null, 'PUT'),
        patch: request.bind(null, 'PATCH'),
        delete: request.bind(null, 'DELETE'),
    };
};
