import React, { useState } from 'react';
import {authService} from "../../services/authService";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setFirstName] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            setPasswordError('Password must include at least one number and one special character.');
            return;
        }

        try {
            await authService.register(name, email, password);
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
            <label className="form-label">First name</label>
            <input type="text" placeholder="First name" value={name} onChange={(e) => setFirstName(e.target.value)} className="form-input" />
            <button type="submit" className="create-button button">Register</button>
        </form>
    );
};

export default Register;
