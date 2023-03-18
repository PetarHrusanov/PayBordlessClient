import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Protected = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.signout(() => {
            navigate('/');
        });
    };

    return (
        <div>
            <h2>Protected Page</h2>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default Protected;
