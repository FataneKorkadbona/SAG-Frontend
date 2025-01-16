import {useState, FormEvent} from 'react';
import styles from './suggestion.module.scss';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {categories} from '../categories.ts';

type CharLimits = {
    suggestion: number;
    title: number;
    price: number;
};

export default function Suggestion() {
    const {user} = useAuth();
    const userEmail = user?.email || '';

    const [charCount, setCharCount] = useState<CharLimits>({
        suggestion: 2500,
        title: 25,
        price: 6
    });

    const [formData, setFormData] = useState({
        suggestion: '',
        title: '',
        price: '',
        category: 'category'
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const {id, value} = event.target;
        let newValue = value;

        if (id === 'price') {
            newValue = value.replace(/[^0-9]/g, '');
        }

        const limits: CharLimits = {
            suggestion: 2500,
            title: 25,
            price: 6
        };
        const maxLength = limits[id as keyof CharLimits];
        if (newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }

        setFormData(prevData => ({
            ...prevData,
            [id]: newValue
        }));

        setCharCount(prevCount => ({
            ...prevCount,
            [id]: maxLength - newValue.length
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validation logic
        if (!formData.suggestion || !formData.title || !formData.price || formData.category === 'category') {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/suggestions`, {
                ...formData,
                email: userEmail
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccessMessage('Suggestion submitted successfully!');
            setFormData({
                suggestion: '',
                title: '',
                price: '',
                category: 'category'
            });
            setCharCount({
                suggestion: 2500,
                title: 25,
                price: 6
            });
            console.log('Suggestion submitted successfully:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred.');
            } else {
                setErrorMessage('An error occurred.');
            }
        }
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <div className={styles.card__container}>
                <div className={styles.card}>
                    <h1>Lämna ett förslag</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.suggestions__container}>
                            <div className={styles.suggestions__left}>
                                <label htmlFor="suggestion">Förslag</label>
                                <textarea
                                    name="suggestion"
                                    id="suggestion"
                                    placeholder="Skriv en beskrivning av ditt förslag här"
                                    value={formData.suggestion}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.suggestion} tecken kvar</div>
                            </div>
                            <div className={styles.suggestions__right}>
                                <label htmlFor="title">Titel</label>
                                <textarea
                                    name="title"
                                    id="title"
                                    rows={1}
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.title} tecken kvar</div>
                                <label htmlFor="price">Ungefärlig kostnad</label>
                                <textarea
                                    name="price"
                                    id="price"
                                    rows={1}
                                    placeholder="Pris: kr"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.price} characters left</div>
                                <label htmlFor="category">Välj en kategori:</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="category" disabled>Ingen</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <button type="submit">Skicka in</button>
                            </div>
                        </div>
                    </form>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>

            <p onClick={showModal} className={styles.showModal__text}>Vilken information behövs för ett förslag?</p>
            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modal__top}>
                            <h1>Vilken information behövs för ett förslag?</h1>
                            <button onClick={hideModal}>X</button>
                        </div>
                        <p>När du lämnar ett förslag är det viktigt att ge så mycket information som möjligt.
                            Detta inkluderar:</p>
                        <ul>
                            <li>Titel</li>
                            <p>
                                Titeln ska ge en tydlig indikation på vad förslaget handlar om.
                            </p>
                            <li>Detaljerad beskrivning av förslaget</li>
                            <p>
                                Beskrivningen ska ge en detaljerad förklaring av vad förslaget handlar om.
                                Detta bör inkludera all relevant information som behövs för att förstå förslaget
                                samt information om hur budgeten kommer att användas och hur mycket varje del av
                                förslaget kommer att kosta.
                            </p>
                            <li>Uppskattat pris</li>
                            <p>
                                Det uppskattade priset ska ge en indikation på hur mycket förslaget kommer att kosta.
                                Detta
                                bör inkludera den totala kostnaden för förslaget.
                            </p>
                            <li>Kategori</li>
                            <p>
                                Kategorin ska ge en indikation på vad förslaget handlar om. Detta bör väljas från listan
                                över tillhandahållna kategorier.
                            </p>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}