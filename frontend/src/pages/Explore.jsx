import React, { useState, useEffect } from "react";
import axios from "axios";
import ToolList from "../components/ToolList";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
  Modal, // Import Modal for the filter popup
} from "react-bootstrap";
import { Search, SlidersHorizontal } from "lucide-react"; // Importing search and filter icons

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [pricingFilters, setPricingFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false); // State for modal visibility

  const categories = [
    "Text Generation",
    "Image Generation",
    "Voice Generation",
    "Video Generation",
    "Code Generation",
  ];

  const pricingOptions = [
    "Free",
    "Freemium",
    "Premium",
    "Free Trial",
    "Pay Per Use",
  ];

  const fetchTools = async () => {
    try {
      // Fetching data from the backend API
      const response = await axios.get("/api/tool");
      setTools(response.data.data);
      console.log("Fetched tools from backend:", response.data.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
      // Fallback or error handling if backend fetch fails
      // For demonstration, you might want to keep some mock data here for development
      // if your backend isn't ready. For now, it will just log the error.
    }
  };

  const filterTools = () => {
    let filtered = tools;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      filtered = filtered.filter(
        (tool) =>
          regex.test(tool.title) ||
          (tool.hashtags && tool.hashtags.some((tag) => regex.test(tag))) || // Check if hashtags exist
          (tool.keyWords &&
            tool.keyWords.some((keyword) => regex.test(keyword))) // Check if keyWords exist
      );
    }

    if (categoryFilters.length > 0) {
      filtered = filtered.filter((tool) =>
        categoryFilters.some(
          (category) =>
            (tool.keyWords && tool.keyWords.includes(category)) ||
            (tool.hashtags && tool.hashtags.includes(category))
        )
      );
    }

    if (pricingFilters.length > 0) {
      filtered = filtered.filter((tool) =>
        pricingFilters.includes(tool.pricing)
      );
    }

    setFilteredTools(filtered);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((item) => item !== category)
        : [...prevFilters, category]
    );
  };

  const handlePricingChange = (pricing) => {
    setPricingFilters((prevFilters) =>
      prevFilters.includes(pricing)
        ? prevFilters.filter((item) => item !== pricing)
        : [...prevFilters, pricing]
    );
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    filterTools();
    setShowFilterModal(false); // Close modal on search submit
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [searchQuery, categoryFilters, pricingFilters, tools]);

  // Define consistent colors
  const primaryPurple = "#6c63ff";
  const lightPurple = "#f0f0ff";
  const darkText = "#333";
  const mutedText = "#666";
  const lightGreyBorder = "#e0e0e0";

  return (
    <Container style={{ marginTop: "5rem", padding: "2rem 0" }}>
      {/* Main Header Section */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#333", // Darker color for the main title
            marginBottom: "0.5rem",
          }}
        >
          Explore AI Tools
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#666", // Muted color for the subtitle
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Discover the perfect AI tools for your specific needs
        </p>
      </div>

      {/* Mobile Search Bar and Filter Button */}
      <div className="d-lg-none mb-4 px-3">
        {" "}
        {/* visible on small screens, hidden on large */}
        <Form
          onSubmit={handleSearchSubmit}
          className="d-flex align-items-center justify-content-between"
          style={{
            border: `1px solid ${lightGreyBorder}`,
            borderRadius: "50px", // More rounded for mobile search
            padding: "0.5rem 1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            backgroundColor: "#fff",
          }}
        >
          <FormControl
            type="text"
            placeholder="Search for AI tools..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: "none",
              boxShadow: "none",
              padding: "0", // No padding inside input
              fontSize: "0.95rem",
              flexGrow: 1,
              marginRight: "0.5rem", // Space before filter button
            }}
          />
          <Button
            variant="link"
            onClick={() => setShowFilterModal(true)} // Open modal on click
            style={{
              color: primaryPurple,
              padding: "0.25rem 0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <SlidersHorizontal size={20} /> Filters
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: primaryPurple,
              backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
              borderColor: primaryPurple,
              borderRadius: "50px", // Rounded search button
              padding: "0.5rem 1rem",
              fontSize: "0.95rem",
              color: "white",
              fontWeight: "600",
              marginLeft: "0.5rem",
            }}
          >
            Search
          </Button>
        </Form>
      </div>

      <Row>
        {/* Filter/Sidebar Column - Hidden on small screens */}
        <Col lg={3} className="d-none d-lg-block mb-4">
          {" "}
          {/* hidden on small screens, visible on large */}
          <Card
            className="shadow-sm border-0 rounded-4"
            style={{ padding: "1.5rem" }}
          >
            <Card.Body style={{ padding: "0" }}>
              {/* Search Bar (Desktop) */}
              <Form onSubmit={handleSearchSubmit} className="mb-4">
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: `1px solid ${lightGreyBorder}`,
                    borderRadius: "8px",
                    padding: "0.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <FormControl
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                      border: "none",
                      boxShadow: "none",
                      padding: "0.5rem",
                      fontSize: "0.95rem",
                    }}
                    className="flex-grow-1"
                  />
                  <Button
                    variant="link"
                    type="submit" // Set type to submit for form submission
                    style={{ color: mutedText, padding: "0.5rem" }}
                  >
                    <Search size={20} />
                  </Button>
                </div>
              </Form>

              {/* Categories Filter */}
              <div className="mb-4">
                <h5
                  style={{
                    color: darkText,
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Categories
                </h5>
                <ListGroup variant="flush">
                  {categories.map((category) => (
                    <ListGroup.Item
                      key={category}
                      action
                      onClick={() => handleCategoryChange(category)}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: `1px solid ${lightGreyBorder}`,
                        cursor: "pointer",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`category-${category}`}
                        label={category}
                        checked={categoryFilters.includes(category)}
                        onChange={() => handleCategoryChange(category)} // Ensure change handler works
                        style={{ fontSize: "0.95rem", color: mutedText }}
                      />
                      <span
                        style={{
                          backgroundColor: lightPurple,
                          color: primaryPurple,
                          borderRadius: "4px",
                          padding: "0.2em 0.6em",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {
                          tools.filter(
                            (tool) =>
                              (tool.keyWords &&
                                tool.keyWords.includes(category)) ||
                              (tool.hashtags &&
                                tool.hashtags.includes(category))
                          ).length
                        }
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              {/* Pricing Filter */}
              <div>
                <h5
                  style={{
                    color: darkText,
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Pricing
                </h5>
                <ListGroup variant="flush">
                  {pricingOptions.map((option) => (
                    <ListGroup.Item
                      key={option}
                      action
                      onClick={() => handlePricingChange(option)}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        padding: "0.75rem 0",
                        borderBottom: `1px solid ${lightGreyBorder}`,
                        cursor: "pointer",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`pricing-${option}`}
                        label={option}
                        checked={pricingFilters.includes(option)}
                        onChange={() => handlePricingChange(option)} // Ensure change handler works
                        style={{ fontSize: "0.95rem", color: mutedText }}
                      />
                      <span
                        style={{
                          backgroundColor: lightPurple,
                          color: primaryPurple,
                          borderRadius: "4px",
                          padding: "0.2em 0.6em",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {tools.filter((tool) => tool.pricing === option).length}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Tool List Column */}
        <Col lg={9}>
          <ToolList tools={filteredTools} />
          {filteredTools.length === 0 && (
            <div className="text-center mt-5" style={{ color: mutedText }}>
              <h4>No tools found matching your criteria.</h4>
              <p>Try adjusting your search query or filters.</p>
            </div>
          )}
        </Col>
      </Row>

      {/* Filter Modal for Small Screens */}
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Tools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Categories Filter in Modal */}
          <div className="mb-4">
            <h5
              style={{
                color: darkText,
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Categories
            </h5>
            <ListGroup variant="flush">
              {categories.map((category) => (
                <ListGroup.Item
                  key={category}
                  action
                  onClick={() => handleCategoryChange(category)}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    padding: "0.75rem 0",
                    borderBottom: `1px solid ${lightGreyBorder}`,
                    cursor: "pointer",
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`modal-category-${category}`}
                    label={category}
                    checked={categoryFilters.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    style={{ fontSize: "0.95rem", color: mutedText }}
                  />
                  <span
                    style={{
                      backgroundColor: lightPurple,
                      color: primaryPurple,
                      borderRadius: "4px",
                      padding: "0.2em 0.6em",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {
                      tools.filter(
                        (tool) =>
                          (tool.keyWords && tool.keyWords.includes(category)) ||
                          (tool.hashtags && tool.hashtags.includes(category))
                      ).length
                    }
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          {/* Pricing Filter in Modal */}
          <div>
            <h5
              style={{
                color: darkText,
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Pricing
            </h5>
            <ListGroup variant="flush">
              {pricingOptions.map((option) => (
                <ListGroup.Item
                  key={option}
                  action
                  onClick={() => handlePricingChange(option)}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    padding: "0.75rem 0",
                    borderBottom: `1px solid ${lightGreyBorder}`,
                    cursor: "pointer",
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`modal-pricing-${option}`}
                    label={option}
                    checked={pricingFilters.includes(option)}
                    onChange={() => handlePricingChange(option)}
                    style={{ fontSize: "0.95rem", color: mutedText }}
                  />
                  <span
                    style={{
                      backgroundColor: lightPurple,
                      color: primaryPurple,
                      borderRadius: "4px",
                      padding: "0.2em 0.6em",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {tools.filter((tool) => tool.pricing === option).length}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              filterTools();
              setShowFilterModal(false);
            }}
            style={{
              backgroundColor: primaryPurple,
              backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
              borderColor: primaryPurple,
              color: "white",
            }}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
