import { useState } from 'react';
import styles from './admin.module.scss';
import axios from 'axios';

export default function RemoveAddUsers() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            setMessageType('error');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadExcel`, formData);
            setMessage('File uploaded successfully.');
            setMessageType('success');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
            setMessageType('error');
        }
    };

    const handleClearDatabase = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/clearDatabase`);
            setMessage('Database cleared successfully.');
            setMessageType('success');
        } catch (error) {
            console.error('Error clearing database:', error);
            setMessage('Failed to clear database.');
            setMessageType('error');
        }
    };

    const handleFillDatabase = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/fillDatabase`);
            setMessage('Database filled successfully.');
            setMessageType('success');
        } catch (error) {
            console.error('Error filling database:', error);
            setMessage('Failed to fill database.');
            setMessageType('error');
        }
    };

    return (
        <>
            <h2>Ta bort och lägg till användare</h2>
            <div className={styles.instructions}>
                <h3>Instruktioner</h3>
                <ol>
                    <li>Ladda upp en Excel-fil med användar data.</li>
                    <li>Klicka på "Rensa databas" för att ta bort alla användare.</li>
                    <li>Klicka på "Fyll databas" för att fylla på med användare från Excel-bladet.</li>
                </ol>
            </div>
            {message && <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>{message}</div>}
            <div className={styles.uploadSection}>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Ladda upp fil</button>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={handleClearDatabase}>Rensa databas</button>
                <button onClick={handleFillDatabase}>Fyll databas</button>
            </div>
        </>
    );
}