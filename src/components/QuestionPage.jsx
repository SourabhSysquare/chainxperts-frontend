import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { Box, Typography } from '@mui/material';
import './QuestionPage.css';

const QuestionPage = () => {
    const [question, setQuestion] = useState('');
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_BE_SERVICE_URL}/generate/prompt`,
                { question },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQuestion('');
        } catch (error) {
            console.error('Question submission failed', error);
        }
    };

    return (
        <Container className="container">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Submit Your Question
                </Typography>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="question">Question</Label>
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
                    <Button color="primary" type="submit">Submit</Button>
                </Form>
            </Box>
        </Container>
    );
};

export default QuestionPage;
