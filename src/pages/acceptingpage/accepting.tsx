import { useEffect, useState } from 'react';
import axios from 'axios';
import { AccCard } from './card';
import { AccBigCard } from './bigCard';
import styles from './accepting.module.scss';

interface Suggestion {
    title: string;
    suggestion: string;
    category: string;
    price: number;
    status: string;
    id: string;
}

export default function AcceptingPage() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/suggestions`);
            const pendingSuggestions = response.data.filter((suggestion: Suggestion) => suggestion.status === 'pending');
            setSuggestions(pendingSuggestions);
            console.log('Pending suggestions fetched:', pendingSuggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const handleAccept = async (id: string) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/suggestions/${id}`, { status: 'accepted' });
            setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
        } catch (error) {
            console.error('Error accepting suggestion:', error);
        }
    };

    const handleDeny = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/suggestions/${id}`);
            setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
        } catch (error) {
            console.error('Error denying suggestion:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.info__container}>
            {suggestions.length > 0 && (
                <div className={styles.info__cards}>
                    <AccBigCard
                        title={suggestions[0].title}
                        text={suggestions[0].suggestion}
                        category={suggestions[0].category}
                        budget={suggestions[0].price}
                        cardContainer={styles.fullcard__container}
                        cardClass={styles.info__fullcard}
                        textClass={styles.fullcard__text}
                        categoryClass={styles.fullcard__categories}
                        bottomClass={styles.fullcard__info}
                        buttonClass={styles.fullcard__button}
                        onAccept={() => handleAccept(suggestions[0].id)}
                        onDeny={() => handleDeny(suggestions[0].id)}
                    />
                    <div className={styles.card__list}>
                        {suggestions.slice(1).map((suggestion, index) => (
                            <AccCard
                                key={index}
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                budget={suggestion.price}
                                textClass={styles.card__text}
                                cardClass={styles.info__card}
                                bottomClass={styles.card__info}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}