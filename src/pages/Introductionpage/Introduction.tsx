import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './introduction.module.scss';
import axios from 'axios';

const IntroductionPage: React.FC = () => {
    const navigate = useNavigate();
    const [money, setMoney] = useState(0);
    const [title, setTitle] = useState('');
    const [title2, setTitle2] = useState('');
    const [title3, setTitle3] = useState('');
    const [text, setText] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');

    useEffect(() => {
        const fetchIntroPageInfo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getIntropage`);
                const introPageInfo = response.data;
                setTitle(introPageInfo.title);
                setTitle2(introPageInfo.title2);
                setTitle3(introPageInfo.title3);
                setText(introPageInfo.row1);
                setText2(introPageInfo.chunk1_row2);
                setText3(introPageInfo.chunk1_row3);
                setText1(introPageInfo.row2);
                setText4(introPageInfo.chunk2_row2);
                setText5(introPageInfo.chunk2_row3);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <div className={styles.introduction__container}>
            <h1><strong>{title}</strong></h1>
            <h2><strong>{title2}</strong></h2>
            <p>{text}</p>
            <p>{text2}</p>
            <p>{text3}</p>
            <h2><strong>{title3}</strong></h2>
            <p>{text1}</p>
            <p>{text4}</p>
            <p>{text5}</p>
            <p>Kvarvarande Budget: {money}kr</p>

            <button onClick={goToHomePage} className={styles.introduction__button}>Fortsätt</button>
        </div>
    );
};

export default IntroductionPage;