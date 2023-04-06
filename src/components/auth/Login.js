import React, { useState } from 'react';
import {authService} from "../../services/authService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authService.login(email, password);
            window.location.href = '/';
        } catch (err) {
            if (err.response) {
                setLoginError('Login credentials are incorrect');
            } else {
                console.error(err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label className="form-label">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required/>
            <label className="form-label">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required/>
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" className="create-button button">Login</button>
        </form>
    );
};

export default Login;
