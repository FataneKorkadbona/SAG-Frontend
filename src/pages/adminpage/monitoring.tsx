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

export default function Monitoring() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch logs from the backend
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getLogs`);
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredLogs = logs.filter(log =>
        log.timestamp.includes(searchQuery) ||
        log.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.status.toString().includes(searchQuery) ||
        log.responseTime.toString().includes(searchQuery) ||
        log.userId?.toString().includes(searchQuery) ||
        log.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                {filteredLogs.map((log, index) => (
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
        </>
    );
}