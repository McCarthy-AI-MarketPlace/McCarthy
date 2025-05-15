import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
  BsTwitter,
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsEnvelope,
} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mt-5" style={{ background: '#0f0f11', color: '#ddd', paddingTop: '4rem', paddingBottom: '2rem'}}>
      <Container>
        <Row className="gy-4">
          {/* Brand and Description */}
          <Col md={4}>
            <h4 className="text-white">AI Marketplace</h4>
            <p style={{ maxWidth: '300px' }}>
              Discover, compare, and integrate cutting-edge AI tools for productivity, creativity, and development — all in one place.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary">
                <BsTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-secondary">
                <BsLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-secondary">
                <BsGithub size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-secondary">
                <BsFacebook size={20} />
              </a>
            </div>
          </Col>

          {/* Product Links */}
          <Col md={2}>
            <h6 className="text-uppercase text-white">Products</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">AI Chatbots</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Text Generators</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Image Tools</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Video Tools</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Developer APIs</a></li>
            </ul>
          </Col>

          {/* Resources */}
          <Col md={2}>
            <h6 className="text-uppercase text-white">Resources</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">Documentation</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">API Access</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Affiliate Program</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Marketplace Guidelines</a></li>
            </ul>
          </Col>

          {/* Company Info */}
          <Col md={2}>
            <h6 className="text-uppercase text-white">Company</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-secondary text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Partners</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>

          {/* Newsletter Signup */}
          <Col md={2}>
            <h6 className="text-uppercase text-white">Stay Updated</h6>
            <Form>
              <Form.Group controlId="formEmail" className="mb-2">
                <Form.Control type="email" placeholder="Email address" size="sm" />
              </Form.Group>
              <Button variant="primary" size="sm" className="w-100">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Bottom Strip */}
        <hr className="mt-5" style={{ borderColor: '#444' }} />
        <p className="text-center text-muted small mb-0">
          &copy; {new Date().getFullYear()} AI Marketplace. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
