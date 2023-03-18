// PrivateRoute.js
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import AuthService from './AuthService';

const PrivateRoute = () => {
    const location = useLocation();

    return AuthService.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
