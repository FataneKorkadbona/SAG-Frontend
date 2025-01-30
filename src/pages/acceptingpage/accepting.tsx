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
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [denyReason, setDenyReason] = useState('');
    const [suggestionToDeny, setSuggestionToDeny] = useState<string | null>(null);

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
            await axios.patch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/suggestions/${id}`, { status: 'accepted' });
            setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
        } catch (error) {
            console.error('Error accepting suggestion:', error);
        }
    };

    const confirmDenySuggestion = (id: string) => {
        setSuggestionToDeny(id);
        setIsModalOpen(true);
    };

    const handleDeny = async () => {
        if (suggestionToDeny) {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/suggestions/${suggestionToDeny}`, { status: 'denied', denyReason });
                setSuggestions(suggestions.filter(suggestion => suggestion.id !== suggestionToDeny));
                setDenyReason('');
                setSuggestionToDeny(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error denying suggestion:', error);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDenyReason('');
        setSuggestionToDeny(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.info__container}>
            {suggestions.length > 0 ? (
                <div className={styles.info__cards}>
                    <AccBigCard
                        title={selectedSuggestion ? selectedSuggestion.title : suggestions[0].title}
                        text={selectedSuggestion ? selectedSuggestion.suggestion : suggestions[0].suggestion}
                        category={selectedSuggestion ? selectedSuggestion.category : suggestions[0].category}
                        budget={selectedSuggestion ? selectedSuggestion.price : suggestions[0].price}
                        cardContainer={styles.fullcard__container}
                        cardClass={styles.info__fullcard}
                        textClass={styles.fullcard__text}
                        categoryClass={styles.fullcard__categories}
                        bottomClass={styles.fullcard__info}
                        buttonClass={styles.fullcard__button}
                        onAccept={() => handleAccept(selectedSuggestion ? selectedSuggestion.id : suggestions[0].id)}
                        onDeny={() => confirmDenySuggestion(selectedSuggestion ? selectedSuggestion.id : suggestions[0].id)}
                    />
                    <div className={styles.card__list}>
                        {suggestions.slice(0).map((suggestion, index) => (
                            <AccCard
                                key={index}
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                budget={suggestion.price}
                                textClass={styles.card__text}
                                cardClass={styles.info__card}
                                bottomClass={styles.card__info}
                                onReadMore={() => setSelectedSuggestion(suggestion)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>No new suggestions, come back later</div>
            )}

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Denial</h3>
                        <textarea
                            placeholder="Enter reason for denial"
                            value={denyReason}
                            onChange={(e) => setDenyReason(e.target.value)}
                        />
                        <button onClick={handleDeny} disabled={!denyReason.trim()}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}