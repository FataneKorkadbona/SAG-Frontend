import React, { useState } from 'react';
import axios from 'axios';
import styles from '../admin.module.scss';

export default function AddUsers() {
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [userClass, setUserClass] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !school || !userClass) {
            setMessage('All fields are required.');
            setMessageType('error');
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/addUser`, {
                email,
                school,
                class: userClass
            });
            setMessage('User added successfully.');
            setMessageType('success');
            setEmail('');
            setSchool('');
            setUserClass('');
        } catch (error) {
            setMessage('Failed to add user.');
            setMessageType('error');
        }
    };

    return (
        <div className={styles.addUserContainer}>
            <h2>Add User</h2>
            {message && (
                <div className={messageType === 'success' ? styles.success : styles.error}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className={styles.addUserForm}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <label>
                    School:
                    <input
                        type="text"
                        value={school}
                        onChange={e => setSchool(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <label>
                    Class:
                    <input
                        type="text"
                        value={userClass}
                        onChange={e => setUserClass(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>Add User</button>
            </form>
        </div>
    );
}