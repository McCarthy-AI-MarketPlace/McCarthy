import React, { useState, useEffect } from "react";
import axios from "axios";
import ToolList from "../components/ToolList";
import CategoryFilter from "../components/CategoryFilter";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ToolCardSkeleton from "../components/ToolCardSkeleton";

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [pricingFilters, setPricingFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const paramSearchQuery = queryParams.get("query");

  const pricingOptions = [
    "Free",
    "Freemium",
    "Premium",
    "Free Trial",
    "Pay Per Use",
  ];

  const primaryPurple = "#6c63ff";
  const lightPurple = "#f0f0ff";
  const darkText = "#333";
  const mutedText = "#666";
  const lightGreyBorder = "#e0e0e0";

  useEffect(() => {
    if (paramSearchQuery) {
      navigate("/explore");
      setSearchQuery(paramSearchQuery);
    }
  }, [paramSearchQuery]);

  const fetchTools = async () => {
    try {
      const response = await axios.get("/api/tool");
      setTools(response.data.data);
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTools = () => {
    let filtered = tools;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.title.toLowerCase().includes(q) ||
          (tool.hashtags &&
            tool.hashtags.some((tag) => tag.toLowerCase().includes(q))) ||
          (tool.keyWords &&
            tool.keyWords.some((kw) => kw.toLowerCase().includes(q)))
      );
    }

    if (categoryFilters.length > 0) {
      const lower = categoryFilters.map((c) => c.toLowerCase());
      filtered = filtered.filter((tool) =>
        lower.some(
          (cat) =>
            (tool.keyWords &&
              tool.keyWords.some((kw) => kw.toLowerCase() === cat)) ||
            (tool.hashtags &&
              tool.hashtags.some((tag) => tag.toLowerCase() === cat))
        )
      );
    }

    if (pricingFilters.length > 0) {
      const lowerPricing = pricingFilters.map((p) => p.toLowerCase());
      filtered = filtered.filter(
        (tool) =>
          tool.pricing && lowerPricing.includes(tool.pricing.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePricingChange = (pricing) => {
    setPricingFilters((prev) =>
      prev.includes(pricing)
        ? prev.filter((p) => p !== pricing)
        : [...prev, pricing]
    );
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterTools();
    setShowFilterModal(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [searchQuery, categoryFilters, pricingFilters, tools]);

  return (
    <Container style={{ marginTop: "5rem", padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: darkText }}>
          Explore AI Tools
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: mutedText,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Discover the perfect AI tools for your specific needs
        </p>
      </div>

      {/* Mobile Search */}
      <div className="d-lg-none mb-4 px-3">
        <Form
          onSubmit={handleSearchSubmit}
          className="d-flex align-items-center justify-content-between"
          style={{
            border: `1px solid ${lightGreyBorder}`,
            borderRadius: "50px",
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
              padding: "0",
              fontSize: "0.95rem",
              flexGrow: 1,
              marginRight: "0.5rem",
            }}
          />
          <Button
            variant="link"
            onClick={() => setShowFilterModal(true)}
            style={{ color: primaryPurple, padding: "0.25rem 0.5rem" }}
          >
            <SlidersHorizontal size={20} /> Filters
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: primaryPurple,
              borderRadius: "50px",
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

      {/* Desktop Layout */}
      <Row>
        <Col lg={3} className="d-none d-lg-block mb-4">
          <Card
            className="shadow-sm border-0 rounded-4"
            style={{ padding: "1.5rem" }}
          >
            <Card.Body style={{ padding: "0" }}>
              <Form onSubmit={handleSearchSubmit} className="mb-4">
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: `1px solid ${lightGreyBorder}`,
                    borderRadius: "8px",
                    padding: "0.5rem",
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
                    type="submit"
                    style={{ color: mutedText }}
                  >
                    <Search size={20} />
                  </Button>
                </div>
              </Form>

              <CategoryFilter
                tools={tools}
                categoryFilters={categoryFilters}
                onCategoryChange={handleCategoryChange}
              />

              {/* Pricing Filters */}
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
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          {loading ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {[...Array(6)].map((_, idx) => (
                <Col key={idx}>
                  <ToolCardSkeleton />
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <ToolList
                tools={filteredTools}
                userToken={localStorage.getItem("accessToken")}
              />
              {filteredTools.length === 0 && (
                <div className="text-center mt-5" style={{ color: mutedText }}>
                  <h4>No tools found matching your criteria.</h4>
                  <p>Try adjusting your search query or filters.</p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* Mobile Filter Modal */}
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Tools</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryFilter
            tools={tools}
            categoryFilters={categoryFilters}
            onCategoryChange={handleCategoryChange}
          />
          <hr />
          <h5>Pricing</h5>
          {pricingOptions.map((option) => (
            <Form.Check
              type="checkbox"
              key={option}
              id={`modal-pricing-${option}`}
              label={option}
              checked={pricingFilters.includes(option)}
              onChange={() => handlePricingChange(option)}
              style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}
            />
          ))}
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