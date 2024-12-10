import styles from '../acceptingpage/accepting.module.scss';
import React from 'react';

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
}

export const SuggBigCard: React.FC<suggBigCardProps> = ({title, text, category, votes, budget, buttonClass, categoryClass, cardClass, bottomClass, textClass, pText}) => (
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
                    <button>{votes} : Röster</button>
                </div>
                <p>{budget} kr</p>
            </div>
        </div>
);