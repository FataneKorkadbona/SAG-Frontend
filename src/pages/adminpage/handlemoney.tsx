import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './admin.module.scss';

export default function HandleMoney() {
    const [money, setMoney] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getMoney`).then((response) => {
            const moneyInfo = response.data;
            setMoney(moneyInfo.amount || 0);
        }).catch((error) => {
            console.error('Error fetching money information:', error);
        });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        const moneyInfo = { amount: money };
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/updateMoney`, moneyInfo);
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/removeSuggestionsAboveMoney/${money}`);
        } catch (error) {
            console.error('Error submitting money information:', error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.editableMoney}>
            <h2>Uppdatera budget</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="money">Budget:</label>
                    <input
                        type="number"
                        id="money"
                        name="money"
                        value={money}
                        onChange={(e) => setMoney(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Skicka</button>
            </form>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Bekräfta Uppdateringen</h3>
                        <p>Är du säker på att du vill uppdatera budgeten till {money} kr?</p>
                        <button onClick={handleConfirm}>Bekräfta</button>
                        <button onClick={handleCancel}>Avbryt</button>
                    </div>
                </div>
            )}
        </div>
    );
}