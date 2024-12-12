import { Navigate, Outlet } from 'react-router-dom';
import { useAuth} from "./context/AuthContext.tsx";

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;