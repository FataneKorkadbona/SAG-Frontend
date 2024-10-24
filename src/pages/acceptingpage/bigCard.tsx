import styles from './accepting.module.scss';
import React from 'react';

interface accBigCardProps {
    title: string;
    text: string;
    category: string;
    budget: number;
    cardContainer: string;
    cardClass: string;
    bottomClass: string;
    textClass?: string;
    buttonClass?: string;
    categoryClass?: string;
    onAccept: () => void;
    onDeny: () => void;
}

export const AccBigCard: React.FC<accBigCardProps> = ({title, text, category, budget, cardContainer, buttonClass, categoryClass, cardClass, bottomClass, textClass, onAccept, onDeny}) => (
    <div className={cardContainer}>
        <div className={cardClass} id={styles.cardClass}>
            <div className={textClass} id={styles.textClass}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className={categoryClass} id={styles.categoryClass}>
                <p>{category}</p>
            </div>
            <div className={bottomClass} id={styles.bottomClass}>
                <div className={buttonClass} id={styles.buttonClass}>
                    <button onClick={onAccept}>Acceptera</button>
                    <button onClick={onDeny}>Neka</button>
                </div>
                <p>{budget} kr</p>
            </div>
        </div>
    </div>
);