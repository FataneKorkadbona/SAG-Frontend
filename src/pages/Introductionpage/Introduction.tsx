import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './introduction.module.scss';

const IntroductionPage: React.FC = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <div className={styles.introduction__container}>
            <h1>Header</h1>
            <p>Random text</p>
            <p>random text</p>
            <p>Counter of how much money is left</p>
            <button onClick={goToHomePage} className={styles.introduction__button}>Continue</button>
        </div>
    );
};

export default IntroductionPage;