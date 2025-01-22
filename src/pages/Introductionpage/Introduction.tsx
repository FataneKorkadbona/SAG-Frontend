import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './introduction.module.scss';

const IntroductionPage: React.FC = () => {
    const navigate = useNavigate();
    const [money, setMoney] = useState(0);
    const title = 'Welcome to the Karlstad Kommun';
    const text = 'This is a demo application for the Karlstad Kommun.';
    const text1 = 'Please press the button below to continue to the home page.';

    useEffect(() => {
        // Fetch the initial money value from an API or set a default value
        const fetchMoney = async () => {
            // Example API call to fetch money value
            // const response = await axios.get('/api/getMoney');
            // setMoney(response.data.money);
            setMoney(1000); // Set a default value for demonstration
        };

        fetchMoney();
    }, []);

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <div className={styles.introduction__container}>
            <h1>{title}</h1>
            <p>{text}</p>
            <p>{text1}</p>
            <p>Counter of how much money is left: {money}kr</p>

            <button onClick={goToHomePage} className={styles.introduction__button}>Continue</button>
        </div>
    );
};

export default IntroductionPage;