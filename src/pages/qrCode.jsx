import React, { useState } from "react";
import QRCode from "react-qr-code"; // Default export
import html2canvas from "html2canvas";
import Navbar from "../components/navBar";

function QrCode() {
  const [linkToGenerate, setLinkToGenerate] = useState("");
  const [generatedQRCode, setGeneratedQRCode] = useState("");

  // Handle barcode scan

  // Handle QR code generation
  const handleGenerateQRCode = () => {
    if (linkToGenerate.trim() !== "") {
      setGeneratedQRCode(linkToGenerate);
    }
  };

  // Download the generated QR code as an image
  const handleDownloadQRCode = () => {
    if (generatedQRCode) {
      const qrCodeElement = document.getElementById("qr-code-to-download");

      // Use html2canvas to capture the QR code and trigger download
      html2canvas(qrCodeElement, {
        scale: 2, // Capture in higher resolution to ensure sharpness
        useCORS: true, // Useful if there are external resources like images
        logging: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "generated-qr-code.png"; // Filename for the download
        link.click();
      });
    }
  };

  return (
    <div className="container mx-auto  text-center bg-gray-50">
        <div className="h-[70px]">
      <Navbar />
        </div>
      <h1 className="text-3xl font-semibold mb-8">
        QR Code Reader and Generator
      </h1>

      {/* QR Code Generator Section */}
      <div>
        <h2 className="text-xl font-medium mb-4">Generate a QR Code</h2>
        <input
          type="text"
          placeholder="Enter link to generate QR code"
          value={linkToGenerate}
          onChange={(e) => setLinkToGenerate(e.target.value)}
          className="p-3 w-4/5 mb-4 border-2 border-gray-300 rounded-md"
        />
        <button
          onClick={handleGenerateQRCode}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Generate
        </button>

        {generatedQRCode && (
          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">Generated QR Code</h2>
            <div
              id="qr-code-to-download"
              className="mx-auto mb-4"
              style={{ width: "256px", height: "256px" }}
            >
              <QRCode value={generatedQRCode} size={256} />
            </div>
            <p className="mb-4">
              <strong>Generated QR Code for:</strong> {generatedQRCode}
            </p>
            <button
              onClick={handleDownloadQRCode}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCode;
