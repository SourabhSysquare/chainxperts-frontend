import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Container, Spinner } from 'reactstrap';
import { Box, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Report from './ReportPage';
import { clearToken, setQuestion } from '../redux/store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './QuestionPage.css';
import { useNavigate } from 'react-router-dom';

const QuestionPage = () => {
    const [question, setQuestionState] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [listening, setListening] = useState(false);
    const [micStatus, setMicStatus] = useState('Microphone is off');
    const token = useSelector(state => state.auth.token);
    const reduxQuestion = useSelector(state => state.auth.question);
    const dispatch = useDispatch();
    const speechRecognitionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (reduxQuestion) {
            setQuestionState(reduxQuestion);
            handleSubmit();
        }
    }, [reduxQuestion]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            speechRecognitionRef.current = new SpeechRecognition();
            speechRecognitionRef.current.continuous = true;
            speechRecognitionRef.current.interimResults = true;
            speechRecognitionRef.current.lang = 'en-US';

            speechRecognitionRef.current.onstart = () => {
                console.log("Speech recognition started");
                setMicStatus('Microphone is on');
            };

            speechRecognitionRef.current.onend = () => {
                console.log("Speech recognition stopped");
                setMicStatus('Microphone is off');
            };

            speechRecognitionRef.current.onresult = event => {
                const transcript = Array.from(event.results)
                    .map(result => result.isFinal ? result[0].transcript + '. ' : result[0].transcript)
                    .join('');
                setQuestionState(prev => prev + transcript);
            };

            speechRecognitionRef.current.onerror = event => {
                console.error('Speech recognition error', event.error);
                setMicStatus(`Error occurred in speech recognition: ${event.error}`);
            };
        } else {
            console.error('Speech recognition is not supported in this browser.');
            setMicStatus('Speech recognition not supported by your browser.');
        }
    }, []);

    const handleReset = () => {
        setQuestionState('');
        setReport(null);
        setMicStatus('Microphone is off');
        dispatch(setQuestion(''));
    };

    const toggleListening = () => {
        if (!speechRecognitionRef.current) return;
        console.log("Toggle listening: ", !listening);

        if (listening) {
            speechRecognitionRef.current.stop();
            setListening(false);
        } else {
            speechRecognitionRef.current.start();
            setListening(true);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BE_SERVICE_URL}/prompt`,
                { prompt: question, token: token },
            );
            setReport({ data: response.data?.data, title: response.data?.topic });
        } catch (error) {
            console.error('Question submission failed', error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container">
            {!report ? (
                <Box>
                    <Box mb={4}>
                        <Button
                            className='backButton'
                            color="info"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => {
                                navigate('/history');
                            }}
                        >
                            Query Logs
                        </Button>
                        <Button
                            color="danger"
                            className='logout-button'
                            startIcon={<ExitToAppIcon />}
                            onClick={() => dispatch(clearToken())
                            }
                        >
                            Logout
                        </Button>
                    </Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Submit Your Queries to Generate Report
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                type="textarea"
                                name="question"
                                id="question"
                                value={question}
                                onChange={(e) => setQuestionState(e.target.value)}
                                required
                                placeholder="Please Create a report for"
                            />
                            <Box mt={5}>
                                <IconButton
                                    className='backButton'
                                    onClick={toggleListening} color="primary">
                                    {listening ? <MicOffIcon /> : <MicIcon />}
                                    <Typography variant="subtitle1" color="secondary">
                                        {micStatus}
                                    </Typography>
                                </IconButton>
                                <Button
                                    className='logout-button'
                                    color="success" type="submit" disabled={loading}>
                                    {loading ? <Spinner size="sm" /> : 'Submit'}
                                </Button>
                            </Box>
                        </FormGroup>
                    </Form>
                </Box>
            ) : (
                <Report report={report} handleReset={handleReset} />
            )}
        </Container>
    );
};

export default QuestionPage;
