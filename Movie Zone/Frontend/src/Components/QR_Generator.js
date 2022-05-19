import React from 'react'
import QRCode from 'qrcode.react'

export default function QR_Generator() {
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
        <QRCode id='qrCodeEl' size={150} value='62825d53db43e300a742346'/>
        <input type="button" value="Download" onClick={downloadQRCode}/>
    </>
    )
}
