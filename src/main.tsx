import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {Providers} from "./providers.tsx";

axios.defaults.withCredentials = true;
export const { VITE_API_URL: BASE_URL } = import.meta.env;

createRoot(document.getElementById('root')!).render(
    <Providers>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Providers>,
)
