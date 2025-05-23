import React, { useState } from "react";

import { Container, Row, Col, Button, Card, Nav, Form } from "react-bootstrap";

import { Heart, Clock, List, Gear } from "react-bootstrap-icons";

const favorites = [
  {
    name: "ChatGPT",

    rating: 4.8,

    description:
      "Advanced AI chatbot that can understand complex prompts and generate human-like text.",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },

  {
    name: "Midjourney",

    rating: 4.9,

    description:
      "Generate beautiful, detailed images from text prompts for illustration and concept art.",

    image:
      "https://seeklogo.com/images/M/midjourney-logo-6E1DBDCF5E-seeklogo.com.png",
  },

  {
    name: "GitHub Copilot",

    rating: 4.6,

    description:
      "AI pair programmer that helps you write better code by suggesting code snippets.",

    image:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
];

const recentlyUsed = [
  {
    name: "Midjourney",

    time: "Just now",

    image:
      "https://seeklogo.com/images/M/midjourney-logo-6E1DBDCF5E-seeklogo.com.png",
  },

  {
    name: "DALL-E",

    time: "2 hours ago",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/OpenAI_Logo.svg/2048px-OpenAI_Logo.svg.png",
  },

  {
    name: "ChatGPT",

    time: "1 day ago",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
];

const playlists = [
  {
    title: "Content Creation",

    description:
      "Tools for creating blog posts, social media content, and marketing materials",

    tools: 5,

    created: "2 weeks ago",
  },

  {
    title: "Design Work",

    description:
      "AI tools for generating and editing images, creating designs, and visual content",

    tools: 3,

    created: "2 weeks ago",
  },

  {
    title: "Software Development",

    description:
      "Tools that help with coding, debugging, and software documentation",

    tools: 4,

    created: "2 weeks ago",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Favorites");

  return (
    <>
      <style>{`

    .custom-nav .nav-link {

     color: #6c757d;

     border-radius: 999px;

    }

    .custom-nav .nav-link.active {

     background-color: #B58AC5 !important;

     color: white !important;

    }

   `}</style>

      <Container
        fluid
        className="min-vh-100 p-5 mt-5"
        style={{ backgroundColor: "#fff" }}
      >
        <h2 className="fw-bold mb-1">Your Dashboard</h2>

        <p className="text-muted mb-4">
          Manage your favorite tools, playlists, and settings
        </p>

        <Nav
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 gap-2 flex-wrap custom-nav"
        >
          <Nav.Item>
            <Nav.Link eventKey="Favorites">
              <Heart className="me-1" />
              Favorites
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="Recently Used">
              <Clock className="me-1" />
              Recently Used
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="AI Playlists">
              <List className="me-1" />
              AI Playlists
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="Settings">
              <Gear className="me-1" />
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === "Favorites" && (
          <>
            <h5 className="fw-semibold mb-3">Your Favorite Tools</h5>

            <Row xs={1} md={3} className="g-4">
              {favorites.map((tool, idx) => (
                <Col key={idx}>
                  <Card className="h-100 shadow-sm rounded-4">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          width="40"
                          height="40"
                          className="me-3 rounded"
                          style={{ objectFit: "contain" }}
                        />

                        <div>
                          <h6 className="mb-0 fw-semibold">{tool.name}</h6>

                          <div className="d-flex align-items-center text-warning small">
                            <span className="text-dark">{tool.rating}</span>
                          </div>
                        </div>
                      </div>

                      <Card.Text className="text-muted small">
                        {tool.description}
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer className="bg-white border-0 d-flex justify-content-between">
                      <Button
                        style={{ backgroundColor: "#B58AC5", border: "none" }}
                        className="px-4 py-2 rounded-pill"
                      >
                        Use Now
                      </Button>

                      <Button
                        variant="outline-secondary"
                        className="px-3 py-2 rounded-pill"
                      >
                        Remove
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {activeTab === "Recently Used" && (
          <>
            <h5 className="fw-semibold mb-3">Recently Used Tools</h5>

            <Row xs={1} md={3} className="g-4">
              {recentlyUsed.map((tool, idx) => (
                <Col key={idx}>
                  <Card className="h-100 bg-white shadow-sm border-0 rounded-4 p-3">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        width="40"
                        height="40"
                        className="me-3 rounded"
                        style={{ objectFit: "contain" }}
                      />

                      <div>
                        <h6 className="mb-0 fw-semibold">{tool.name}</h6>

                        <small className="text-muted">{tool.time}</small>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        className="flex-grow-1 rounded-pill"
                        style={{ backgroundColor: "#B58AC5", border: "none" }}
                      >
                        Use Again
                      </Button>

                      <Button
                        variant="outline-secondary"
                        className="rounded-pill"
                      >
                        Add to Favorites
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {activeTab === "AI Playlists" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold mb-0">Your AI Playlists</h5>

              <Button
                className="rounded-pill px-3"
                style={{ backgroundColor: "#B58AC5", border: "none" }}
              >
                Create New Playlist
              </Button>
            </div>

            <Row xs={1} md={3} className="g-4">
              {playlists.map((playlist, idx) => (
                <Col key={idx}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="fw-semibold mb-2">
                          {playlist.title}
                        </Card.Title>

                        <Card.Text className="text-muted small mb-3">
                          {playlist.description}
                        </Card.Text>

                        <div className="d-flex justify-content-between align-items-center text-muted small">
                          <span>{playlist.tools} tools</span>

                          <span>Created {playlist.created}</span>
                        </div>
                      </div>

                      <div className="mt-3 d-flex gap-2">
                        <Button
                          className="flex-grow-1 rounded-pill"
                          style={{ backgroundColor: "#B58AC5", border: "none" }}
                        >
                          View Playlist
                        </Button>

                        <Button
                          variant="outline-secondary"
                          className="rounded-pill px-3"
                        >
                          Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {activeTab === "Settings" && (
          <>
            <h5 className="fw-semibold mb-4">Privacy Settings</h5>

            <Card className="mb-4 border-0 shadow-sm rounded-4 p-3 bg-white">
              <Card.Body>
                <h6 className="fw-semibold mb-3">Account Information</h6>

                <Row className="mb-3 align-items-center">
                  <Col md={8}>
                    <strong>Email Address</strong>

                    <div className="text-muted">example@email.com</div>
                  </Col>

                  <Col md={4} className="text-md-end mt-2 mt-md-0">
                    <Button
                      variant="outline-secondary"
                      className="rounded-pill px-4"
                    >
                      Change
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col md={8}>
                    <strong>Password</strong>

                    <div className="text-muted">Last changed 30 days ago</div>
                  </Col>

                  <Col md={4} className="text-md-end mt-2 mt-md-0">
                    <Button
                      variant="outline-secondary"
                      className="rounded-pill px-4"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-4 p-3 bg-white">
              <Card.Body>
                <h6 className="fw-semibold mb-3">Privacy Preferences</h6>

                <Row className="mb-3 align-items-center">
                  <Col md={8}>
                    <strong>Usage Analytics</strong>

                    <div className="text-muted small">
                      Allow McCarthy to collect data on which tools you use to
                      improve recommendations.
                    </div>
                  </Col>

                  <Col md={4} className="text-md-end mt-2 mt-md-0">
                    <Form.Check
                      type="switch"
                      id="analytics-switch"
                      checked={true}
                      onChange={() => {}}
                    />
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col md={8}>
                    <strong>Save Search History</strong>

                    <div className="text-muted small">
                      Lets us remember your searches to make finding tools
                      easier next time.
                    </div>
                  </Col>

                  <Col md={4} className="text-md-end mt-2 mt-md-0">
                    <Form.Check
                      type="switch"
                      id="history-switch"
                      checked={true}
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
