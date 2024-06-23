import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearQuestion, clearToken, setQuestion } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import { Container, Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './QuestionPage.css';

const QueryHistoryPage = () => {
    const [queries, setQueries] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const fetchQueries = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BE_SERVICE_URL}/history`,
                { token },
            );
            const data = response.data?.data
            setQueries(data?.filter(e => e.title).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Failed to fetch query history', error);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleUseQuery = (prompt) => {
        dispatch(setQuestion(prompt));
        navigate('/question');
    };

    const handleLogout = () => {
        dispatch(clearToken())
    };

    return (
        <Container className="container">
            <Box mt={3}>
                <Button
                    variant="contained"
                    className='backButton'
                    color="info"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => {
                        dispatch(clearQuestion())
                        navigate('/question')
                    }}
                >
                    Report Generation
                </Button>
                <Button
                    className='backButton'
                    color='danger'
                    variant="contained"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                <IconButton
                    className='refresh-button'
                    color="primary" onClick={fetchQueries}>
                    <RefreshIcon />
                </IconButton>
            </Box>
            <Paper className="history-container" elevation={3}>
                <Typography variant="h4" component="h1">
                    Query History
                </Typography>
                <Table className="query-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Prompt</TableCell>
                            <TableCell>Generate Report</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {queries.map((query) => (
                            <TableRow key={query.createdAt}>
                                <TableCell>{new Date(query.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{query.title}</TableCell>
                                <TableCell>{query.prompt}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUseQuery(query.prompt)}
                                    >
                                        Run
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container >
    );
};

export default QueryHistoryPage;
