import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
    Box,
    Divider,
    Paper,
    IconButton,
    Avatar
  } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const PdfViewer: React.FC = () => {
    const [fileUrl, setFileUrl] = useState<string>(''); // You can replace the default URL with your PDF path.
    const navigate = useNavigate(); // Hook for navigating between pages

    // Initialize the default layout plugin
    const defaultLayout = defaultLayoutPlugin();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        }
    };

    const goBack = () => {
        navigate(-1); // Navigate to the previous webpage
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <h1>PDF Viewer</h1>
            <IconButton onClick={goBack}>
                <ArrowBackIcon />
            </IconButton>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <div style={{ height: '700px', width: '80%', border: '1px solid #ccc', marginTop: '20px' }}>
                {fileUrl ? (
                    <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                        <Viewer fileUrl={fileUrl} plugins={[defaultLayout]} />
                    </Worker>
                ) : (
                    <p>Select a PDF file to view</p>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
