import { useState, useEffect } from 'react';
import styles from './admin.module.scss';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    school: string;
    isAdmin: number;
}

export default function HandleUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

    const toggleAdminStatus = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (selectedUser) {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/updateAdminStatus`, { userId: selectedUser.id, isAdmin: selectedUser.isAdmin === 1 ? 0 : 1 });
                setMessage('Admin status updated successfully.');
                setMessageType('success');
                fetchUsers(); // Refetch users to refresh the table
            } catch (error) {
                console.error('Error updating admin status:', error);
                setMessage('Failed to update admin status.');
                setMessageType('error');
            } finally {
                setIsModalOpen(false);
                setSelectedUser(null);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers: User[] = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.school.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <th>Skola</th>
                    <th>Admin</th>
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
                            <button onClick={() => toggleAdminStatus(user)}>
                                {user.isAdmin === 1 ? 'Ta bort Administratörs rättigheter' : 'Gör till Administratör'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button onClick={handleFirstPage} disabled={currentPage === 1} className="first">{'<<'}</button>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="previous">{'<'}</button>
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? styles.active : ''}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="next">{'>'}</button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages} className="last">{'>>'}</button>
            </div>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Confirm Update</h3>
                        <p>Are you sure you want to <span>{selectedUser?.isAdmin === 1 ? 'remove' : 'add'}</span> admin permissions for <span>{selectedUser?.email}</span>?</p>
                        <button onClick={handleConfirm}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}