// src/Footer.tsx
import React from 'react';
import './App.scss';
import { useFooter } from './context/FooterContext';

const Footer: React.FC = () => {
    const { companyName, address, phone, responsiblePerson, contactInfo } = useFooter();
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__box">
                    <h3>{companyName}</h3>
                    <p>{address}</p>
                    <p>Telefon: {phone}</p>
                </div>
                <div className="footer__box">
                    <h3>Ansvarig för förslag</h3>
                    <p>{responsiblePerson}</p>
                    <p>{contactInfo}</p>
                </div>
                <div className="footer__box">
                    <h3>Skapad av</h3>
                    <p>NätNinjorna UF</p>
                    <a href="https://natninjorna.se" target="_blank">NatNinjorna.se</a>
                </div>
            </div>
            <p>&copy; {year} {companyName}. Alla rättigheter förbehållna.</p>
        </footer>
    );
};

export default Footer;