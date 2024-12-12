import React, { useState, useEffect } from 'react';
import styles from '../acceptingpage/accepting.module.scss';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface suggBigCardProps {
    title: string;
    text: string;
    category: string;
    budget: number;
    votes: number;
    cardClass: string;
    bottomClass: string;
    textClass?: string;
    pText?: string;
    buttonClass?: string;
    categoryClass?: string;
    suggestionId: string;
    onSuggestionsUpdate: () => void; // Add this prop
}

export const SuggBigCard: React.FC<suggBigCardProps> = ({ title, text, category, votes, budget, buttonClass, categoryClass, cardClass, bottomClass, textClass, pText, suggestionId, onSuggestionsUpdate }) => {
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
        <div className={cardClass} id={styles.cardClass}>
            <div className={textClass} id={styles.textClass}>
                <h2>{title}</h2>
                <div className={pText}>
                    <p>{text}</p>
                </div>
            </div>
            <div className={categoryClass} id={styles.categoryClass}>
                <p>{category}</p>
            </div>
            <div className={bottomClass} id={styles.bottomClass}>
                <div className={buttonClass} id={styles.buttonClass}>
                    <button onClick={handleVote}>{voteCount} : Röster</button>
                </div>
                <p>{budget} kr</p>
            </div>
        </div>
    );
};