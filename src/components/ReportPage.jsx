import React from 'react';
import { Button } from 'reactstrap';
import { Container, Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/store';
import './Report.css';

const Report = ({ report, handleReset }) => {
    const dispatch = useDispatch();

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(report.title || 'Report', 10, 10);

        if (report.data.length > 0) {
            report.data.forEach((item, index) => {
                doc.text(`Item ${index + 1}`, 10, 20 + index * 10);
                const filteredItem = filterData(item);
                Object.entries(filteredItem).forEach(([key, value], i) => {
                    doc.text(`${camelCaseToWords(key)}: ${value}`, 10, 30 + index * 10 + i * 10);
                });
            });
        }

        doc.save('report.pdf');
    };

    const filterData = (data) => {
        const { id, createdAt, createdBy, updatedAt, ...filteredData } = data;
        return filteredData;
    };

    const camelCaseToWords = (camelCase) => {
        return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
        });
    };

    const renderReportContent = (data) => {
        if (data.length === 0) {
            return <Typography>No data available</Typography>;
        }

        return data.map((item, index) => {
            const filteredItem = filterData(item);
            return (
                <Box key={index} className="report-item">
                    <Typography variant="h6">Item {index + 1}</Typography>
                    {Object.entries(filteredItem).map(([key, value]) => (
                        <Typography key={key} variant="body1">
                            <strong>{camelCaseToWords(key)}:</strong> {String(value)}
                        </Typography>
                    ))}
                </Box>
            );
        });
    };

    return (
        <Paper className="report-container" elevation={3}>
            <Container>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        className="backButton"
                        color="info"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleReset}
                    >
                        Back to QueryPage
                    </Button>
                    <IconButton
                        className="download-button"
                        color="primary"
                        onClick={handleDownloadPDF}
                    >
                        <DownloadIcon />
                        PDF
                    </IconButton>
                    <Button
                        color="danger"
                        className="logout-button"
                        startIcon={<ExitToAppIcon />}
                        onClick={() => dispatch(clearToken())}
                    >
                        Logout
                    </Button>
                </Box>
                <Box mt={5}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {report?.title || 'Report'}
                    </Typography>
                    <Box className="report-content">
                        {renderReportContent(report.data)}
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default Report;
