import styles from './accepting.module.scss';
import React from 'react';

interface accCardProps {
    title: string;
    text: string;
    budget: number;
    cardClass: string;
    bottomClass: string;
    textClass?: string;
}

export const AccCard: React.FC<accCardProps> = ({title, text, budget, cardClass, bottomClass, textClass}) => (
    <div className={cardClass} id={styles.cardClass}>
        <div className={textClass} id={styles.textClass}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
        <div className={bottomClass} id={styles.bottomClass}>
            <button>Read More</button>
            <p>{budget}</p>
        </div>
    </div>
);