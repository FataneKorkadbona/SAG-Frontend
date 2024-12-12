import axios from 'axios';
import { User } from './AuthContext';

// Set default withCredentials to true for all Axios requests
axios.defaults.withCredentials = true;

export const checkSession = async (setUser: (user: User | null) => void, setLoading: (loading: boolean) => void) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-session`);
        setUser(response.data.user);
    } catch (err) {
        console.error('Session check failed:', err);
        setUser(null);
    } finally {
        setLoading(false);
    }
};

export const login = async (email: string, setUser: (user: User | null) => void) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email });
        setUser(response.data.user);
    } catch (err) {
        console.error('Login failed:', err);
        throw err;
    }
};

export const logout = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`);
    } catch (err) {
        console.error('Logout failed:', err);
        throw err;
    }
}