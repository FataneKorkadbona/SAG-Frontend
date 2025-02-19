import styles from '../acceptingpage/accepting.module.scss';
import React from 'react';

interface suggSmallCardProps {
    title: string;
    text: string;
    budget: number;
    cardClass: string;
    bottomClass: string;
    textClass?: string;
    onReadMore: () => void;
}

export const SuggSmallCard: React.FC<suggSmallCardProps> = ({title, text, budget, cardClass, bottomClass, textClass, onReadMore}) => (
    <div className={cardClass} id={styles.cardClass}>
        <div className={textClass} id={styles.textClass}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
        <div className={bottomClass} id={styles.bottomClass}>
            <button onClick={onReadMore}>Läs mer</button>
            <p>{budget} kr</p>
        </div>
    </div>
);