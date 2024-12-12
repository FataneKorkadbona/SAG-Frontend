import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.scss';

export default function NavBar() {
    const {isLoggedIn, logout, isAdmin, user} = useAuth();
    const [isAtTop, setIsAtTop] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Debugging: Log the user object
    console.log("User context:", user);
    console.log("isAuthenticated:", isLoggedIn);
    console.log("isAdmin:", isAdmin);

    // Hide the navbar only on the home screen and when scrolled to the top
    if (location.pathname === '/' && isAtTop && windowWidth >= 1475) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <li className="navbar__item" id="kommun_logo">
                    <img src="/karlstad__standin.png" alt="Logo"/>
                    <Link to="/" className="navbar__links"> Karlstad Kommun </Link>
                </li>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/" className="navbar__links"> Hem </Link>
                    </li>
                    {isLoggedIn && isAdmin && (
                        <li className="navbar__item">
                            <Link to="/accepting" className="navbar__links"> Acceptera </Link>
                        </li>
                    )}
                    {isLoggedIn && isAdmin && (
                        <li className="navbar__item">
                            <Link to="/admin" className="navbar__links"> Admin </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <>
                            <li className="navbar__item">
                                <Link to="/suggestions" className="navbar__links"> Förslag </Link>
                            </li>
                            <li className="navbar__item">
                                <button onClick={handleLogout} className="navbar__links" id="navbar__button"> Logga ut
                                </button>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li className="navbar__item">
                            <img src="/karlstad__standin.png" alt="Logo"/>
                            <Link to="/login" className="navbar__links"> Logga in </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}