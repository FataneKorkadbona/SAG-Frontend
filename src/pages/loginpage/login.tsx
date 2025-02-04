import { useState, useEffect, FormEvent } from 'react';
import styles from '../homepage/home.module.scss';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.tsx'

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isButtonDisabled) {
            setRemainingTime(120); // 5 minutes in seconds
            timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isButtonDisabled]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsButtonDisabled(true);

        try {
            await login(email);
            navigate('/home');
        } catch {
            setErrorMessage('E-post är inte verifierad. Vänligen verifiera din e-post. Det kan ta upp till 20 minuter tills du får mejlet. (klicka inte på knappen flera gånger)');
        }
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <div className={styles.login__container}>
            <div className={styles.login__content}>
                <h1>Logga In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="enter_email">Skriv in din skol E-post</label>
                    <input
                        type="email"
                        value={email}
                        placeholder={"School email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                    >
                        Logga in
                    </button>
                    {isButtonDisabled && <p>Button disabled for: {formatTime(remainingTime)}</p>}
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}