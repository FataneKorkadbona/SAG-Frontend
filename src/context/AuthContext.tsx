import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { checkSession, login, logout as logoutHelper } from './authHelpers';

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean; // Add this line
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession(setUser, setLoading);
    }, []);

    const logout = async () => {
        await logoutHelper();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isLoggedIn: !!user, isAdmin: user?.isAdmin || false, login: (email) => login(email, setUser), logout }}>
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