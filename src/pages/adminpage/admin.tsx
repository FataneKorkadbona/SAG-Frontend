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
            <h1>Admin Page</h1>
            <div className={styles.buttonContainer}>
                <button onClick={handleNaviagateToEditableStuff} className={styles.button}>Update Editable Stuff</button>
                <button onClick={handleNavigateToHandleMoney} className={styles.button}>Update Money</button>
                <button onClick={handleNavigateToHandleUsers} className={styles.button}>Manage Users</button>
                <button onClick={handleNavigateToHandleSuggestions} className={styles.button}>Manage suggestions
                </button>
                <button onClick={handleNavigateToHandleRemoveAddUsers} className={styles.DangerButton}>Remove and Add
                    users
                </button>
            </div>
        </>
    );
}