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
        className="text-center mt-5"
        style={{ backgroundColor: "#F5F0FA", minHeight: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!tool) {
    return (
      <Container
        className="mt-5"
        style={{ backgroundColor: "#F5F0FA", minHeight: "100vh" }}
      >
        <Alert variant="danger">Tool not found</Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#F5F0FA",
        minHeight: "100vh",
        paddingTop: "80px", // Adjust based on your header height
      }}
    >
      <Container>
        <Row className="g-4">
          {/* LEFT BOX */}
          <Col xs={12} lg={4} className="mb-4 mb-lg-0">
            <Card
              className="h-100"
              style={{
                borderRadius: "1rem",
                border: "1px solid #D1C4E9",
                backgroundColor: "#ffffff",
              }}
            >
              <Card.Body className="text-center">
                <Card.Img
                  variant="top"
                  src={tool.image}
                  alt={tool.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginBottom: "1rem",
                  }}
                />
                <h4 className="fw-bold text-dark">{tool.title}</h4>
                <p className="text-muted mb-1">{tool.pricing}</p>

                {tool.isFeatured && (
                  <Badge bg="success" className="mb-2">
                    Featured
                  </Badge>
                )}
                {tool.isEditorsChoice && (
                  <Badge bg="warning" text="dark" className="mb-2 ms-2">
                    Editor's Choice
                  </Badge>
                )}

                <div className="d-grid mt-3">
                  <Button
                    href={tool.toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#9369DA",
                      border: "none",
                      borderRadius: "0.5rem",
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
              className="h-100"
              style={{
                borderRadius: "1rem",
                border: "1px solid #D1C4E9",
                backgroundColor: "#ffffff",
              }}
            >
              <Card.Body>
                <h5 className="fw-bold mb-3" style={{ color: "#9369DA" }}>
                  Overview
                </h5>
                <p>{tool.description}</p>

                <h6 className="fw-bold mt-4" style={{ color: "#9369DA" }}>
                  Tags
                </h6>
                <div className="mb-3">
                  {tool.hashtags?.map((tag, index) => (
                    <Badge
                      key={index}
                      bg="light"
                      text="dark"
                      className="me-2 mb-2"
                      style={{
                        border: `1px solid #9369DA`,
                        color: "#9369DA",
                        padding: "0.5em 0.75em",
                        borderRadius: "0.75rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#F3EFFF",
                      }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <h6 className="fw-bold" style={{ color: "#9369DA" }}>
                  Keywords
                </h6>
                <div className="mb-3">
                  {tool.keyWords?.map((word, index) => (
                    <Badge
                      key={index}
                      bg="light"
                      text="dark"
                      className="me-2 mb-2"
                      style={{
                        backgroundColor: "#F2F0FA",
                        color: "#9369DA",
                        border: `1px solid #9369DA`,
                        padding: "0.5em 0.75em",
                        borderRadius: "0.75rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      {word}
                    </Badge>
                  ))}
                </div>

                <hr />

                <Row>
                  <Col xs={12} sm={6}>
                    <p>
                      <strong>Saves:</strong> {tool.saves}
                    </p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(tool.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(tool.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
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
