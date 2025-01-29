import { useState, useEffect, useCallback } from 'react';
import styles from './admin.module.scss';
import axios from 'axios';
import { categories } from '../categories.ts';

interface Suggestion {
    id: number;
    title: string;
    suggestion: string;
    email: string;
    category: string;
    budget: number;
}

export default function HandleSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

    const fetchSuggestions = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getSuggestions`, {
                params: {
                    search: searchTerm,
                    category: filterCategory
                }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, [searchTerm, filterCategory]);

    useEffect(() => {
        fetchSuggestions();
    }, [fetchSuggestions]);

    const confirmDeleteSuggestion = (suggestion: Suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (selectedSuggestion !== null) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/suggestions/${selectedSuggestion.id}`);
                setSuggestions(suggestions.filter(suggestion => suggestion.id !== selectedSuggestion.id));
                setMessage('Suggestion deleted successfully.');
                setMessageType('success');
            } catch (error) {
                console.error('Error deleting suggestion:', error);
                setMessage('Failed to delete suggestion.');
                setMessageType('error');
            } finally {
                setIsModalOpen(false);
                setSelectedSuggestion(null);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedSuggestion(null);
    };

    return (
        <>
            <h2>Manage Suggestions</h2>
            {message && <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>{message}</div>}
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by title, description or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <table className={styles.userTable}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User</th>
                    <th>Category</th>
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
                        <td>{suggestion.category}</td>
                        <td>
                            <button onClick={() => confirmDeleteSuggestion(suggestion)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && selectedSuggestion && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to <span>delete</span> suggestion with title <span>"{selectedSuggestion.title}"</span> and ID <span>{selectedSuggestion.id}</span> by <span>{selectedSuggestion.email}</span>?</p>
                        <button onClick={handleConfirm}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}