import axios from "axios";

export const authService = {
    baseUrl: 'http://localhost:5025/identity',

    async register(name, email, password) {
        const response = await axios.post(`${this.baseUrl}/register`, {
            name,
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        });

        // Get the JWT token and user data from the response
        const { token, user } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
    },

    async login(email, password) {
        const response = await axios.post(`${this.baseUrl}/login`, {
            email,
            password
        });

        // Get the JWT token and user data from the response
        const { token, user } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
    },

    logout() {
        // Remove the token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to the login page
        window.location.href = '/login';
    },

    getToken() {
        // Get the token from localStorage
        return localStorage.getItem('token');
    },

    getUser() {
        // Get the user data from localStorage
        return localStorage.getItem('user');
    }
};
