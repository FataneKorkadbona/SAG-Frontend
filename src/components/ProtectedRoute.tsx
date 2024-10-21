// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtRoute: React.FC = () => {
    const { loading, is_Admin } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return is_Admin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtRoute;