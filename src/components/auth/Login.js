import React, { useState } from 'react';
import {authService} from "../../services/authService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            setPasswordError('Password must include at least one number and one special character.');
            return;
        }

        try {
            await authService.login(email, password);
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label className="form-label">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            <label className="form-label">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
            {passwordError && <p className="error">{passwordError}</p>}
            <button type="submit" className="create-button button">Login</button>
        </form>
    );
};

export default Login;
