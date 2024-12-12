import { useState, FormEvent } from 'react';
import styles from '../homepage/home.module.scss';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.tsx'

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email);
            navigate('/');
        } catch {
            setErrorMessage('E-post är inte verifierad. Vänligen verifiera din e-post.');
        }
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
                    >
                        Logga in
                    </button>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}