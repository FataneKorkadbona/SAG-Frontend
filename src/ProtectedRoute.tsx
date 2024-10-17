import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './providers.tsx';

const ProtectedRoute = () => {
    const userContext = useContext(UserContext);

    if (!userContext?.user?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;