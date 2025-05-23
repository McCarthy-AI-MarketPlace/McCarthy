import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Nav, Form } from "react-bootstrap";
import { Heart, Clock, List, Gear } from "react-bootstrap-icons";
import axios from "axios"; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Favorites");
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/user/favorites");
        setFavorites(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite tools:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <style>
        {`
          .custom-nav .nav-link {
            color: #6c757d;
            border-radius: 999px;
          }
          .custom-nav .nav-link.active {
            background-color: #B58AC5 !important;
            color: white !important;
          }
        `}
      </style>
      <Container fluid className="min-vh-100 p-5 mt-5" style={{ backgroundColor: "#fff" }}>
        <h2 className="fw-bold mb-1">Your Dashboard</h2>
        <p className="text-muted mb-4">Manage your favorite tools, playlists, and settings</p>
        <Nav variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4 gap-2 flex-wrap custom-nav">
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
            {loading ? (
              <p>Loading favorites...</p>
            ) : (
              <Row xs={1} md={3} className="g-4">
                {favorites.length === 0 ? (
                  <p>No favorites yet.</p>
                ) : (
                  favorites.map((tool, idx) => (
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
                          <Card.Text className="text-muted small">{tool.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-white border-0 d-flex justify-content-between">
                          <Button style={{ backgroundColor: "#B58AC5", border: "none" }} className="px-4 py-2 rounded-pill">
                            Use Now
                          </Button>
                          <Button variant="outline-secondary" className="px-3 py-2 rounded-pill">
                            Remove
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            )}
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
                      <Button className="flex-grow-1 rounded-pill" style={{ backgroundColor: "#B58AC5", border: "none" }}>
                        Use Again
                      </Button>
                      <Button variant="outline-secondary" className="rounded-pill">
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
              <Button className="rounded-pill px-3" style={{ backgroundColor: "#B58AC5", border: "none" }}>
                Create New Playlist
              </Button>
            </div>
            <Row xs={1} md={3} className="g-4">
              {playlists.map((playlist, idx) => (
                <Col key={idx}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="fw-semibold mb-2">{playlist.title}</Card.Title>
                        <Card.Text className="text-muted small mb-3">{playlist.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center text-muted small">
                          <span>{playlist.tools} tools</span>
                          <span>Created {playlist.created}</span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <Button className="flex-grow-1 rounded-pill" style={{ backgroundColor: "#B58AC5", border: "none" }}>
                          View Playlist
                        </Button>
                        <Button variant="outline-secondary" className="rounded-pill px-3">
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
            {/* Settings UI here */}
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;