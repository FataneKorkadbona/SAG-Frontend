import {Link} from 'react-router-dom';
import './App.scss';

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                    <ul className="navbar__menu">
                        <li className="navbar__item">
                            <Link to="/" className="navbar__links" > Home </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/suggestions" className="navbar__links" > Sug </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/accepting" className="navbar__links" > acc </Link>
                        </li>
                    </ul>
            </div>
        </nav>
    );
}