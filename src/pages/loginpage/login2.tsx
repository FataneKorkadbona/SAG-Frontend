import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';

const VerifyMagicLink: React.FC = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { verifyMagicLink } = useAuth();

    useEffect(() => {
        const verifyToken = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            if (token) {
                try {
                    await verifyMagicLink(token);
                    setMessage('Login successful');
                    navigate('/home');
                } catch (error) {
                    setMessage('Invalid or expired token.');
                }
            } else {
                setMessage('Token is required.');
            }
        };

        verifyToken();
    }, [location, navigate, verifyMagicLink]);

    return (
        <div>
            <h2>Verify Magic Link</h2>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyMagicLink;