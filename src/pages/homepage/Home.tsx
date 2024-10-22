import {useContext, useEffect, useState} from 'react';
import styles from './home.module.scss';
import {useNavigate} from "react-router-dom";
import {HeroCard} from './card.tsx';
import {UserContext} from '../../providers.tsx';
import {SuggBigCard} from './suggBigCard.tsx';
import {SuggSmallCard} from "./suggSmallCard.tsx";
import axios from "axios";

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext); // Define user using useContext

    const toggleCategoryWindow = () => {
        setCategoryWindowVisible(!isCategoryWindowVisible);
    };

    const hideCategoryWindow = () => {
        setCategoryWindowVisible(false);
    };

    const buttonlogin = () => {
        if (!user) {
            navigate("/login");
        }
    }

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/suggestions`);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {/* JSX content */}
            <div className={styles.hero__section}>
                <h1>category-name</h1>
                <div className={styles.hero__cards}>
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__second}
                        bottomClass={styles.bottom__second}
                        topID={styles.top__second}
                        onButtonClick={buttonlogin}
                    />
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__first}
                        bottomClass={styles.bottom__first}
                        topID={styles.top__first}
                        onButtonClick={buttonlogin}
                    />
                    <HeroCard
                        title="title"
                        category="category"
                        text="text"
                        dateAdded="date-added"
                        votes="xxx"
                        cardClass={styles.card__third}
                        bottomClass={styles.bottom__third}
                        topID={styles.top__third}
                        onButtonClick={buttonlogin}
                    />
                </div>
            </div>

            <div className={styles.info__section}>
                <button className={styles.info__categories} onClick={toggleCategoryWindow}>Categories</button>
                <div className={`${styles.category__window} ${isCategoryWindowVisible ? styles.visible : ''}`}>
                    <div className={styles.window__list}>
                        <button>category1</button>
                    </div>
                    <button onClick={hideCategoryWindow}>Search</button>
                </div>
                <div className={styles.info__container}>
                    <h2>Category</h2>
                    <div className={styles.info__cards}>
                        {suggestions.length > 0 && (
                            <>
                                <SuggBigCard
                                    title={suggestions[0].title}
                                    text={suggestions[0].suggestion}
                                    category={suggestions[0].category}
                                    budget={suggestions[0].price}
                                    votes={suggestions[0].votes}
                                    cardClass={styles.info__fullcard}
                                    textClass={styles.fullcard__text}
                                    categoryClass={styles.fullcard__categories}
                                    bottomClass={styles.fullcard__info}
                                />
                                {suggestions.slice(1).map((suggestion) => (
                                    <div key={suggestion.id} className={styles.card__list}>
                                        <SuggSmallCard
                                            title={suggestion.title}
                                            text={suggestion.suggestion}
                                            budget={suggestion.price}
                                            textClass={styles.card__text}
                                            cardClass={styles.info__card}
                                            bottomClass={styles.card__info}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}