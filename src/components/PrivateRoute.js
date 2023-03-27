import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = authService.getToken();

  useEffect(() => {
    if (token == null) {
      navigate('/login');
    }
  }, [navigate, token]);

  return <Outlet />;
};

export default PrivateRoute;
