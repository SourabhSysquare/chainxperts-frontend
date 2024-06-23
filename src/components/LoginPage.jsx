import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { Box, Typography } from '@mui/material';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { emailId: email, password });
            dispatch(setToken(response.data.JWT));
            navigate('/question');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container className="container">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">Login</Button>
                </Form>
            </Box>
        </Container>
    );
};

export default LoginPage;
