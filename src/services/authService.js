import axios from "axios";

const authService = {
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

        // Get the JWT token from the response
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);
    },

    async login(email, password) {
        const response = await axios.post(`${this.baseUrl}/login`, {
            email,
            password
        });

        // Get the JWT token from the response
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);
    },

    logout() {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        window.location.href = '/login';
    },

    getToken() {
        // Get the token from localStorage
        return localStorage.getItem('token');
    }
};

export default authService;
