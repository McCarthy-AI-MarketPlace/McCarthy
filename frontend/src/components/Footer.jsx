import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', padding: '40px 0' }}>
      <Container>
        <Row className="mb-4">
          <Col xs={12} md={6} lg={3}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: "none", color: "black" }}>
              <div style={{ borderRadius: '50%', background: 'linear-gradient(to right, #7C3AED, #3B82F6)', padding: '8px' }}>
                <div style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: '#ffffff' }}></div>
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>McCarthy</span>
            </Link>
            <p style={{ marginTop: '15px', fontSize: '14px', color: '#6B7280', maxWidth: '300px' }}>
              There's an AI for Everything. Find it. Use it. Instantly. McCarthy is your one-stop marketplace for AI tools.
            </p>
          </Col>

          <Col xs={6} md={3}>
            <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Explore</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="/explore" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>All Tools</Link></li>
              <li><Link to="/explore" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Categories</Link></li>
              <li><Link to="/explore" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Popular</Link></li>
              <li><Link to="/explore" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>New Releases</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Company</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>About</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Blog</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Careers</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Legal</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Privacy</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Terms</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Cookie Policy</Link></li>
              <li><Link to="/" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Licenses</Link></li>
            </ul>
          </Col>
        </Row>

        <Row className="border-top pt-4">
          <Col xs={12} md={6} className="text-center text-md-left">
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              © 2025 McCarthy. All rights reserved.
            </p>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-center gap-4">
            <a href="#" style={{ color: '#6B7280', textDecoration: 'none' }}>
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ height: '20px', width: '20px' }}>
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" style={{ color: '#6B7280', textDecoration: 'none' }}>
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ height: '20px', width: '20px' }}>
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" style={{ color: '#6B7280', textDecoration: 'none' }}>
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ height: '20px', width: '20px' }}>
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
