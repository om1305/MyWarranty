import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/forgot-password`, {
        email,
      });

      alert(res.data.msg || 'Reset email sent successfully');
      setEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
      alert(error.response?.data?.msg || 'Failed to send reset email');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}
    >
      <Card
        style={{
          width: '28rem',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#333' }}>
            Forgot Password
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: '5px', borderColor: '#ddd' }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              style={{
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderRadius: '5px',
              }}
            >
              Send Reset Link
            </Button>

            <p className="text-center mb-0">
              <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
                Back to Login
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;