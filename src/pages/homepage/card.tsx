import React from 'react';
import styles from './home.module.scss';

interface HeroCardProps {
    title: string;
    category: string;
    text: string;
    dateAdded: string;
    votes: string;
    cardClass: string;
    bottomClass: string;
    onButtonClick: () => void;
    topID?: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ title, category, text, dateAdded, votes, cardClass, bottomClass, topID, onButtonClick }) => (
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
            <button className={styles.card__votes} onClick={onButtonClick}>{votes} votes</button>
        </div>
    </div>
);