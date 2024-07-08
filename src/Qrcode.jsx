import React from 'react';
import "./index.css";
import QRcode from './assets/QRcode.jpg';
import { useState } from 'react';

const Qrcode = () => {
    const [img, setImg] = useState(QRcode);
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("");
    const [qrSize, setQrSize] = useState("");

    function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QRcode", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "Qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch((error) => {
                console.error("The error while downloading img", error);
            });
    }

    return (
        <div>
            <div className='header'><h1><span>Great</span>QR</h1></div>
            <div className='app-container'>
                <h1>QR CODE GENERATOR</h1>
                {loading && <p>Please wait ...</p>}
                {img && <img src={img} alt="Qrcode" className="Qrcode" />}
                <div className='inner-box'>
                    <label htmlFor="dataInput" className='input-label'>Data for Qrcode:</label>
                    <input type="text" value={qrData} id="dataInput" placeholder='Enter the Data for Qrcode' onChange={(e) => setQrData(e.target.value)} />
                    <label htmlFor="sizeInput" className='input-label'>Image size (e.g., 200):</label>
                    <input type="text" value={qrSize} id="sizeInput" placeholder='Enter the Image size' onChange={(e) => setQrSize(e.target.value)} />
                    <button className='generate-btn' disabled={loading} onClick={generateQR}>Generate Qrcode</button>
                    <button className='download-btn' onClick={downloadQR}>Download</button>
                </div>
                <div className='footer'>
                    <p>Designed By<span className='footer-span'> StarrySanjay ⚝</span> </p>
                </div>
            </div>
        </div>
    )
}

export default Qrcode;
