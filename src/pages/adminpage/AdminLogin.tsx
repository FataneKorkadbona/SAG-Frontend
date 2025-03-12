import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../../context/EmailContext';
import { useAuth } from '../../context/AuthContext';
import { getAdminId } from './getAdminID';

const AdminLogin = () => {
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const { email } = useEmail();
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const adminId = await getAdminId(email);
        if (adminId) {
            try {
                await adminLogin(email, password);
                navigate('/admin');
            } catch {
                setMessage('An error occurred');
            }
        } else {
            setMessage("Invalid email");
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLogin;