// src/pages/unauthorized/Unauthorized.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './unathorized.module.scss';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
            <button onClick={handleGoBack}>Go Back to Home</button>
        </div>
    );
};

export default Unauthorized;