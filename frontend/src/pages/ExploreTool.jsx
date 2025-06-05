// src/pages/ExploreTool.jsx

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
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!tool) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Tool not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="p-3 text-center">
            <Card.Img
              variant="top"
              src={tool.image}
              alt={tool.title}
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <h4 className="mt-3 fw-bold">{tool.title}</h4>
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

            <Button
              href={tool.toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-3"
            >
              Visit Tool
            </Button>
          </Card>
        </Col>

        <Col md={8}>
          <h5>Description</h5>
          <p>{tool.description}</p>

          <h6 className="mt-4">Tags</h6>
          <div className="mb-3">
            {tool.hashtags?.map((tag, index) => (
              <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                #{tag}
              </Badge>
            ))}
          </div>

          <h6>Keywords</h6>
          <div className="mb-3">
            {tool.keyWords?.map((word, index) => (
              <Badge key={index} bg="secondary" className="me-2 mb-2">
                {word}
              </Badge>
            ))}
          </div>

          <div className="mt-4">
            <p>
              <strong>Saves:</strong> {tool.saves}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(tool.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(tool.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ExploreTool;
