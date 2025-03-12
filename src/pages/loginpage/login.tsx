import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useEmail } from '../../context/EmailContext.tsx';
import './login.scss';

export default function LoginPage() {
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const { email, setEmail } = useEmail();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(email);
            setMessage('Magic link sent to your email.');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setMessage('User account is frozen.');
            } else {
                setMessage('Error sending magic link. Please try again.');
            }
        }
    };

    return (
        <div className={"login__content"}>
            <h2>Logga in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="förnamn.efternamn@edu.karlstad.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Logga in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}