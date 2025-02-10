import {useNavigate} from 'react-router-dom';
import styles from './admin.module.scss';

export default function Admin() {
    const navigate = useNavigate();

    const handleNavigateToHandleUsers = () => {
        navigate('/admin/handleusers');
    };
    const handleNavigateToHandleSuggestions = () => {
        navigate('/admin/suggestions');
    };
    const handleNavigateToHandleRemoveAddUsers = () => {
        navigate('/admin/dangerzone');
    };
    const handleNavigateToHandleMoney = () => {
        navigate('/admin/money');
    };
    const handleNaviagateToEditableStuff = () => {
        navigate('/admin/editablestuff');
    }

    return (
        <>
            <h1>Administration</h1>
            <div className={styles.buttonContainer}>
                <button onClick={handleNaviagateToEditableStuff} className={styles.button}>Uppdatera text på webbplatsen</button>
                <button onClick={handleNavigateToHandleMoney} className={styles.button}>Uppdatera Budget</button>
                <button onClick={handleNavigateToHandleUsers} className={styles.button}>Hantera användare</button>
                <button onClick={handleNavigateToHandleSuggestions} className={styles.button}>Hantera förslag</button>
                <button onClick={handleNavigateToHandleRemoveAddUsers} className={styles.DangerButton}>Uppdatera användare
                </button>
            </div>
        </>
    );
}