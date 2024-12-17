// src/FooterContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface FooterContextProps {
    companyName: string;
    address: string;
    phone: string;
    responsiblePerson: string;
    contactInfo: string;
}

interface FooterProviderProps {
    children: ReactNode;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

export const FooterProvider: React.FC<FooterProviderProps> = ({ children }) => {
    const [footerData, setFooterData] = useState<FooterContextProps>({
        companyName: '',
        address: '',
        phone: '',
        responsiblePerson: '',
        contactInfo: '',
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getFooter`).then((response) => {
            setFooterData(response.data);
        });
    }, []);

    return (
        <FooterContext.Provider value={footerData}>
            {children}
        </FooterContext.Provider>
    );
};

export const useFooter = () => {
    const context = useContext(FooterContext);
    if (!context) {
        throw new Error('useFooter must be used within a FooterProvider');
    }
    return context;
};