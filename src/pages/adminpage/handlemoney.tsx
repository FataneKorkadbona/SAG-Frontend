import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './admin.module.scss';

export default function HandleMoney() {
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch the current money value from the server
        axios.get(`${import.meta.env.VITE_API_URL}/api/getMoney`)
            .then(response => setAmount(response.data.money))
            .catch(() => setErrorMessage('Failed to fetch current money value.'));
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Update the money value on the server
            await axios.post(`${import.meta.env.VITE_API_URL}/api/updateMoney`, { amount });

            // Check the budget of all suggestions
            const suggestionsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/suggestions`);
            const suggestions = suggestionsResponse.data;

            for (const suggestion of suggestions) {
                if (suggestion.budget > amount) {
                    // Delete the suggestion
                    await axios.delete(`${import.meta.env.VITE_API_URL}/money/suggestions/${suggestion.id}`);
                }
            }

            setSuccessMessage('Money updated successfully and necessary actions taken.');
        } catch {
            setErrorMessage('Failed to update money or process suggestions.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Update Money</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="money">Money:</label>
                <input
                    type="number"
                    id="money"
                    name="money"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button type="submit">Update Money</button>
            </form>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
        </div>
    );
}