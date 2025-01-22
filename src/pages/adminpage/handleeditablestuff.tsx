import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './admin.module.scss';

export default function HandleEditableStuff() {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [currentIcon, setCurrentIcon] = useState('/karlstad__standin.png');
    const [uploadMessage, setUploadMessage] = useState('');
    const [introTitle, setIntroTitle] = useState('');
    const [introContent, setIntroContent] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getFooter`).then((response) => {
            const footerInfo = response.data;
            setCompanyName(footerInfo.companyName || '');
            setAddress(footerInfo.address || '');
            setPhone(footerInfo.phone || '');
            setResponsiblePerson(footerInfo.responsiblePerson || '');
            setContactInfo(footerInfo.contactInfo || '');
        });

        axios.get(`${import.meta.env.VITE_API_URL}/api/getIntroduction`).then((response) => {
            const introInfo = response.data;
            setIntroTitle(introInfo.title || '');
            setIntroContent(introInfo.content || '');
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const footerInfo = {
            companyName,
            address,
            phone,
            responsiblePerson,
            contactInfo,
        };
        await axios.post(`${import.meta.env.VITE_API_URL}/api/saveFooter`, footerInfo);

        const introInfo = {
            title: introTitle,
            content: introContent,
        };
        await axios.post(`${import.meta.env.VITE_API_URL}/api/saveIntroduction`, introInfo);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCurrentIcon(URL.createObjectURL(file));
            setUploadMessage('Icon uploaded successfully!');
        }
    };

    return (
        <div className={styles.editableFooter}>
            <h2>Update Footer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="responsiblePerson">Responsible Person:</label>
                    <input
                        type="text"
                        id="responsiblePerson"
                        name="responsiblePerson"
                        value={responsiblePerson}
                        onChange={(e) => setResponsiblePerson(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="contactInfo">Contact Info:</label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                    />
                </div>
                <hr/>
                <div>
                    <h2>Current Icon</h2>
                    <img src={currentIcon} alt="Current Icon" width="100" />
                    <div className={styles.dropZone}>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    {uploadMessage && <p>{uploadMessage}</p>}
                </div>
                <hr/>
                <div>
                    <h2>Update Introduction</h2>
                    <div>
                        <label htmlFor="introTitle">Title:</label>
                        <input
                            type="text"
                            id="introTitle"
                            name="introTitle"
                            value={introTitle}
                            onChange={(e) => setIntroTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="introContent">Content:</label>
                        <textarea
                            id="introContent"
                            name="introContent"
                            value={introContent}
                            onChange={(e) => setIntroContent(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}