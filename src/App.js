// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import About from './components/About';
// import Navbar from './components/Navbar'; // Import the Navbar component
// import toast, { Toaster } from 'react-hot-toast';

// function App() {
//     const [file, setFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [prediction, setPrediction] = useState('');
//     const [predictionProbability, setPredictionProbability] = useState(null); // Added state for probability
//     const [gradient, setGradient] = useState({ x: 0, y: 0 });

//     const handleMouseMove = (event) => {
//         const { clientX, clientY, currentTarget } = event;
//         const { offsetWidth, offsetHeight } = currentTarget;
//         const x = (clientX / offsetWidth) * 100;
//         const y = (clientY / offsetHeight) * 100;
//         setGradient({ x, y });
//     };

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);
//         setPrediction('');
//         setPredictionProbability(null); // Reset probability when a new file is selected

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImagePreview(reader.result);
//         };
//         reader.readAsDataURL(selectedFile);
//     };

//     const handleReset = () => {
//         if (file != null || imagePreview != null) {
//             setFile(null);
//             setImagePreview(null);
//             setPrediction('');
//             setPredictionProbability(null); // Reset probability on reset
//             toast.success("Reset Success");
//             document.getElementById('fileInput').value = '';
//         } else {
//             toast.error("Nothing to Reset");
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('file', file);
    
//         try {
//             const apiUrl = process.env.REACT_APP_API_URL;
//             console.log("API URL in request:", apiUrl);
    
//             const response = await axios.post(`${apiUrl}/predict`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log("API Response:", response);
    
//             setPrediction(response.data.predicted_class);
//             setPredictionProbability(response.data.prediction_probability); // Set the prediction probability
    
//             if (response.data.error != null && response.data.error === "No file part") {
//                 toast.error("Choose a file to predict");
//             } else {
//                 toast.success("Prediction Success");
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             toast.error("Prediction Error");
//         }
//     };
    
    
    

//     return (
//         <Router>
//             <Navbar />
//             <Toaster />
//             <div className="App" onMouseMove={handleMouseMove} style={{ '--x': `${gradient.x}%`, '--y': `${gradient.y}%` }}>
//                 <Routes>
//                     <Route
//                         path="/"
//                         element={
//                             <div className="box">
//                                 <h2>Upload and Predict Image</h2>
//                                 <p><strong>Note:</strong> Only ultrasound images are accepted for prediction.</p> {/* Added note */}
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="file-input-container">
//                                         <input
//                                             type="file"
//                                             id="fileInput"
//                                             onChange={handleFileChange}
//                                             style={{ display: 'none' }}
//                                         />
//                                         <label htmlFor="fileInput" className="file-input-button">
//                                             Choose File
//                                         </label>
//                                         <button type="button" onClick={handleReset} className="reset-button">
//                                             Reset
//                                         </button>
//                                     </div>
//                                     {imagePreview && (
//                                         <div className="image-preview">
//                                             <img src={imagePreview} alt="Uploaded" />
//                                         </div>
//                                     )}
//                                     <button type="submit">Upload and Predict</button>
//                                 </form>
//                                 {prediction && (
//                                     <div className="prediction">
//                                         <h3>Prediction: {prediction}</h3>
//                                         <h4>Probability: {(predictionProbability * 100).toFixed(2)}%</h4> {/* Show probability */}
//                                     </div>
//                                 )}
//                             </div>
//                         }
//                     />
//                     <Route path="/about" element={<About />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
import React, { useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas for capturing the image

function App() {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [predictionProbability, setPredictionProbability] = useState(null);
    const [gradient, setGradient] = useState({ x: 0, y: 0 });
    const fileInputRef = useRef(null);

    const handleMouseMove = (event) => {
        const { clientX, clientY, currentTarget } = event;
        const { offsetWidth, offsetHeight } = currentTarget;
        const x = (clientX / offsetWidth) * 100;
        const y = (clientY / offsetHeight) * 100;
        setGradient({ x, y });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setPrediction('');
        setPredictionProbability(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleReset = () => {
        if (file || imagePreview) {
            setFile(null);
            setImagePreview(null);
            setPrediction('');
            setPredictionProbability(null);
            toast.success("Reset Success");

            if (fileInputRef.current) {
                fileInputRef.current.value = ''; 
            }
        } else {
            toast.error("Nothing to Reset");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error("Choose a file to predict");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${apiUrl}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPrediction(response.data.predicted_class);
            setPredictionProbability(response.data.prediction_probability);

            toast.success("Prediction Success");
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error("Prediction Error");
        }
    };

    // Function to download the report as PDF
    const handleDownloadPDF = async () => {
        const doc = new jsPDF();
    
        // Page size
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
    
        // Add a border around the entire page
        doc.setDrawColor(0, 0, 0); // Border color (black)
        doc.setLineWidth(2); // Border thickness
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Draw border with padding from the edges
    
        // Title position with one-line gap from the top border
        const titleMarginTop = 20; // Distance from the top border
        doc.setFontSize(28);
        doc.text('BREAST CANCER DETECTION', pageWidth / 2, 10 + titleMarginTop, { align: 'center' });
    
        // Capture the image from the preview
        const canvas = await html2canvas(document.querySelector('.image-preview img'));
        const imgData = canvas.toDataURL('image/png');
    
        // Image properties
        const imgWidth = 100; // Adjust width as needed
        const imgHeight = 100; // Adjust height as needed
        const imgX = (pageWidth - imgWidth) / 2; // Center the image horizontally
        const imgY = 20 + titleMarginTop + 10; // Margin from the title
    
        // Add image to PDF
        doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
    
        // Increase font size for prediction and probability
        doc.setFontSize(20);
    
        // Adjust the spacing between the prediction and probability text
        const textMargin = 20; // Decrease this value to reduce the gap
        doc.text(`Prediction: ${prediction}`, 20, imgY + imgHeight + textMargin);
        doc.text(`Probability: ${(predictionProbability * 100).toFixed(2)}%`, 20, imgY + imgHeight + textMargin + 20); // Adjusted position
    
        // Save the PDF
        doc.save('prediction-report.pdf');
    };
    
        

    return (
        <Router>
            <Navbar />
            <Toaster />
            <div className="App" onMouseMove={handleMouseMove} style={{ '--x': `${gradient.x}%`, '--y': `${gradient.y}%` }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="box">
                                <h2>Upload and Predict Image</h2><br />
                                <p><strong>Note:</strong> Only ultrasound images are accepted for prediction.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="file-input-container">
                                        {!imagePreview && (
                                            <>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="fileInput" className="file-input-button">
                                                    Choose File
                                                </label>
                                            </>
                                        )}
                                        {imagePreview && (
                                            <button type="button" onClick={handleReset} className="reset-button">
                                                Reset
                                            </button>
                                        )}
                                    </div>
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Uploaded" />
                                        </div>
                                    )}
                                    {imagePreview && (
                                        <button type="submit">Predict</button>
                                    )}
                                </form>

                                {prediction && (
                                    <div className="prediction">
                                        <h3>Prediction: {prediction}</h3>
                                        <h4>Probability: {(predictionProbability * 100).toFixed(2)}%</h4>
                                        {/* Download button with icon */}
                                        <button
                                            className="download-button"
                                            onClick={handleDownloadPDF}
                                        >
                                            <img
                                                src="/download.png" // Add the download image/icon to your project and use its path here
                                                alt="Download"
                                            />
                                            Download Report
                                        </button>

                                    </div>
                                )}
                            </div>
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
