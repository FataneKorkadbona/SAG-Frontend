// src/components/PrivateRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isLoggedIn = Boolean(localStorage.getItem('token')); // Adjust this logic based on your authentication method

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;