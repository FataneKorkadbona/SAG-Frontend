import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { UserProvider } from './providers.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.withCredentials = true;
export const { VITE_API_URL: BASE_URL } = import.meta.env;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </QueryClientProvider>
);