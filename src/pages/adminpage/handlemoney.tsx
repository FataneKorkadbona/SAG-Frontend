import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './admin.module.scss';

export default function HandleMoney() {
    const [money, setMoney] = useState(0);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getMoney`).then((response) => {
            const moneyInfo = response.data;
            setMoney(moneyInfo.amount || 0);
        }).catch((error) => {
            console.error('Error fetching money information:', error);
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const moneyInfo = { amount: money };
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/updateMoney`, moneyInfo);
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/removeSuggestionsAboveMoney/${money}`);
        } catch (error) {
            console.error('Error submitting money information:', error);
        }
    };

    return (
        <div className={styles.editableMoney}>
            <h2>Update Money</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="money">Money:</label>
                    <input
                        type="number"
                        id="money"
                        name="money"
                        value={money}
                        onChange={(e) => setMoney(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}