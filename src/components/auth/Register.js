import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setFirstName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5025/identity/register', {
                email,
                password,
                name
            });

            // Get the JWT token from the response
            const token = response.data.token;

            // Store the token in a cookie
            document.cookie = `token=${token}`;

            // Redirect to the home page
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label className="form-label">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            <label className="form-label">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
            <label className="form-label">First name</label>
            <input type="text" placeholder="First name" value={name} onChange={(e) => setFirstName(e.target.value)} className="form-input" />
            <button type="submit" className="create-button button">Register</button>
        </form>
    );
};

export default Register;
