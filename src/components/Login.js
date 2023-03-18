// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Login = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.authenticate(() => {
            setError(false);
            navigate('/protected');
        });
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>Error: Invalid credentials</p>}
            <form onSubmit={handleSubmit}>
                {/* You can add input fields for email and password here */}
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;


