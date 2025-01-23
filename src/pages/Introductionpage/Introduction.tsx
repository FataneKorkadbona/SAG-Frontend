import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './introduction.module.scss';
import axios from 'axios';

const IntroductionPage: React.FC = () => {
    const navigate = useNavigate();
    const [money, setMoney] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [text1, setText1] = useState('');

    useEffect(() => {
        const fetchIntroPageInfo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getIntropage`);
                const introPageInfo = response.data;
                setTitle(introPageInfo.title);
                setText(introPageInfo.row1);
                setText1(introPageInfo.row2);
            } catch (error) {
                console.error('Error fetching intropage information:', error);
            }
        };
        const fetchMoney = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getMoney`);
                setMoney(response.data.amount);
            } catch (error) {
                console.error('Error fetching money:', error);
            }
        }

        fetchIntroPageInfo();
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