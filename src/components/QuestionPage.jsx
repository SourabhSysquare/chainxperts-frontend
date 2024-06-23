import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';
import { Box, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Report from './ReportPage';
import './QuestionPage.css';

const QuestionPage = () => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [listening, setListening] = useState(false);
    const [micStatus, setMicStatus] = useState('Microphone is off');
    const token = useSelector(state => state.auth.token);
    const speechRecognitionRef = useRef(null);

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
                setQuestion(prev => prev + transcript);
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
        setQuestion('');
        setReport(null);
        setMicStatus('Microphone is off');
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
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BE_SERVICE_URL}/generate/prompt`,
                { prompt: question, token: token },
                // { headers: { Authorization: `Bearer ${token}` } }
            );
            setReport(response.data?.message);
        } catch (error) {
            console.error('Question submission failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container">
            {!report ? (
                <Box mt={5}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Submit Your Queries
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        {micStatus}
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="question">Problem</Label>
                            <Input
                                type="textarea"
                                name="question"
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                                placeholder="Write your question here"
                            />
                            <IconButton onClick={toggleListening} color="primary">
                                {listening ? <MicOffIcon /> : <MicIcon />}
                            </IconButton>
                        </FormGroup>
                        <Button color="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Submit'}
                        </Button>
                    </Form>
                </Box>
            ) : (
                <Report report={report} handleReset={handleReset} />
            )}
        </Container>
    );
};

export default QuestionPage;
