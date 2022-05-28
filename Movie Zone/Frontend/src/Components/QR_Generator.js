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
        <section className="text-center">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="card mx-4 mx-md-5 align-items-center justify-content-center shadow-5-strong h-50 w-50">
            <h1>QR Code Details</h1>
            <input type="button" value="Back" onClick={()=>window.location.pathname="/home"}/>
            <hr/>
            <QRCode id='qrCodeEl' size={150} value={params.id}/>
            <hr/>
            <input type="button" value="Download" onClick={downloadQRCode}/>
        </div>
        </div>
      </section>
    </>
    )
}
