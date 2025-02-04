import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.scss';
import axios from 'axios';

export default function NavBar() {
    const { isLoggedIn, logout, isAdmin } = useAuth();
    const [isAtTop, setIsAtTop] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navbarIcon, setNavbarIcon] = useState('');
    const [companyName, setCompanyName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
            console.log('Scroll position:', window.scrollY);
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log('Window width:', window.innerWidth);
        };

        const fetchNavbarIcon = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/getIcon`, { responseType: 'arraybuffer' });
                const base64Image = btoa(
                    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                setNavbarIcon(`data:image/png;base64,${base64Image}`);
            } catch (error) {
                console.error('Error fetching navbar icon:', error);
            }
        };

        const fetchCompanyName = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getFooter`);
                setCompanyName(response.data.companyName || '');
            } catch (error) {
                console.error('Error fetching company name:', error);
            }
        };

        fetchNavbarIcon();
        fetchCompanyName();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/home');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const shouldHideNavbar = location.pathname.startsWith('/home') && isAtTop && windowWidth >= 1024;

    return (
        <nav id="navbar" className={`navbar ${shouldHideNavbar ? 'hidden' : ''}`}>
            <div className="navbar__container">
                <li className="navbar__item" id="kommun_logo">
                    <img src={navbarIcon} alt="Logo" />
                    <Link to="/" className="navbar__links"> {companyName} </Link>
                </li>
                <button className={`navbar__hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--open' : ''}`}>
                    <li className="navbar__item">
                        <Link to="/home" className="navbar__links"> Hem </Link>
                    </li>
                    {isLoggedIn && isAdmin && (
                        <>
                            <li className="navbar__item">
                                <Link to="/accepting" className="navbar__links"> Acceptera </Link>
                            </li>
                            <li className="navbar__item">
                                <Link to="/admin" className="navbar__links"> Admin </Link>
                            </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <li className="navbar__item">
                                <Link to="/suggestions" className="navbar__links"> Förslag </Link>
                            </li>
                            <li className="navbar__item">
                                <button onClick={handleLogout} className="navbar__links" id="navbar__button"> Logga ut </button>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li className="navbar__item">
                            <img src={navbarIcon} alt="Logo" />
                            <Link to="/login" className="navbar__links"> Logga in </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}