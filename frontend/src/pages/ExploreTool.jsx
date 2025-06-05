import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Spinner,
  Alert,
  Button,
  Badge,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const ExploreTool = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get(`/api/tool/${id}`);
        setTool(res.data.data);
      } catch (error) {
        console.error(error);
        setTool(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!tool) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}
      >
        <Alert variant="danger">Tool not found</Alert>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f9fb", minHeight: "100vh", paddingTop: "80px" }}>
      <Container>
        <Row className="g-4">
          {/* LEFT BOX */}
          <Col xs={12} lg={4}>
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "16px", backgroundColor: "#ffffff" }}
            >
              <Card.Body className="text-center p-4">
                <Card.Img
                  variant="top"
                  src={tool.image}
                  alt={tool.title}
                  style={{
                    maxHeight: "180px",
                    objectFit: "contain",
                    marginBottom: "1rem",
                    borderRadius: "10px",
                  }}
                />
                <h4 className="fw-semibold text-dark">{tool.title}</h4>
                <p className="text-muted small">{tool.pricing}</p>

                {tool.isFeatured && (
                  <Badge bg="success" className="mb-2 me-2">
                    Featured
                  </Badge>
                )}
                {tool.isEditorsChoice && (
                  <Badge bg="warning" text="dark" className="mb-2">
                    Editor's Choice
                  </Badge>
                )}

                <div className="d-grid mt-4">
                  <Button
                    href={tool.toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#6C63FF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                    }}
                  >
                    Visit Tool
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT BOX */}
          <Col xs={12} lg={8}>
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "16px", backgroundColor: "#ffffff" }}
            >
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3" style={{ color: "#6C63FF" }}>
                  Overview
                </h5>
                <p style={{ color: "#333" }}>{tool.description}</p>

                <h6 className="fw-bold mt-4 mb-2" style={{ color: "#6C63FF" }}>
                  Tags
                </h6>
                <div className="mb-3">
                  {tool.hashtags?.map((tag, i) => (
                    <Badge
                      key={i}
                      className="me-2 mb-2"
                      bg="light"
                      text="dark"
                      style={{
                        backgroundColor: "#eee",
                        color: "#6C63FF",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontWeight: "500",
                        fontSize: "0.8rem",
                        border: "1px solid #6C63FF",
                      }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <h6 className="fw-bold mb-2" style={{ color: "#6C63FF" }}>
                  Keywords
                </h6>
                <div className="mb-3">
                  {tool.keyWords?.map((word, i) => (
                    <Badge
                      key={i}
                      className="me-2 mb-2"
                      bg="light"
                      text="dark"
                      style={{
                        backgroundColor: "#f1f0f9",
                        color: "#6C63FF",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontWeight: "500",
                        fontSize: "0.8rem",
                        border: "1px solid #6C63FF",
                      }}
                    >
                      {word}
                    </Badge>
                  ))}
                </div>

                <hr className="my-4" />

                <Row>
                  <Col xs={12} sm={6} className="mb-2">
                    <small className="text-muted">Saves:</small>
                    <div className="fw-bold">{tool.saves}</div>
                  </Col>
                  <Col xs={12} sm={6} className="mb-2">
                    <small className="text-muted">Created At:</small>
                    <div className="fw-bold">
                      {new Date(tool.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </Col>
                  <Col xs={12} sm={6} className="mb-2">
                    <small className="text-muted">Last Updated:</small>
                    <div className="fw-bold">
                      {new Date(tool.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExploreTool;
