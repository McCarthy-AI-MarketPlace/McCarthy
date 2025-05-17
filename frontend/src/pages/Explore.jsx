import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import FiltersSidebar from "../components/FiltersSidebar";
import RecommendedSection from "./RecommendedSection";

export default function Explore() {
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    // Add logic to filter tools here
  };

  return (
    <Container fluid style={{ marginTop: "80px", padding: "2rem" }}>
      <div style={{ marginLeft: "40px", marginBottom: "2rem" }}>
        <h2 className="fw-bold text-black mb-1">Explore AI Tools</h2>
        <p className="text-muted">Discover the perfect AI tools for your specific needs</p>
        <SearchBar />
        <div className="mt-3">
          <CategoryFilter onCategorySelect={handleCategorySelect} />
        </div>
      </div>

      <Row>
        <Col xs={12} md={4} lg={3}>
          <FiltersSidebar />
        </Col>

        <Col xs={12} md={8} lg={9}>
          <RecommendedSection/>
          
        </Col>
      </Row>
    </Container>
  );
}
