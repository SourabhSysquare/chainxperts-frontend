import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';
import { Box, Typography } from '@mui/material';
import Report from './ReportPage';
import './QuestionPage.css';

const QuestionPage = () => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null); // State to hold the report
    const token = useSelector((state) => state.auth.token);

    const handleReset = () => {
        setQuestion('');
        setReport(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BE_SERVICE_URL}/generate/prompt`,
                { prompt: question },
                { headers: { Authorization: `Bearer ${token}` } }
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
