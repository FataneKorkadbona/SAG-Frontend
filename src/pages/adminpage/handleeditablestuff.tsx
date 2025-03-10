import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './admin.module.scss';

export default function HandleEditableStuff() {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [currentIcon, setCurrentIcon] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [introTitle, setIntroTitle] = useState('');
    const [introContent1, setIntroContent1] = useState('');
    const [introContent2, setIntroContent2] = useState('');
    const [introTitle2, setIntroTitle2] = useState('');
    const [chunk1_row2, setChunk1_row2] = useState('');
    const [chunk1_row3, setChunk1_row3] = useState('');
    const [introTitle3, setIntroTitle3] = useState('');
    const [chunk2_row2, setChunk2_row2] = useState('');
    const [chunk2_row3, setChunk2_row3] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/getFooter`).then((response) => {
            const footerInfo = response.data;
            setCompanyName(footerInfo.companyName || '');
            setAddress(footerInfo.address || '');
            setPhone(footerInfo.phone || '');
            setResponsiblePerson(footerInfo.responsiblePerson || '');
            setContactInfo(footerInfo.contactInfo || '');
        });

        axios.get(`${import.meta.env.VITE_API_URL}/api/getIntropage`).then((response) => {
            const introInfo = response.data;
            console.log(response.data);
            setIntroTitle(introInfo.title || '');
            setIntroContent1(introInfo.row1 || '');
            setIntroContent2(introInfo.row2 || '');
            setIntroTitle2(introInfo.title2 || '');
            setChunk1_row2(introInfo.chunk1_row2 || '');
            setChunk1_row3(introInfo.chunk1_row3 || '');
            setIntroTitle3(introInfo.title3 || '');
            setChunk2_row2(introInfo.chunk2_row2 || '');
            setChunk2_row3(introInfo.chunk2_row3 || '');

        });

        axios.get(`${import.meta.env.VITE_API_URL}/getIcon`, {responseType: 'arraybuffer'}).then((response) => {
            const base64Image = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setCurrentIcon(`data:image/png;base64,${base64Image}`);
        }).catch((error) => {
            console.error('Error fetching current icon:', error);
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
        console.log('Submitting footer info:', footerInfo);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/saveFooter`, footerInfo);
        } catch (error) {
            console.error('Error submitting footer info:', error);
        }
    };

    const handleIntroPage = async (event: React.FormEvent) => {
        event.preventDefault();
        const introInfo = {
            title: introTitle,
            row1: introContent1,
            row2: introContent2,
            title2: introTitle2,
            chunk1_row2,
            chunk1_row3,
            title3: introTitle3,
            chunk2_row2,
            chunk2_row3,
        };
        console.log('Submitting intro info:', introInfo);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/saveIntropage`, introInfo);
        } catch (error) {
            console.error('Error submitting intro info:', error);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/uploadIcon`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCurrentIcon(URL.createObjectURL(file));
                setUploadMessage('Icon uploaded successfully!');
            } catch (error) {
                console.error('Error uploading icon:', error);
                setUploadMessage('Failed to upload icon.');
            }
        }
    };

    return (
        <div className={styles.editableFooter}>
            <h2>Uppdatera sidfot</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.adminInputFields}>
                    <div>
                        <label htmlFor="companyName">Företagsnamn:</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Adress:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Mobilnummer:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="responsiblePerson">Ansvarig Person:</label>
                        <input
                            type="text"
                            id="responsiblePerson"
                            name="responsiblePerson"
                            value={responsiblePerson}
                            onChange={(e) => setResponsiblePerson(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="contactInfo">Kontakt information:</label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">Skicka</button>
                <hr/>
                <div>
                    <h2>Nuvarande ikon</h2>
                    <img src={currentIcon} alt="Current Icon" width="100"/>
                    <div className={styles.dropZone}>
                        <input type="file" onChange={handleFileChange}/>
                    </div>
                    {uploadMessage && <p>{uploadMessage}</p>}
                </div>
                <hr/>
                <div>
                    <h2>Uppdatera Intro sidan</h2>
                    <div>
                        <label htmlFor="introTitle">Titel Högst upp:</label>
                        <input
                            type="text"
                            id="introTitle"
                            name="introTitle"
                            value={introTitle}
                            onChange={(e) => setIntroTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.introbox}>
                        <div>
                            <label htmlFor="introTitle">Titel Första raderna:</label>
                            <input
                                type="text"
                                id="introTitle"
                                name="introTitle"
                                value={introTitle2}
                                onChange={(e) => setIntroTitle2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 1</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={introContent1}
                                onChange={(e) => setIntroContent1(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 2</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={chunk1_row2}
                                onChange={(e) => setChunk1_row2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 3</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={chunk1_row3}
                                onChange={(e) => setChunk1_row3(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.introbox}>
                        <div>
                            <label htmlFor="introTitle">Titel Första raderna:</label>
                            <input
                                type="text"
                                id="introTitle"
                                name="introTitle"
                                value={introTitle3}
                                onChange={(e) => setIntroTitle3(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 1</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={introContent2}
                                onChange={(e) => setIntroContent2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 2</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={chunk2_row2}
                                onChange={(e) => setChunk2_row2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="introContent1">Intro 1 Rad 3</label>
                            <textarea
                                id="introContent1"
                                name="introContent1"
                                value={chunk2_row3}
                                onChange={(e) => setChunk2_row3(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" onClick={handleIntroPage}>Skicka</button>
                </div>
            </form>
        </div>
    );
}