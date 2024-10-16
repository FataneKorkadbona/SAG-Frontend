import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.scss';

export default function NavBar() {
    const [isAtTop, setIsAtTop] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Hide the navbar only on the home screen and when scrolled to the top
    if (location.pathname === '/' && isAtTop) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <li className="navbar__item" id="kommun_logo">
                    <img src="/public/karlstad__standin.png" alt="Logo"/>
                    <Link to="/accepting" className="navbar__links"> Karlstad Kommun </Link>
                </li>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/" className="navbar__links"> Home </Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/suggestions" className="navbar__links"> Suggestions </Link>
                    </li>
                    <li className="navbar__item">
                        <img src="/public/karlstad__standin.png" alt="Logo"/>
                        <Link to="/" className="navbar__links"> Log In </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}