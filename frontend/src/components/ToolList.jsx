import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Heart } from "lucide-react";

export default function ToolList({ tools }) {
  const [likedTools, setLikedTools] = useState({}); // object mapping tool IDs to heart state

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const toggleHeart = (id) => {
    setLikedTools((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const trendingTools = tools.slice(0, 12).map((tool) => ({
    _id: tool._id,
    icon: tool.image || "https://placehold.co/40x40/E0E0E0/333333?text=AI",
    name: tool.title,
    description: tool.description,
    tags: tool.hashtags,
    toolUrl: tool.toolUrl,
  }));

  return (
    <Container className="my-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold"
          style={{ color: "#7646C3", fontSize: "2.5rem" }}
        >
          Top Trending Tools
        </h2>
        <Button
          variant="link"
          style={{ color: "#9369DA", textDecoration: "none" }}
          href="/explore"
        >
          View all tools &rarr;
        </Button>
      </div>

      <Row>
        {trendingTools.map((tool, index) => (
          <Col lg={4} md={6} className="mb-4" key={tool._id || index}>
            <Card
              style={{
                borderRadius: "15px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease-in-out",
                overflow: "hidden",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Card.Body
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                    gap: "1rem",
                  }}
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "15px",
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <Card.Title
                      className="mb-0 fw-bold"
                      style={{ color: "#333333" }}
                    >
                      {tool.name}
                    </Card.Title>
                  </div>
                </div>

                <Card.Text className="text-muted mb-3">
                  {truncateText(tool.description, 75)}{" "}
                  {/* Apply truncateText here */}
                </Card.Text>

                <div className="mb-3">
                  {tool.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="badge me-2 mb-2 rounded-pill"
                      style={{
                        backgroundColor: "#F0F0FF",
                        color: "#7646C3",
                        fontWeight: "500",
                        padding: "8px 12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <Button
                    href={tool.toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#6c63ff",
                      backgroundImage:
                        "linear-gradient(to right, #6c63ff, #8a7dff)",
                      borderColor: "#6c63ff",
                      borderRadius: "8px",
                      padding: "8px 20px",
                      boxShadow: "0 2px 5px rgba(138, 94, 253, 0.7)",
                      color: "white",
                      transition:
                        "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#5a52e0";
                      e.currentTarget.style.backgroundImage =
                        "linear-gradient(to right, #5a52e0, #7a6be0)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#6c63ff";
                      e.currentTarget.style.backgroundImage =
                        "linear-gradient(to right, #6c63ff, #8a7dff)";
                    }}
                    className="rounded-pill"
                  >
                    Use Now
                  </Button>

                  <Button
                    variant="light"
                    className="rounded-circle d-flex justify-content-center align-items-center shadow-sm"
                    onClick={() => toggleHeart(tool._id)}
                    style={{
                      width: "38px",
                      height: "38px",
                      border: "1px solid #E0E0E0" /* Corrected border syntax */,
                      color: "#8B5CF6",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Heart
                      size={20}
                      fill={likedTools[tool._id] ? "#FF0000" : "none"}
                      color={likedTools[tool._id] ? "#FF0000" : "#8B5CF6"}
                    />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
