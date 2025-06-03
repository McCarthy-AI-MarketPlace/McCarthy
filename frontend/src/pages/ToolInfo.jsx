import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Badge, Button,
  ListGroup, Tab, Image, Form
} from 'react-bootstrap';

function ToolDetailsPage() {
  const [selectedTier, setSelectedTier] = useState('Basic');

  const pricing = {
    currentPrice: '₹499/month',
    originalPrice: '₹799/month',
    discountPercentage: 37,
    subscriptionOptions: [
      { tier: 'Basic', price: '₹499/month', features: ['Standard access', 'Community support'] },
      { tier: 'Pro', price: '₹999/month', features: ['Premium access', 'Priority support', 'Advanced features'] },
      { tier: 'Enterprise', price: 'Contact Us', features: ['Custom features', 'Dedicated account manager', 'SLA'] },
    ],
  };

  const badgeStyle = {
    backgroundColor: '#F3EDFF',
    color: '#7D4FDB',
    fontWeight: 500,
    fontSize: '0.875rem',
    borderRadius: '999px',
    padding: '4px 12px',
  };

  return (
    <div style={{ backgroundColor: '#F5F1FF', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Container className="my-5">
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm rounded-4 mb-4">
              <Card.Header className="d-flex align-items-center bg-white border-bottom-0 p-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                  alt="ChatGPT Icon"
                  style={{ width: '48px', height: '48px', borderRadius: '8px', marginRight: '15px', background: '#fff' }}
                />
                <div>
                  <h3 className="mb-0 fw-bold">ChatGPT</h3>
                  <small className="text-muted"> • Text Generation</small>
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="mb-3">
                  <span style={badgeStyle} className="me-2">Chatbot</span>
                  <span style={badgeStyle} className="me-2">Writing</span>
                  <span style={badgeStyle}>Content Creation</span>
                </div>

                <Tab.Container defaultActiveKey="overview">
                  <Tab.Content>
                    <Tab.Pane eventKey="overview">

                      <h4 className="fw-bold mb-3">Overview</h4>

                      <h5 className="fw-semibold">Advanced AI chatbot that can understand complex prompts and generate human-like text.</h5>
                      <p>ChatGPT is a powerful AI tool that helps users create high-quality content, solve complex problems,
                        and boost productivity. It uses advanced machine learning algorithms trained on vast amounts of data
                        to generate human-like responses to user inputs.</p>

                      <h5 className="mt-4 fw-semibold">Use Cases</h5>
                      <ul>
                        <li>Content creation for marketing, social media, and websites</li>
                        <li>Research assistance and information gathering</li>
                        <li>Brainstorming ideas and creative writing</li>
                        <li>Answering questions and providing explanations</li>
                        <li>Automating repetitive writing tasks</li>
                      </ul>

                      <Card className="p-3 mt-4 shadow-sm bg-light rounded-4">
                        <h6 className="fw-semibold">Key Features</h6>
                        <ul className="mb-0">
                          <li>Natural language understanding and generation</li>
                          <li>Multi-turn conversations</li>
                          <li>Custom instructions support</li>
                          <li>Code and document generation</li>
                          <li>Supports multiple languages and tones</li>
                        </ul>
                      </Card>

                      <div className="mt-4">
                        <h6 className="fw-semibold mb-3">Example Outputs from ChatGPT</h6>
                        <Row className="g-3">
                          <Col sm={6}>
                            <Image
                              src="https://i.imgur.com/r6v8Xhf.png"
                              alt="ChatGPT Example 1"
                              fluid
                              rounded
                              className="shadow-sm"
                            />
                          </Col>
                          <Col sm={6}>
                            <Image
                              src="https://i.imgur.com/8Y7xV5T.png"
                              alt="ChatGPT Example 2"
                              fluid
                              rounded
                              className="shadow-sm"
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className="mt-5">
                        <h6 className="fw-semibold mb-3">Similar AI Tools</h6>
                        <Row className="g-4">
                          <Col md={4} sm={6}>
                            <Card className="shadow-sm h-100">
                              <Card.Img variant="top" src="https://assets-global.website-files.com/64f7377cd3c99a1f83f0fce9/6501d3a6eec2a3c34ac52475_claude-ai-icon.png" />
                              <Card.Body>
                                <Card.Title className="fw-semibold">Claude</Card.Title>
                                <Card.Text>Anthropic’s Claude is a conversational AI known for safety and longer context.</Card.Text>
                                <Button variant="outline-primary" size="sm" href="https://claude.ai/" target="_blank">Try Now</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={4} sm={6}>
                            <Card className="shadow-sm h-100">
                              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Google_Gemini_logo.svg/512px-Google_Gemini_logo.svg.png" />
                              <Card.Body>
                                <Card.Title className="fw-semibold">Gemini</Card.Title>
                                <Card.Text>Google Gemini is a powerful multi-modal AI tool integrated with Google Workspace.</Card.Text>
                                <Button variant="outline-primary" size="sm" href="https://gemini.google.com/" target="_blank">Try Now</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={4} sm={12}>
                            <Card className="shadow-sm h-100">
                              <Card.Img variant="top" src="https://cdn.writesonic.com/images/logo-dark.svg" />
                              <Card.Body>
                                <Card.Title className="fw-semibold">Writesonic</Card.Title>
                                <Card.Text>Writesonic helps marketers generate SEO blogs, ads, and website copy instantly.</Card.Text>
                                <Button variant="outline-primary" size="sm" href="https://writesonic.com/" target="_blank">Try Now</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-semibold">Pricing</h5>
                <div className="d-flex align-items-baseline mb-2">
                  <h4 className="fw-bold me-2" style={{ color: '#6c4db9' }}>{pricing.currentPrice}</h4>
                  <span className="text-muted text-decoration-line-through me-2">{pricing.originalPrice}</span>
                  <span className="text-success fw-bold">{pricing.discountPercentage}% Off</span>
                </div>
                <p className="small text-muted mb-4">Inclusive of all taxes. Subscriptions available.</p>

                <h6 className="mb-3">Select a Plan</h6>
                <Form>
                  {pricing.subscriptionOptions.map((option, idx) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      name="pricingTier"
                      id={`tier-${option.tier}`}
                      label={
                        <>
                          <strong>{option.tier}</strong> – {option.price}
                          <ul className="list-unstyled mb-0 ms-3">
                            {option.features.map((f, i) => (
                              <li key={i} className="small text-muted">{f}</li>
                            ))}
                          </ul>
                        </>
                      }
                      checked={selectedTier === option.tier}
                      onChange={() => setSelectedTier(option.tier)}
                      className="mb-3"
                    />
                  ))}
                </Form>

                <h5 className="mt-4">Launch ChatGPT</h5>
                <p>Try ChatGPT directly from McCarthy without switching websites.</p>
                <Button variant="primary" size="lg" className="w-100 mb-3" href="https://chat.openai.com/" target="_blank">
                  Use Now <i className="bi bi-box-arrow-up-right"></i>
                </Button>

                <div className="d-flex justify-content-between mb-2">
                  <Button variant="light" className="w-100 me-2 d-flex align-items-center justify-content-center border rounded" style={{ borderColor: '#ccc' }}>
                    <i className="bi bi-heart me-2"></i> Favorite
                  </Button>
                  <Button variant="light" className="w-100 d-flex align-items-center justify-content-center border rounded" style={{ borderColor: '#ccc' }}>
                    <i className="bi bi-plus me-2"></i> Playlist
                  </Button>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <Button variant="light" className="w-100 d-flex align-items-center justify-content-center border rounded" style={{ borderColor: '#ccc' }}>
                    <i className="bi bi-share me-2"></i> Share
                  </Button>
                </div>

                <h6 className="fw-semibold">Data Sharing</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center"><i className="bi bi-check-circle-fill text-success me-2"></i>No personal data required</ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center"><i className="bi bi-check-circle-fill text-success me-2"></i>Inputs are not stored permanently</ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center"><i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>May use inputs for service improvement</ListGroup.Item>
                </ListGroup>
                <a href="#privacy-details" className="d-block mt-2">View full privacy details</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ToolDetailsPage;




