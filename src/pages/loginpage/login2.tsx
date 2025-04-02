import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';

const VerifyMagicLink: React.FC = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { verifyMagicLink } = useAuth();

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

    return (
        <div>
            <h2>Verify Magic Link</h2>
            <button onClick={verifyToken}>Verify Link</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyMagicLink;