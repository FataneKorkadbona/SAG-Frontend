import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './admin.module.scss';
import Modal from '../../components/Modal/Modal.tsx';
import axios from 'axios';

export default function Admin() {
    const [isOpen, setIsOpen] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getFooter`).then((response) => {
            const footerInfo = response.data;
            setCompanyName(footerInfo.companyName || '');
            setAddress(footerInfo.address || '');
            setPhone(footerInfo.phone || '');
            setResponsiblePerson(footerInfo.responsiblePerson || '');
            setContactInfo(footerInfo.contactInfo || '');
        });
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const footerInfo = {
            companyName,
            address,
            phone,
            responsiblePerson,
            contactInfo,
        };
        await axios.post(`${import.meta.env.VITE_API_URL}/api/saveFooter`, footerInfo);
        closeModal();
    };

    const handleNavigateToHandleUsers = () => {
        navigate('/admin/handleusers');
    };
    const handleNavigateToHandleSuggestions = () => {
        navigate('/admin/suggestions');
    };
    const handleNavigateToHandleRemoveAddUsers = () => {
        navigate('/admin/dangerzone');
    };

    return (
        <>
            <h1>Admin Page</h1>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <h2>Update Footer</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="responsiblePerson">Responsible Person:</label>
                        <input
                            type="text"
                            id="responsiblePerson"
                            name="responsiblePerson"
                            value={responsiblePerson}
                            onChange={(e) => setResponsiblePerson(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="contactInfo">Contact Info:</label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </Modal>

            <div className={styles.buttonContainer}>
                <button onClick={openModal} className={styles.button}>Update Footer</button>
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