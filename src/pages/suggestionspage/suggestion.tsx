import { useState, FormEvent } from 'react';
import styles from './suggestion.module.scss';
import axios from 'axios';
import { useUser } from '../../providers';
import { categories } from '../categories.ts';

type CharLimits = {
    suggestion: number;
    title: number;
    price: number;
};

export default function Suggestion() {
    const { user } = useUser();
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
        const { id, value } = event.target;
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/suggestions`, { ...formData, email: userEmail }, {
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
        } catch {
            setErrorMessage('Failed to submit suggestion. Please try again.');
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
                    <h1>Submit a suggestion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.suggestions__container}>
                            <div className={styles.suggestions__left}>
                                <label htmlFor="suggestion">Suggestion</label>
                                <textarea
                                    name="suggestion"
                                    id="suggestion"
                                    placeholder="Write a description of the suggestion here"
                                    value={formData.suggestion}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.suggestion} characters left</div>
                            </div>
                            <div className={styles.suggestions__right}>
                                <label htmlFor="title">Title</label>
                                <textarea
                                    name="title"
                                    id="title"
                                    rows={1}
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.title} characters left</div>
                                <label htmlFor="price">Estimated Price</label>
                                <textarea
                                    name="price"
                                    id="price"
                                    rows={1}
                                    placeholder="Price: kr"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                                <div className={styles.countdown}>{charCount.price} characters left</div>
                                <label htmlFor="category">Choose a category:</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="category" disabled>none</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>

            <p onClick={showModal} className={styles.showModal__text}>What information is needed for a suggestion?</p>
            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modal__top}>
                            <h1>What information is needed for a suggestion?</h1>
                            <button onClick={hideModal}>X</button>
                        </div>
                        <p>When submitting a suggestion, it is important to provide as much information as possible.
                            This includes:</p>
                        <ul>
                            <li>title</li>
                            <p>
                                The title should give a clear indication of what the suggestion is about.
                            </p>
                            <li>Detailed description of the suggestion</li>
                            <p>
                                The description should provide a detailed explanation of what the suggestion is about.
                                This should include any relevant information that is needed to understand the suggestion
                                as well as information about how the budget will be used and how much each part of the
                                suggestion will cost.
                            </p>
                            <li>Estimated price</li>
                            <p>
                                The estimated price should give an indication of how much the suggestion will cost. This
                                should include the total cost of the suggestion.
                            </p>
                            <li>Category</li>
                            <p>
                                The category should give an indication of what the suggestion is about. This should be
                                chosen from the list of categories provided.
                            </p>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}