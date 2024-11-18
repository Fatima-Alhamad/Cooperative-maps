import { useState, useCallback } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from "react-router-dom";

function Scanner({ isOpen, onClose }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [stopStream, setStopStream] = useState(false);
  const navigate = useNavigate();
  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      setHasPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  const handleScan = useCallback((err, result) => {
    if (result) {
      setScannedCode(result.text);
      console.log(result.text);
      // navigate(`/products/${result.text}`); //the correct logic
      navigate(`/products/${2}`); // alternative just for testing
    }
  }, []);

  const handleClose = useCallback(() => {
    setStopStream(true); // stop the scanner
    setScannedCode(""); // clear the scanned code
    setHasPermission(false); // Reset permission
    onClose(); // Call the onClose prop
  }, [onClose]);

  // Reset stopStream when modal open
  if (isOpen && stopStream) {
    setStopStream(false);
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Scan Product</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!hasPermission ? (
          <div className="text-center py-8">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Camera Permission Required
              </h3>
              <p className="text-gray-500 mb-4">
                We need camera access to scan product barcodes
              </p>
            </div>
            <button
              onClick={requestPermission}
              className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Allow Camera Access
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {!stopStream && (
                <BarcodeScannerComponent
                  width="100%"
                  height={300}
                  onUpdate={handleScan}
                  facingMode={isFrontCamera ? "user" : "environment"}
                />
              )}
              <div className="absolute inset-0 border-2 border-blue-500 opacity-50 pointer-events-none">
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-500"></div>
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-blue-500"></div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsFrontCamera(!isFrontCamera)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Switch Camera
              </button>
            </div>

            {scannedCode && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">Scanned Code: {scannedCode}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
