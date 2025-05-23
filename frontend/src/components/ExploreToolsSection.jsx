import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { FaStar, FaHeart, FaPlus } from "react-icons/fa";
import { tools as toolsData } from "../data/Tools";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import axios from "axios";

const formatCategoryName = (id) => {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ExploreToolsSection({
  selectedCategory,
  selectedPricing,
  selectedRating,
  selectedTags,
}) {
  const [filteredTools, setFilteredTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let updatedTools = [...toolsData];

    if (selectedCategory && selectedCategory !== "All") {
      const key = selectedCategory.toLowerCase().replace(/ /g, "-");
      updatedTools = updatedTools.filter((tool) => tool.category.includes(key));
    }

    if (selectedPricing) {
      updatedTools = updatedTools.filter((tool) => tool.pricing === selectedPricing);
    }

    if (selectedRating > 0) {
      updatedTools = updatedTools.filter((tool) => tool.rating >= selectedRating);
    }

    if (selectedTags.length > 0) {
      updatedTools = updatedTools.filter((tool) =>
        selectedTags.every((tag) => tool.tags?.includes(tag))
      );
    }

    setFilteredTools(updatedTools);
  }, [selectedCategory, selectedPricing, selectedRating, selectedTags]);

  const handleFavoriteClick = async (toolId) => {
    if (!currentUser) {
      toast.info("Login to add tools to favorites", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      const isFavorite = favorites.includes(toolId);
      const url = isFavorite ? "/api/user/removeFavorite" : "/api/user/addFavorite";
      const response = await axios.post(url, { toolId }, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      setFavorites(response.data.favorites);

      if (isFavorite) {
        toast.success("Tool removed from your favorites", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success("Tool added to your favorites", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error updating favorites", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Row className="g-4 py-4">
      {filteredTools.map((tool) => (
        <Col key={tool.id} xs={12} sm={6} md={4} lg={4}>
          <Card
            className="h-100 shadow-sm rounded-4"
            style={{
              transition: "transform 0.2s, boxShadow 0.2s",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Card.Img
              variant="top"
              src={tool.imageUrl}
              alt={tool.name}
              style={{ height: "180px", objectFit: "contain", padding: "1rem" }}
            />

            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0" style={{ fontSize: "1.1rem" }}>
                  {tool.name}
                </h5>
                {tool.featured && (
                  <Badge bg="warning" text="dark" className="rounded-pill px-2">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="d-flex align-items-center mb-2" style={{ fontSize: "0.9rem" }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} style={{ color: "#f8d64e", marginRight: "2px" }} />
                ))}
                <span className="ms-2 text-muted">{tool.rating.toFixed(1)}</span>
              </div>

              {/* Display Categories */}
              {tool.category && (
                <div className="mb-2 d-flex flex-wrap gap-2">
                  {tool.category.map((cat) => (
                    <Badge
                      key={cat}
                      bg="info"
                      text="light"
                      className="px-2 py-1 rounded-pill"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {formatCategoryName(cat)}
                    </Badge>
                  ))}
                </div>
              )}

              <Card.Text className="text-muted" style={{ minHeight: "60px", fontSize: "0.9rem" }}>
                {tool.description}
              </Card.Text>

              <div className="mb-3 d-flex flex-wrap gap-2">
                {tool.tags?.slice(0, 3).map((tag, idx) => (
                  <Badge
                    key={idx}
                    bg="light"
                    text="dark"
                    className="px-3 py-2 rounded-pill"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card.Body>

            <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center px-3 pb-3">
              <Button
                variant="primary"
                size="md"
                href={tool.link}
                target="_blank"
                className="rounded-pill px-4"
                style={{ backgroundColor: "#8c5dc7", border: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7b47ab";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#8c5dc7";
                }}
              >
                Use Now
              </Button>

              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  className="rounded-circle p-2 shadow-sm"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                  onClick={() => handleFavoriteClick(tool.id)} 
                >
                  <FaHeart
                    style={{
                      color: favorites.includes(tool.id) ? "red" : "#555",
                    }} 
                  />
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
