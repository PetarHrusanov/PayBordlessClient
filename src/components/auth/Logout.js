import React from 'react';
import {authService} from "../../services/authService";

const Logout = () => {
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/'; // redirect to the home page
    };

    return (
        <button onClick={handleLogout} className="create-button button">
            Logout
        </button>
    );
};

export default Logout;
