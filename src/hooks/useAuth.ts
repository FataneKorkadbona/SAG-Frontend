// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [is_Admin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/currentUser`);
                if (response.data && response.data.id) {
                    console.log(response.data);
                    setCurrentUser(response.data.id);
                    setIsAdmin(response.data.isAdmin === 1);
                } else {
                    console.error('User data is undefined or does not contain userId');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, loading, is_Admin };
};