import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.jpg';
import warrantyImg from '../assets/warranty.jpg';
const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Top Navbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <h3 style={{ margin: 0, color: '#007bff', fontWeight: 'bold' }}>
          Warranty & Bill Manager
        </h3>

        <div>
          <Link to="/login">
            <Button
              variant="outline-primary"
              className="me-2"
              style={{ borderRadius: '6px' }}
            >
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              variant="primary"
              style={{
                borderRadius: '6px',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
              }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <Container className="py-5">
        <Row className="align-items-center" style={{ minHeight: '75vh' }}>
          <Col md={6} className="mb-4 mb-md-0">
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#222',
                marginBottom: '20px',
              }}
            >
              Manage Your Warranties and Bills in One Place
            </h1>

            <p
              style={{
                fontSize: '18px',
                color: '#555',
                lineHeight: '1.8',
                marginBottom: '25px',
              }}
            >
              Warranty & Bill Manager helps users store product details,
              upload bills, track warranty expiry dates, and manage all their
              important purchase records easily from one dashboard.
            </p>

            <div>
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="me-3"
                  style={{
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    borderRadius: '8px',
                    padding: '10px 24px',
                  }}
                >
                  Get Started
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outline-dark"
                  size="lg"
                  style={{
                    borderRadius: '8px',
                    padding: '10px 24px',
                  }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </Col>

          <Col md={6}>
            <Card
              style={{
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src={warrantyImg}
                alt="Warranty App"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="pb-5">
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>
          Features
        </h2>

        <Row>
          <Col md={4} className="mb-4">
            <Card
              style={{
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '20px',
                height: '100%',
              }}
            >
              <h4 style={{ color: '#007bff' }}>Store Warranties</h4>
              <p style={{ color: '#555', marginBottom: 0 }}>
                Save warranty details of your products and access them anytime.
              </p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card
              style={{
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '20px',
                height: '100%',
              }}
            >
              <h4 style={{ color: '#007bff' }}>Upload Bills</h4>
              <p style={{ color: '#555', marginBottom: 0 }}>
                Keep digital copies of bills and purchase records safely in one place.
              </p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card
              style={{
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '20px',
                height: '100%',
              }}
            >
              <h4 style={{ color: '#007bff' }}>Track Expiry Dates</h4>
              <p style={{ color: '#555', marginBottom: 0 }}>
                Easily monitor expiry dates so you never miss a warranty period.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px 20px',
          marginTop: '20px',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="text-center text-md-start mb-3 mb-md-0">
              <img
  src={profileImg}
  alt="Om Agarwal"
  style={{
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover',
  }}
/>
            </Col>

            <Col md={9} className="text-center text-md-start">
              <h5 style={{ marginBottom: '10px', color: '#222' }}>Om Agarwal</h5>
              {/* <p style={{ marginBottom: '6px', color: '#555' }}>
                LinkedIn:{' '}
                <a
                  href="https://linkedin.com/in/your-linkedin-id"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  https://www.linkedin.com/in/0m-agarwal/
                </a>
              </p> */}
              <p style={{ marginBottom: '6px', color: '#555' }}>
  LinkedIn:{' '}
  <a
    href="https://www.linkedin.com/in/0m-agarwal/"
    target="_blank"
    rel="noreferrer"
    style={{ textDecoration: 'none', color: '#007bff', fontWeight: '500' }}
  >
    Om Agarwal
  </a>
</p>
              {/* <p style={{ marginBottom: 0, color: '#555' }}>
                Instagram:{' '}
                <a
                  href="https://instagram.com/your-instagram-id"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  @your-instagram-id
                </a>
              </p> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;