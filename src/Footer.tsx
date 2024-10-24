import React from 'react';
import './App.scss';

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__box">
                    <h3>Företagsnamn</h3>
                    <p>1234 Gatunamn, stad</p>
                    <p>Telefon: (123) 456-7890</p>
                </div>
                <div className="footer__box">
                    <h3>Ansvarig för förslag</h3>
                    <p>namn och kontaktinformation för de personer som ansvarar för att acceptera och neka förslag</p>
                </div>
                <div className="footer__box">
                    <h3>Skapad av</h3>
                    <p>NätNinjorna</p>
                    <p>NatNinjorna.se</p>
                </div>
            </div>
            <p>&copy; {year} Ditt Företag. Alla rättigheter förbehållna.</p>
        </footer>
    );
};

export default Footer;