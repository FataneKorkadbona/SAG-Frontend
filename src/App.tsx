import { useLocation } from 'react-router-dom';
import Router from './router.tsx'
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

import './App.scss'

function App() {

    const location = useLocation();
    const hideFooterPaths = ['/login'];

    return (
        <>
            <NavBar/>
            <Router/>
            {!hideFooterPaths.includes(location.pathname) && <Footer />}
        </>
    )
}

export default App