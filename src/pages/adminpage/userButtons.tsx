import { useNavigate } from 'react-router-dom';
import styles from './admin.module.scss';

export default function UserButtons() {
    const navigate = useNavigate();

    return (
        <div className={styles.buttonContainer}>
            <button
                className={styles.button}
                onClick={() => navigate('/admin/usermanagement/handleusers')}
            >
                Hantera användare
            </button>
            <button
                className={styles.button}
                onClick={() => navigate('/admin/usermanagement/addusers')}
            >
                Lägg till användare
            </button>
        </div>
    );
}