import React from 'react';
import { Container, Box, Typography, Paper, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { jsPDF } from 'jspdf';
import './Report.css';

const Report = ({ report, handleReset }) => {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(report, 10, 10);
        doc.save('report.pdf');
    };

    return (
        <Paper className="report-container" elevation={3}>
            <Container>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleReset}
                    >
                        Back
                    </Button>
                    <IconButton color="primary" onClick={handleDownloadPDF}>
                        <DownloadIcon />
                    </IconButton>
                </Box>
                <Box mt={5}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Report
                    </Typography>
                    <Typography variant="body1" component="p" className="report-content">
                        {report}
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default Report;
