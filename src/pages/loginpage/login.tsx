import { useState, FormEvent, useContext } from 'react';
import styles from '../homepage/home.module.scss';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const loginRequest = useMutation({
        mutationFn: async () => {
            return await axios.post(import.meta.env.VITE_API_URL + "/login", { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        onSuccess: (res) => {
            userContext?.setUser({ isAuthenticated: true, ...res.data });
            navigate("/");
        },
        onError: () => {
            setErrorMessage("E-post är inte verifierad. Vänligen verifiera din e-post.");
        }
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (email.trim() === "") {
            setErrorMessage("E-post krävs");
            return;
        }
        setErrorMessage(""); // Clear any previous error messages
        loginRequest.mutate();
    }

    return (
        <>
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
                            disabled={loginRequest.isPending}
                        >
                            Logga in
                        </button>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}