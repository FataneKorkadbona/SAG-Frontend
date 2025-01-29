import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './suggestion.module.scss';
import modalStyles from './suggestion.modal.module.scss';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../categories.ts';

export default function Suggestion() {
    const { user } = useAuth();
    const userEmail = user?.email || '';

    const [charCount, setCharCount] = useState({
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
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        suggestion: false,
        title: false,
        price: false,
        category: false
    });

    const [budget, setBudget] = useState<number | null>(null);

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getMoney`);
                setBudget(response.data.amount);
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        fetchBudget();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const { id, value } = event.target;
        let newValue = value;

        if (id === 'price') {
            newValue = value.replace(/[^0-9]/g, '');
        }

        const limits = {
            suggestion: 2500,
            title: 25,
            price: 6
        };
        const maxLength = limits[id as keyof typeof limits];
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

    const handleInitialSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!formData.suggestion || !formData.title || !formData.price || formData.category === 'category') {
            setErrorMessage('All fields are required.');
            return;
        }

        setConfirmVisible(true);
    };

    const handleFinalSubmit = async () => {
        setConfirmVisible(false);
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setCheckboxes(prevCheckboxes => ({
            ...prevCheckboxes,
            [id]: checked
        }));
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const allCheckboxesChecked = Object.values(checkboxes).every(Boolean);

    return (
        <>
            <div className={styles.card__container}>
                <div className={styles.card}>
                    <h1>Lämna ett förslag</h1>
                    <h2>Budget: {budget !== null ? `${budget} kr` : 'Loading...'}</h2>
                    <form onSubmit={handleInitialSubmit}>
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

            {isConfirmVisible && (
                <div className={modalStyles.modal}>
                    <div className={modalStyles.modalContent}>
                        <h2>Confirm Your Entries</h2>
                        <ul>
                            <li>
                                <input type="checkbox" id="title" checked={checkboxes.title} onChange={handleCheckboxChange} />
                                <label htmlFor="title">Titel: {formData.title}</label>
                            </li>
                            <li>
                                <input type="checkbox" id="suggestion" checked={checkboxes.suggestion} onChange={handleCheckboxChange} />
                                <label htmlFor="suggestion">Förslag: {formData.suggestion}</label>
                            </li>
                            <li>
                                <input type="checkbox" id="price" checked={checkboxes.price} onChange={handleCheckboxChange} />
                                <label htmlFor="price">Ungefärlig kostnad: {formData.price} kr</label>
                            </li>
                            <li>
                                <input type="checkbox" id="category" checked={checkboxes.category} onChange={handleCheckboxChange} />
                                <label htmlFor="category">Kategori: {formData.category}</label>
                            </li>
                        </ul>
                        <button onClick={handleFinalSubmit} disabled={!allCheckboxesChecked}>Confirm and Submit</button>
                        <button className={modalStyles.goBackButton} onClick={() => setConfirmVisible(false)}>Go Back and Edit</button>
                    </div>
                </div>
            )}

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