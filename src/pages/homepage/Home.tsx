import React, { useEffect, useState, useRef } from 'react';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import { HeroCard } from './card.tsx';
import { SuggBigCard } from './suggBigCard.tsx';
import { SuggSmallCard } from './suggSmallCard.tsx';
import axios from 'axios';
import { categories } from '../categories.ts';
import { useAuth } from '../../context/AuthContext';
import Suggestion from "../suggestionspage/suggestion.tsx";

interface Suggestion {
    id: string;
    title: string;
    suggestion: string;
    category: string;
    price: number;
    status: string;
    suggestionId: string;
    votes: number;
    createdAt: string;
}

export default function HomePage() {
    const [isCategoryWindowVisible, setCategoryWindowVisible] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [tempSearchQuery, setTempSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [tempCategory, setTempCategory] = useState<string | null>(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [overlaySuggestion, setOverlaySuggestion] = useState<Suggestion | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();
    const infoSectionRef = useRef<HTMLDivElement>(null);

    const toggleCategoryWindow = () => {
        setCategoryWindowVisible(!isCategoryWindowVisible);
    };

    const hideCategoryWindow = () => {
        setCategoryWindowVisible(false);
    };

    const buttonlogin = () => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    };

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/suggestions`);
            const activeSuggestions = response.data.filter((suggestion: Suggestion) => suggestion.status === 'accepted');
            activeSuggestions.sort((a: Suggestion, b: Suggestion) => b.votes - a.votes); // Sort by votes in descending order
            setSuggestions(activeSuggestions);
            console.log('Active suggestions fetched and sorted by votes:', activeSuggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
        const intervalId = setInterval(fetchSuggestions, 5000); // Fetch suggestions every 5 seconds
        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchQuery(tempSearchQuery);
        }
    };

    const handleCategoryClick = (category: string) => {
        setTempCategory(prevCategory => prevCategory === category ? null : category);
    };

    const applyFilters = () => {
        setSearchQuery(tempSearchQuery);
        setSelectedCategory(tempCategory);
        hideCategoryWindow();
    };

    const showOverlay = (suggestion: Suggestion) => {
        setOverlaySuggestion(suggestion);
        setOverlayVisible(true);
    };

    const hideOverlay = () => {
        setOverlayVisible(false);
        setOverlaySuggestion(null);
    };

    const handleReadMore = (suggestion: Suggestion) => {
        setSelectedSuggestion(suggestion);
        if (infoSectionRef.current) {
            infoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? suggestion.category === selectedCategory : true)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.hero__section}>
                <h1 className={styles.hero__title}>Mest Populära</h1>
                <div className={styles.hero__cards}>
                    {filteredSuggestions.slice(1, 2).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes}
                                cardClass={styles.card__second}
                                bottomClass={styles.bottom__second}
                                topID={styles.top__second}
                                onButtonClick={buttonlogin}
                                suggestionId={suggestion.id}
                                onSuggestionsUpdate={fetchSuggestions}
                            />
                        </div>
                    ))}
                    {filteredSuggestions.slice(0, 1).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes}
                                cardClass={styles.card__first}
                                bottomClass={styles.bottom__first}
                                topID={styles.top__first}
                                onButtonClick={buttonlogin}
                                suggestionId={suggestion.id}
                                onSuggestionsUpdate={fetchSuggestions}
                            />
                        </div>
                    ))}
                    {filteredSuggestions.slice(2, 3).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes}
                                cardClass={styles.card__third}
                                bottomClass={styles.bottom__third}
                                topID={styles.top__third}
                                onButtonClick={buttonlogin}
                                suggestionId={suggestion.id}
                                onSuggestionsUpdate={fetchSuggestions}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div ref={infoSectionRef} className={styles.info__section}>
                <div className={styles.info__searching}>
                    <button className={styles.info__categories} onClick={toggleCategoryWindow}>Kategorier</button>
                    <input
                        type="text"
                        className={styles.info__searchbutton}
                        placeholder="Sök"
                        value={tempSearchQuery}
                        onChange={(e) => setTempSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={`${styles.category__window} ${isCategoryWindowVisible ? styles.visible : ''}`}>
                    <div className={styles.window__list}>
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className={tempCategory === category ? styles.selected : ''}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <button onClick={applyFilters}>Sök</button>
                </div>
                <div className={styles.info__container}>
                    <h1>{selectedCategory ? selectedCategory : 'Mest Populära Förslag'}</h1>
                    <div className={styles.info__cards}>
                        {filteredSuggestions.length > 0 ? (
                            <>
                                <SuggBigCard
                                    title={selectedSuggestion ? selectedSuggestion.title : filteredSuggestions[0].title}
                                    text={selectedSuggestion ? selectedSuggestion.suggestion : filteredSuggestions[0].suggestion}
                                    category={selectedSuggestion ? selectedSuggestion.category : filteredSuggestions[0].category}
                                    budget={selectedSuggestion ? selectedSuggestion.price : filteredSuggestions[0].price}
                                    votes={selectedSuggestion ? selectedSuggestion.votes : filteredSuggestions[0].votes}
                                    cardClass={styles.info__fullcard}
                                    textClass={styles.fullcard__text}
                                    pText={styles.fullcard__p}
                                    categoryClass={styles.fullcard__categories}
                                    bottomClass={styles.fullcard__info}
                                    buttonClass={styles.fullcard__button}
                                    suggestionId={selectedSuggestion ? selectedSuggestion.id : filteredSuggestions[0].id}
                                    onSuggestionsUpdate={fetchSuggestions}
                                />
                                <div className={styles.card__list}>
                                    {filteredSuggestions.slice(0).map((suggestion) => (
                                        <div key={suggestion.id}>
                                            <SuggSmallCard
                                                title={suggestion.title}
                                                text={suggestion.suggestion}
                                                budget={suggestion.price}
                                                textClass={styles.card__text}
                                                cardClass={styles.info__card}
                                                bottomClass={styles.card__info}
                                                onReadMore={() => {
                                                    if (window.innerWidth <= 1475) {
                                                        showOverlay(suggestion);
                                                    } else {
                                                        handleReadMore(suggestion);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div>Inga förslag hittades...</div>
                        )}
                    </div>
                </div>
            </div>

            {isOverlayVisible && overlaySuggestion && (
                <div className={styles.overlay} onClick={hideOverlay}>
                    <div className={styles.suggOverlay__container} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={hideOverlay}>x</button>
                        <SuggBigCard
                            title={overlaySuggestion.title}
                            text={overlaySuggestion.suggestion}
                            category={overlaySuggestion.category}
                            budget={overlaySuggestion.price}
                            votes={overlaySuggestion.votes}
                            cardClass={styles.info__fullcard}
                            textClass={styles.fullcard__text}
                            categoryClass={styles.fullcard__categories}
                            bottomClass={styles.fullcard__info}
                            suggestionId={overlaySuggestion.id}
                            onSuggestionsUpdate={fetchSuggestions}
                        />
                    </div>
                </div>
            )}
        </>
    );
}