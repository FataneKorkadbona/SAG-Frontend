import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './providers.tsx';
import './App.scss';

export default function NavBar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const location = useLocation();
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

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
    console.log("User context:", userContext);

    // Hide the navbar only on the home screen and when scrolled to the top
    if (location.pathname === '/' && isAtTop && windowWidth >= 1475) {
        return null;
    }

    const handleLogout = () => {
        userContext?.setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <li className="navbar__item" id="kommun_logo">
                    <img onClick={() => navigate("/")} src="/karlstad__standin.png" alt="Logo"/>
                    <Link to="/accepting" className="navbar__links"> Karlstad Kommun </Link>
                </li>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/" className="navbar__links"> Home </Link>
                    </li>
                    {userContext?.user?.isAuthenticated && (
                        <>
                            <li className="navbar__item">
                                <Link to="/suggestions" className="navbar__links"> Suggestions </Link>
                            </li>
                            <li className="navbar__item">
                                <button onClick={handleLogout} className="navbar__links" id="navbar__button"> Log Out </button>
                            </li>
                        </>
                    )}
                    {!userContext?.user?.isAuthenticated && (
                        <li className="navbar__item">
                            <img src="/karlstad__standin.png" alt="Logo"/>
                            <Link to="/login" className="navbar__links"> Log In </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}