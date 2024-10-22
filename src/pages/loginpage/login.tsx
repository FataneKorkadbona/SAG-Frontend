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
            setErrorMessage("Email is not verified. Please verify your email.");
        }
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (email.trim() === "") {
            setErrorMessage("Email is required");
            return;
        }
        setErrorMessage(""); // Clear any previous error messages
        loginRequest.mutate();
    }

    return (
        <>
            <div className={styles.login__container}>
                <div className={styles.login__content}>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="enter_email">Enter your school email</label>
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
                            Log in
                        </button>
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}