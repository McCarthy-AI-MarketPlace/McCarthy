import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Stack,
  Badge,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";

const categories = [
  "Text Generation",
  "Image Generation",
  "Voice Generation",
  "Video Generation",
  "Code Generation",
];

const pricingOptions = ["Free", "Freemium", "Paid", "Subscription"];

const popularTags = [
  "Chatbot",
  "Writing",
  "Content Creation",
  "Image Generation",
  "Art",
  "Design",
  "Code",
  "Development",
  "Productivity",
];

export default function FiltersSidebar({
  onReset,
  isSidebarVisible,
  onToggleSidebar,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedPricing("");
    setRating(0);
    setSelectedTags([]);
    if (onReset) onReset();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Filters</h5>
        <Button
          onClick={onToggleSidebar}
          size="sm"
          className="rounded-pill px-4 py-2 fw-medium"
          style={{
            background: "linear-gradient(to right, #0d6efd, #3b8bff)",
            color: "#fff",
            border: "1px solid #0d6efd",
            boxShadow: "0 4px 10px rgba(13, 110, 253, 0.2)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to right, #0b5ed7, #2c75f3)";
            e.currentTarget.style.boxShadow =
              "0 6px 14px rgba(13, 110, 253, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(to right, #0d6efd, #3b8bff)";
            e.currentTarget.style.boxShadow =
              "0 4px 10px rgba(13, 110, 253, 0.2)";
          }}
        >
          {isSidebarVisible ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <Collapse in={isSidebarVisible}>
        <div>
          <Card
            className="p-4 rounded-4 border-light"
            style={{
              backgroundColor: "#f8f9fa",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Category Filter */}
            <div className="mb-4">
              <h6 className="fw-bold text-black">Category</h6>
              <Form>
                <Stack gap={1}>
                  {categories.map((cat) => (
                    <Form.Check
                      type="radio"
                      key={cat}
                      id={`cat-${cat}`}
                      name="category"
                      label={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-muted"
                    />
                  ))}
                </Stack>
              </Form>
            </div>

            <hr className="my-4" />

            {/* Pricing Filter */}
            <div className="mb-4">
              <h6 className="fw-semibold text-black">Pricing</h6>
              <Form>
                <Stack gap={1}>
                  {pricingOptions.map((option) => (
                    <Form.Check
                      type="radio"
                      key={option}
                      id={`price-${option}`}
                      name="pricing"
                      label={option}
                      checked={selectedPricing === option}
                      onChange={() => setSelectedPricing(option)}
                      className="text-muted"
                    />
                  ))}
                </Stack>
              </Form>
            </div>

            <hr className="my-4" />

            {/* Rating Slider */}
            <div className="mb-4">
              <h6 className="fw-semibold text-black">Minimum Rating</h6>
              <Form.Range
                min={0}
                max={5}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
              <div className="text-muted small">
                {Math.round(rating * 2) / 2} / 5
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h6 className="fw-semibold text-black">Popular Tags</h6>
              <Row className="g-2 mt-2">
                {popularTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Col xs="auto" key={tag}>
                      <Badge
                        pill
                        bg={isSelected ? "primary" : "light"}
                        text={isSelected ? "light" : "dark"}
                        className={`border shadow-sm px-3 py-2 small ${
                          isSelected ? "" : "bg-light"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* Reset Button */}
            <div className="mt-4 text-end">
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-pill px-4"
                onClick={handleReset}
              >
                Reset Filters
              </Button>
            </div>
          </Card>
        </div>
      </Collapse>
    </>
  );
}
