import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Badge,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Image,
} from "react-bootstrap";
import { FaStar, FaRegStar, FaShareAlt, FaHeart, FaList } from "react-icons/fa";

const ExploreTool = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get(`/api/tool/${id}`);
        setTool(res.data.data);
      } catch (err) {
        console.error("Failed to load tool:", err);
      }
    };
    fetchTool();
  }, [id]);

  if (!tool) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const {
    title,
    rating,
    categoryTags,
    overview,
    useCases,
    toolUrl,
    dataSharing,
    addedBy,
    image,
    features,
    pricing,
  } = tool;

  return (
    <Container className="py-5 mt-5">
      <Row className="align-items-start gx-5">
        {/* Left Content */}
        <Col lg={8}>
          {image && (
            <div
              className="mb-5 p-3 bg-light d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1.5rem",
                minHeight: "280px",
                maxHeight: "350px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                src={image}
                alt={title}
                fluid
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "1rem",
                }}
              />
            </div>
          )}

          <h1 className="fw-bold mb-2 text-dark">
            {title}
            <span className="ms-3 text-warning fs-5 d-inline-flex align-items-center">
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.floor(rating) ? (
                  <FaStar key={i} />
                ) : (
                  <FaRegStar key={i} />
                )
              )}
              <span className="ms-2 text-muted">({rating}/5)</span>
            </span>
          </h1>

          {/* Tags */}
          <div className="mb-4">
            {categoryTags?.map((tag, idx) => (
              <Badge
                key={idx}
                bg="primary"
                className="me-2 rounded-pill px-3 py-1 text-white"
                style={{ backgroundColor: "#7c3aed" }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tabs */}
          <div className="d-flex gap-4 mb-4 border-bottom pb-2">
            <span className="fw-semibold text-primary border-bottom border-primary border-3 pb-2 cursor-pointer">
              Overview
            </span>
            <span className="fw-semibold text-muted cursor-pointer">Features</span>
            <span className="fw-semibold text-muted cursor-pointer">Reviews</span>
            <span className="fw-semibold text-muted cursor-pointer">Alternatives</span>
          </div>

          {/* Overview */}
          <section className="mb-5">
            <h4 className="fw-bold mb-3 text-dark">About {title}</h4>
            <p className="lead text-secondary">{overview}</p>
          </section>

          {/* Features */}
          {features && features.length > 0 && (
            <section className="mb-5">
              <h4 className="fw-bold mb-3 text-dark">Key Features</h4>
              <Row>
                {features.map((feature, idx) => (
                  <Col md={6} key={idx} className="mb-2">
                    <li className="text-secondary list-unstyled">
                      <span className="me-2 text-primary">●</span> {feature}
                    </li>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* Use Cases */}
          {useCases && useCases.length > 0 && (
            <section className="mb-5">
              <h4 className="fw-bold mb-3 text-dark">Common Use Cases</h4>
              <ul>
                {useCases.map((use, idx) => (
                  <li key={idx} className="text-secondary mb-1">
                    {use}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Col>

        {/* Right Sidebar */}
        <Col lg={4}>
          <Card
            className="shadow-lg border-0"
            style={{ borderRadius: "1.25rem", position: "sticky", top: "2rem" }}
          >
            {image && (
              <div
                className="bg-light p-3 border-bottom d-flex align-items-center"
                style={{ borderRadius: "1.25rem 1.25rem 0 0" }}
              >
                <Image
                  src={image}
                  alt={title}
                  roundedCircle
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  className="me-3 border"
                />
                <div>
                  <h5 className="mb-0 fw-bold">{title}</h5>
                  <Badge bg="info" className="fw-semibold px-2 py-1 rounded-pill">
                    {pricing || "N/A"}
                  </Badge>
                </div>
              </div>
            )}

            <Card.Body className="p-4">
              {!image && pricing && (
                <div className="mb-3 text-center">
                  <h5 className="fw-bold text-dark">Pricing Model</h5>
                  <Badge
                    bg="info"
                    className="fw-semibold fs-6 px-3 py-2 rounded-pill"
                  >
                    {pricing}
                  </Badge>
                </div>
              )}

              <Button
                href={toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-100 mb-3 fw-bold py-2"
                style={{
                  backgroundColor: "#7c3aed",
                  border: "none",
                  borderRadius: "0.75rem",
                  fontSize: "1.1rem",
                }}
              >
                Use Now
              </Button>

              <div className="d-flex justify-content-around mb-4">
                <Button
                  variant="outline-primary"
                  size="md"
                  className="rounded-pill px-3 py-2"
                >
                  <FaHeart className="me-2" /> Favorite
                </Button>
                <Button
                  variant="outline-primary"
                  size="md"
                  className="rounded-pill px-3 py-2"
                >
                  <FaList className="me-2" /> Playlist
                </Button>
                <Button
                  variant="outline-primary"
                  size="md"
                  className="rounded-pill px-3 py-2"
                >
                  <FaShareAlt className="me-2" /> Share
                </Button>
              </div>

              <h5 className="fw-bold mb-3 text-dark">Data Privacy & Sharing</h5>
              <ul className="list-unstyled small mb-4">
                {dataSharing?.noPersonalData && (
                  <li className="mb-2 text-success">
                    <span className="me-2">✅</span> No personal data required
                  </li>
                )}
                {dataSharing?.inputsNotStored && (
                  <li className="mb-2 text-success">
                    <span className="me-2">✅</span> Inputs not stored permanently
                  </li>
                )}
                {dataSharing?.usedForTraining && (
                  <li className="mb-2 text-warning">
                    <span className="me-2">⚠️</span> May use inputs for service
                    improvement
                  </li>
                )}
                {!dataSharing?.noPersonalData &&
                  !dataSharing?.inputsNotStored &&
                  !dataSharing?.usedForTraining && (
                    <li className="text-muted">
                      No specific data sharing information provided.
                    </li>
                  )}
              </ul>

              <a href="#" className="small text-primary fw-medium d-block mb-4">
                View full privacy details
              </a>

              {addedBy && (
                <div className="mt-4 pt-3 border-top text-muted small">
                  <strong className="text-dark">Added by:</strong>{" "}
                  {addedBy.fullName} ({addedBy.email})
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExploreTool;
