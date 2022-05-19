import React from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'

export default function QR_Generator() {
    const params = useParams();

    const downloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCodeEl').toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }
    return (
    <>
        <QRCode id='qrCodeEl' size={150} value={params.id}/>
        <input type="button" value="Download" onClick={downloadQRCode}/>
    </>
    )
}
