import React from 'react';
import './App.scss';

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__left">
                    <h3>Company Name</h3>
                    <p>1234 Street Name, city</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="footer__middle">
                    <h3>In charge of suggestions</h3>
                    <p>names and contact info of the people in charge of accepting and denying the suggestions</p>
                </div>
                <div className="footer__right">
                    <h3>Made by</h3>
                    <p>NätNinjorna</p>
                    <p>NatNinjorna.se</p>
                </div>
            </div>
            <p>&copy; {year} Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;