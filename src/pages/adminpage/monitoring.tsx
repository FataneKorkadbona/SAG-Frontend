import { useState, useEffect } from 'react';
import styles from './admin.module.scss';
import axios from 'axios';

interface LogEntry {
    timestamp: string;
    method: string;
    url: string;
    status: number;
    responseTime: number;
    userId: number;
    userEmail: string;
}

const ENTRIES_PER_PAGE = 50;

export default function Monitoring() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchLogs = async (page: number, query: string) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/getLogs`,
                {
                    params: {
                        page,
                        limit: ENTRIES_PER_PAGE,
                        search: query
                    }
                }
            );
            setLogs(response.data.logs);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <>
            <h2>Monitoring</h2>
            <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchBar}
            />
            <table className={styles.logTable}>
                <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Method</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Response Time (ms)</th>
                    <th>User ID</th>
                    <th>User Email</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td>{log.timestamp}</td>
                        <td>{log.method}</td>
                        <td>{log.url}</td>
                        <td>{log.status}</td>
                        <td>{log.responseTime}</td>
                        <td>{log.userId}</td>
                        <td>{log.userEmail}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16, gap: 16 }}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                    Next
                </button>
            </div>
        </>
    );
}