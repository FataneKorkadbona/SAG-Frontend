import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { useAuth } from '../../context/AuthContext.tsx';
import axios from 'axios';

interface HeroCardProps {
    title: string;
    category: string;
    text: string;
    dateAdded: string;
    votes: number;
    cardClass: string;
    bottomClass: string;
    onButtonClick: () => void;
    topID?: string;
    onSuggestionsUpdate: () => void;
    suggestionId: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ title, category, text, dateAdded, votes, cardClass, bottomClass, topID, onSuggestionsUpdate, suggestionId }) => {
    const [voteCount, setVoteCount] = useState(votes);
    const { user } = useAuth();

    useEffect(() => {
        setVoteCount(votes);
    }, [votes]);

    const handleVote = async () => {
        try {
            const requestData = {
                suggestionId,
                email: user?.email
            };
            console.log('Request Data:', requestData);

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/votes`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response Data:', response.data);
            alert('Voting successful!'); // Alert the user that the voting was successful
            // Fetch updated suggestions
            onSuggestionsUpdate(); // Call the callback function to update suggestions
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.response?.data);
                alert(`An error occurred while voting: ${error.response?.data.message || JSON.stringify(error.response?.data)}`);
            } else {
                console.error('Error:', error);
                alert(`An error occurred while voting. ${error}`);
            }
        }
    };

    return (
        <div className={cardClass} id={styles.hero_card}>
            <div className={styles.card__top} id={topID}>
                <h2 className={styles.no__margin}>{title}</h2>
                <div className={styles.cat__box}>
                    <p className={styles.category}>{category}</p>
                </div>
            </div>
            <div className={bottomClass}>
                <p>{text}</p>
                <p className={styles.card__date}>{dateAdded}</p>
                <button className={styles.card__votes} onClick={handleVote}>{voteCount} Röster</button>
            </div>
        </div>
    );
};