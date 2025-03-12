import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {getAdminId} from '../pages/adminpage/getAdminID';

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (email: string) => Promise<void>;
    adminLogin: (email: string, password: string) => Promise<void>;
    verifyMagicLink: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-session`);
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (email: string) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/request-magic-link`, {email});
        if (response.data.redirect) {
            navigate(`${response.data.redirect}?userId=${response.data.userId}`);
        } else {
            setUser(response.data.user);
        }
    };


    const adminLogin = async (email: string, password: string) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin-login`, { userId: await getAdminId(email), password });
        setUser(response.data.user);
    };

    const verifyMagicLink = async (token: string) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify-magic-link`, {params: {token}});
        setUser(response.data.user);
    };

    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isLoggedIn: !!user,
            isAdmin: user?.isAdmin || false,
            login,
            adminLogin,
            verifyMagicLink,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};