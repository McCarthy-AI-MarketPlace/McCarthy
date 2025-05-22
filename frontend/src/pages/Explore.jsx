import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CategoryFilter from "../components/CategoryFilter";
import FiltersSidebar from "../components/FiltersSidebar";
import ExploreToolsSection from "../components/ExploreToolsSection"; // ✅ import new component

export default function Explore() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container fluid style={{ marginTop: "80px", padding: "2rem" }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold text-black mb-3">
          Discover the Best AI Tools for Your Needs
        </h1>
        <p className="text-muted fs-5">
          Explore our curated collection of powerful AI tools to enhance your
          workflow and boost productivity
        </p>

        {/* Search bar */}
        <div className="d-flex justify-content-center mt-4">
          <InputGroup
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "50px",
              overflow: "hidden",
              border: "2px solid transparent",
              backgroundColor: "#fff",
              transition: "all 0.3s ease",
            }}
            className="shadow-sm"
          >
            <Form.Control
              type="text"
              placeholder="Search AI tools by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                backgroundColor: "white",
                padding: "12px 20px",
                fontSize: "16px",
                outline: "none",
                boxShadow: "none",
              }}
            />
            <InputGroup.Text
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                paddingRight: "16px",
                fontSize: "1.2rem",
                color: "#555",
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>

      {/* Category filter centered */}
      <div className="d-flex justify-content-center mb-4 w-100 overflow-auto">
        <div style={{ minWidth: "fit-content" }}>
          <CategoryFilter
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {/* Show Filters button on left when hidden */}
      {!isSidebarVisible && (
        <div className="mb-3">
          <Button
            onClick={handleToggleSidebar}
            className="rounded-pill px-4 py-2"
            style={{
              marginLeft: "1rem",
              backgroundColor: "white",
              color: "black",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            Show Filters
          </Button>
        </div>
      )}

      {/* Filters and Content */}
      <Row>
        {isSidebarVisible && (
          <Col xs={12} md={4} lg={3}>
            <FiltersSidebar
              isSidebarVisible={isSidebarVisible}
              onToggleSidebar={handleToggleSidebar}
              selectedPricing={selectedPricing}
              setSelectedPricing={setSelectedPricing}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </Col>
        )}

        <Col xs={12} md={isSidebarVisible ? 8 : 12} lg={isSidebarVisible ? 9 : 12}>
          <ExploreToolsSection
            selectedCategory={selectedCategory}
            selectedPricing={selectedPricing}
            selectedRating={selectedRating}
            selectedTags={selectedTags}
            searchQuery={searchQuery}
          />
        </Col>
      </Row>
    </Container>
  );
}
