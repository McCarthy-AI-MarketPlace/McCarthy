import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaStar, FaHeart, FaPlus } from 'react-icons/fa';
import { tools as toolsData } from '../data/Tools';

// Helper to convert category ID to human-readable text
const formatCategoryName = (id) => {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ExploreToolsSection({ selectedCategory, selectedPricing, selectedRating, selectedTags }) {
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    let updatedTools = [...toolsData];

    // Filter by category (tool.category is an array of IDs)
    if (selectedCategory && selectedCategory !== 'All') {
      const key = selectedCategory.toLowerCase().replace(/ /g, '-');
      updatedTools = updatedTools.filter((tool) => tool.category.includes(key));
    }

    // Filter by pricing
    if (selectedPricing) {
      updatedTools = updatedTools.filter((tool) => tool.pricing === selectedPricing);
    }

    // Filter by rating
    if (selectedRating > 0) {
      updatedTools = updatedTools.filter((tool) => tool.rating >= selectedRating);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      updatedTools = updatedTools.filter((tool) =>
        selectedTags.every((tag) => tool.tags?.includes(tag))
      );
    }

    setFilteredTools(updatedTools);
  }, [selectedCategory, selectedPricing, selectedRating, selectedTags]);

  return (
    <Row className="g-4 py-4">
      {filteredTools.map((tool) => (
        <Col key={tool.id} xs={12} sm={6} md={4} lg={4}>
          <Card
            className="h-100 shadow-sm rounded-4"
            style={{ transition: 'transform 0.2s, boxShadow 0.2s', border: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <Card.Img
              variant="top"
              src={tool.imageUrl}
              alt={tool.name}
              style={{ height: '180px', objectFit: 'contain', padding: '1rem' }}
            />

            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem' }}>
                  {tool.name}
                </h5>
                {tool.featured && (
                  <Badge bg="warning" text="dark" className="rounded-pill px-2">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="d-flex align-items-center mb-2" style={{ fontSize: '0.9rem' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} style={{ color: '#f8d64e', marginRight: '2px' }} />
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
                      style={{ fontSize: '0.75rem' }}
                    >
                      {formatCategoryName(cat)}
                    </Badge>
                  ))}
                </div>
              )}

              <Card.Text className="text-muted" style={{ minHeight: '60px', fontSize: '0.9rem' }}>
                {tool.description}
              </Card.Text>

              <div className="mb-3 d-flex flex-wrap gap-2">
                {tool.tags?.slice(0, 3).map((tag, idx) => (
                  <Badge
                    key={idx}
                    bg="light"
                    text="dark"
                    className="px-3 py-2 rounded-pill"
                    style={{ fontSize: '0.75rem' }}
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
                style={{ backgroundColor: '#8c5dc7', border: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7b47ab';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8c5dc7';
                }}
              >
                Use Now
              </Button>

              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  className="rounded-circle p-2 shadow-sm"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <FaHeart style={{ color: '#555' }} />
                </Button>
                <Button
                  variant="light"
                  className="rounded-circle p-2 shadow-sm"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <FaPlus style={{ color: '#555' }} />
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
