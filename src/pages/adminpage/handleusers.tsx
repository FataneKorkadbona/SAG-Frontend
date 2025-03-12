import { useState, useEffect } from 'react';
import styles from './admin.module.scss';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    school: string;
    isAdmin: number;
    freeze: number;
}

export default function HandleUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [adminFilter, setAdminFilter] = useState<string | null>(null);
    const [schoolFilter, setSchoolFilter] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getUsers`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleAdminStatus = async (user: User) => {
        if (user.isAdmin === 1) {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/updateAdminStatus`, { userId: user.id, isAdmin: 0 });
                setMessage('Admin status removed successfully.');
                setMessageType('success');
                fetchUsers();
            } catch (error) {
                console.error('Error updating admin status:', error);
                setMessage('Failed to update admin status.');
                setMessageType('error');
            }
        } else {
            setMessage('Admin status cannot be added directly.');
            setMessageType('error');
        }
    };

    const toggleFreezeStatus = async (user: User) => {
        try {
            const endpoint = user.freeze ? '/api/unfreezeUser' : '/api/freezeUser';
            await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, { userId: user.id });
            setMessage(user.freeze ? 'User unfrozen successfully.' : 'User frozen successfully.');
            setMessageType('success');
            fetchUsers();
        } catch (error) {
            console.error('Error updating freeze status:', error);
            setMessage('Failed to update freeze status.');
            setMessageType('error');
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleAdminFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAdminFilter(event.target.value);
    };

    const handleSchoolFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSchoolFilter(event.target.value);
    };

    const filteredUsers: User[] = users.filter(user =>
        (user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.school.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (adminFilter === null || adminFilter === '' || (adminFilter === 'Ja' ? user.isAdmin === 1 : user.isAdmin === 0)) &&
        (schoolFilter === null || schoolFilter === '' || user.school === schoolFilter)
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers: User[] = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const getPageNumbers = () => {
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
            <h2>Hantera användare</h2>
            {message && <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>{message}</div>}
            <input
                type="text"
                placeholder="Sök bland användare..."
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchBar}
            />
            <table className={styles.userTable}>
                <thead>
                <tr>
                    <th>Mail-adress</th>
                    <th>
                        Skola
                        <select onChange={handleSchoolFilterChange} className={styles.filterDropdown}>
                            <option value="">Alla</option>
                            <option value="Sundsta-Älvkullegymnasiet">Sundsta-Älvkullegymnasiet</option>
                            <option value="Nobelgymnasiet">Nobelgymnasiet</option>
                            <option value="Tingvallagymnasiet">Tingvallagymnasiet</option>
                        </select>
                    </th>
                    <th>
                        Admin
                        <select onChange={handleAdminFilterChange} className={styles.filterDropdown}>
                            <option value="">Alla</option>
                            <option value="Ja">Ja</option>
                            <option value="Nej">Nej</option>
                        </select>
                    </th>
                    <th>Åtgärder</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.school}</td>
                        <td>{user.isAdmin === 1 ? 'Ja' : 'Nej'}</td>
                        <td>
                            <button className={styles.actionButton} onClick={() => toggleAdminStatus(user)}>
                                {user.isAdmin === 1 ? 'Ta bort Administratörs rättigheter' : 'Gör till Administratör'}
                            </button>
                            <button className={styles.actionButton} onClick={() => toggleFreezeStatus(user)}>
                                {user.freeze === 1 ? 'Unfreeze User' : 'Freeze User'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="first">{'<<'}</button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="previous">{'<'}</button>
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? styles.active : ''}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="next">{'>'}</button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="last">{'>>'}</button>
            </div>
        </>
    );
}