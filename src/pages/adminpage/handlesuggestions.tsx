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
    participate: number;
}

export default function HandleSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
    const [denyReason, setDenyReason] = useState<string>('');

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
                await axios.patch(`${import.meta.env.VITE_API_URL}/suggestions/${selectedSuggestion.id}`, {
                    status: 'denied',
                    denyReason
                });
                setSuggestions(suggestions.filter(suggestion => suggestion.id !== selectedSuggestion.id));
                setMessage('Förlaget har nekats.');
                setMessageType('success');
            } catch (error) {
                console.error('Error denying suggestion:', error);
                setMessage('Failed to deny suggestion.');
                setMessageType('error');
            } finally {
                setIsModalOpen(false);
                setSelectedSuggestion(null);
                setDenyReason('');
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedSuggestion(null);
        setDenyReason('');
    };

    return (
        <>
            <h2 className={styles.manage__suggestions}>Hantera Förslag</h2>
            {message && <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>{message}</div>}
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Sök efter titel, beskrivning eller mail-adress"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">Alla kategorier</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <table className={styles.userTable}>
                <thead>
                <tr>
                    <th>Titel</th>
                    <th>Beskrivning</th>
                    <th>Användare</th>
                    <th>Kategori</th>
                    <th>Deltagande</th>
                    <th>Åtgärder</th>
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
                        <td>{suggestion.participate === 1 ? 'Vill delta' : 'Vill inte delta'}</td>                        <td>
                            <button onClick={() => confirmDeleteSuggestion(suggestion)}>
                                Neka
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && selectedSuggestion && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Bekräfta avslag</h3>
                        <p>Är du säker på att du vill neka förslaget med titeln "{selectedSuggestion.title}" och ID {selectedSuggestion.id} av {selectedSuggestion.email}?</p>                        <textarea
                            required
                            placeholder="Skriv varför förslaget nekas:"
                            value={denyReason}
                            onChange={(e) => setDenyReason(e.target.value)}
                        />
                        <button onClick={handleConfirm} disabled={!denyReason.trim()}>Bekräfta</button>
                        <button onClick={handleCancel}>Avbryt</button>
                    </div>
                </div>
            )}
        </>
    );
}