import { useContext, useEffect, useState } from 'react';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import { HeroCard } from './card.tsx';
import { UserContext } from '../../providers.tsx';
import { SuggBigCard } from './suggBigCard.tsx';
import { SuggSmallCard } from './suggSmallCard.tsx';
import axios from 'axios';
import { categories } from '../categories.ts';

interface Suggestion {
    title: string;
    suggestion: string;
    category: string;
    price: number;
    status: string;
    id: string;
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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    const toggleCategoryWindow = () => {
        setCategoryWindowVisible(!isCategoryWindowVisible);
    };

    const hideCategoryWindow = () => {
        setCategoryWindowVisible(false);
    };

    const buttonlogin = () => {
        if (!user) {
            navigate('/login');
        }
    };

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/suggestions`);
            const activeSuggestions = response.data.filter((suggestion: Suggestion) => suggestion.status === 'active');
            setSuggestions(activeSuggestions);
            console.log('Active suggestions fetched:', activeSuggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
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
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    {suggestions.slice(1, 2).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes.toString()}
                                cardClass={styles.card__second}
                                bottomClass={styles.bottom__second}
                                topID={styles.top__second}
                                onButtonClick={buttonlogin}
                            />
                        </div>
                    ))}
                    {suggestions.slice(0, 1).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes.toString()}
                                cardClass={styles.card__first}
                                bottomClass={styles.bottom__first}
                                topID={styles.top__first}
                                onButtonClick={buttonlogin}
                            />
                        </div>
                    ))}
                    {suggestions.slice(2, 3).map((suggestion) => (
                        <div key={suggestion.id}>
                            <HeroCard
                                title={suggestion.title}
                                text={suggestion.suggestion}
                                category={suggestion.category}
                                dateAdded={suggestion.createdAt}
                                votes={suggestion.votes.toString()}
                                cardClass={styles.card__third}
                                bottomClass={styles.bottom__third}
                                topID={styles.top__third}
                                onButtonClick={buttonlogin}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.info__section}>
                <div className={styles.info__searching}>
                    <button className={styles.info__categories} onClick={toggleCategoryWindow}>Categories</button>
                    <input
                        type="text"
                        className={styles.info__searchbutton}
                        placeholder="Search"
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
                    <button onClick={applyFilters}>Search</button>
                </div>
                <div className={styles.info__container}>
                    <h2>Category</h2>
                    <div className={styles.info__cards}>
                        {filteredSuggestions.length > 0 && (
                            <>
                                <SuggBigCard
                                    title={selectedSuggestion ? selectedSuggestion.title : filteredSuggestions[0].title}
                                    text={selectedSuggestion ? selectedSuggestion.suggestion : filteredSuggestions[0].suggestion}
                                    category={selectedSuggestion ? selectedSuggestion.category : filteredSuggestions[0].category}
                                    budget={selectedSuggestion ? selectedSuggestion.price : filteredSuggestions[0].price}
                                    votes={selectedSuggestion ? selectedSuggestion.votes : filteredSuggestions[0].votes}
                                    cardClass={styles.info__fullcard}
                                    textClass={styles.fullcard__text}
                                    categoryClass={styles.fullcard__categories}
                                    bottomClass={styles.fullcard__info}
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
                                                onReadMore={() => setSelectedSuggestion(suggestion)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}