// src/components/verify/verify.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const { token } = useParams();

    useEffect(() => {
        console.log("Token:", token); // Debugging line to check the token value
        const verifyAccount = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/confirm/${token}`);
                alert(response.data);
            } catch (error) {
                console.error("Verification error:", error);
                alert("Nu kan du logga in!");
            }
        };

        if (token) {
            verifyAccount();
        } else {
            console.error("Token is undefined");
        }
    }, [token]);

    return (
        <div>
            <h2>Verifying your account...</h2>
        </div>
    );
};

export default Verify;