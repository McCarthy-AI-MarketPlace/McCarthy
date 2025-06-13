import React, { useState } from "react";
import { ListGroup, Form, Collapse } from "react-bootstrap";

const CategoryFilter = ({ tools, categoryFilters, onCategoryChange }) => {
  const [openCategories, setOpenCategories] = useState({});

  const toggleDropdown = (parent) => {
    setOpenCategories((prev) => ({
      ...prev,
      [parent]: !prev[parent],
    }));
  };

  // Define categories and subcategories
  const categoryGroups = {
    "Text Generation": ["Blog Writing", "Story Writing", "SEO Content"],
    "Image Generation": ["AI Art", "Photo Editing", "Logo Design"],
    "Voice Generation": ["Voiceover", "Text-to-Speech", "Speech Editing"],
    "Video Generation": ["Video Editing", "AI Animation", "Text-to-Video"],
    "Code Generation": ["Code Completion", "Bug Fixing", "Code Explanation"],
  };

  const primaryPurple = "#6c63ff";
  const lightPurple = "#f5f1ff";
  const lightGreyBorder = "#e0e0e0";
  const mutedText = "#666";

  return (
    <div className="mb-4">
      <h5
        style={{
          color: "#333",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Categories
      </h5>

      <ListGroup variant="flush">
        {Object.entries(categoryGroups).map(([parent, children]) => (
          <div key={parent}>
            <ListGroup.Item
              onClick={() => toggleDropdown(parent)}
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: "0.75rem 0",
                cursor: "pointer",
                borderBottom: `1px solid ${lightGreyBorder}`,
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                {parent}
              </span>
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
                        tool.keyWords.some((kw) =>
                          [parent, ...children].includes(kw)
                        )) ||
                      (tool.hashtags &&
                        tool.hashtags.some((tag) =>
                          [parent, ...children].includes(tag)
                        ))
                  ).length
                }
              </span>
            </ListGroup.Item>

            <Collapse in={openCategories[parent]}>
              <div>
                {children.map((child) => (
                  <ListGroup.Item
                    key={child}
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      padding: "0.6rem 0.75rem 0.6rem 1.5rem",
                      borderBottom: `1px solid ${lightGreyBorder}`,
                    }}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`category-${child}`}
                      label={child}
                      checked={categoryFilters.includes(child)}
                      onChange={() => onCategoryChange(child)}
                      style={{ fontSize: "0.9rem", color: mutedText }}
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
                              tool.keyWords.includes(child)) ||
                            (tool.hashtags &&
                              tool.hashtags.includes(child))
                        ).length
                      }
                    </span>
                  </ListGroup.Item>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoryFilter;
