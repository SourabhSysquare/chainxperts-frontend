import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearQuestion, clearToken, setQuestion } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
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
            setQueries(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
            <Paper className="history-container" elevation={3}>
                <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1">
                        Query History
                    </Typography>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => {
                                dispatch(clearQuestion())
                                navigate('/question')
                            }}
                            style={{ marginRight: '10px' }}
                        >
                            Back to Question
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ExitToAppIcon />}
                            onClick={handleLogout}
                            style={{ marginRight: '10px' }}
                        >
                            Logout
                        </Button>
                        <IconButton color="primary" onClick={fetchQueries}>
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </Box>
                <Table className="query-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Prompt</TableCell>
                            <TableCell>Action</TableCell>
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
                                        Use
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default QueryHistoryPage;
