import {useState, useEffect} from 'react';
import styles from './admin.module.scss';
import axios from 'axios';

interface Suggestion {
    id: number;
    title: string;
    suggestion: string;
    email: string;
}

export default function HandleSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getSuggestions`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const deleteSuggestion = async (suggestionId: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}`);
            setSuggestions(suggestions.filter(suggestion => suggestion.id !== suggestionId));
            setMessage('Suggestion deleted successfully.');
            setMessageType('success');
        } catch (error) {
            console.error('Error deleting suggestion:', error);
            setMessage('Failed to delete suggestion.');
            setMessageType('error');
        }
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 3000);
    };

    return (
        <>
            <h2>Manage Suggestions</h2>
            {message && <div
                className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>{message}</div>}
            <table className={styles.userTable}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suggestions.map(suggestion => (
                    <tr key={suggestion.id}>
                        <td>{suggestion.title}</td>
                        <td>
                            <div className={styles.scrollableDescription}>
                                {suggestion.suggestion}
                            </div>
                        </td>
                        <td>{suggestion.email}</td>
                        <td>
                            <button onClick={() => deleteSuggestion(suggestion.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}