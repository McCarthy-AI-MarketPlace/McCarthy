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

  const categoryGroups = {
    "Text": [
      "Text Generation", "Copy Writing", "Paraphrasing", "Summarization", "Email Writing",
      "Grammar Checking", "Story Writing", "Prompt Generation", "Translation"
    ],
    "Image": [
      "Text - Image", "Image Editing", "Image Upscaling", "Backend Removal", "Photo Restoration"
    ],
    "Video": [
      "Text - Video", "Video editing", "Caption Subtitles", "Face Swap/Deep Fake", "Lip sink",
      "Ai Dubbing", "Short Content Generation(Instagram/yt/tik tok)"
    ],
    "Audio": [
      "Text - Speech", "Voice cloning", "Speech - text", "Noise removal", "Music generation", "Voice generation"
    ],
     "AI agents & Automation": [
      "Workflow automation", "Custom agent builders",
      "AI Customer support (Chatbots, callbots)", "AI sales agents"
    ],
    "Analytics": [
      "Data visualization", "Dashboard generation", "Predictive analytics",
      "Business intelligence", "Text analytics", "Sentiment analysis"
    ],
    "Business": [
      "Proposal writing", "Business plan generation", "Pitch deck generation"
    ],
    "Code": [
      "Code generation", "Code Testing", "Bug Fixing", "API Generators"
    ],
    "Content Creation": ["Copy Writing", "Script & Story generation", "SEO & Keyword Research"],
    "Design": [
      "UI/UX design", "Logo/Icon generators", "Infographic tools"
    ],
    "Education": ["AI tutors"],
    "Finance": [
      "Invoice generators", "Budget planners", "Expense trackers",
      "Financial report drafting", "Tax document analyzers", "Cash flow forecasting"
    ],
    "HR": ["Resume screeners", "Onboarding assistants"],
    "Legal": ["Contract analysis", "Legal document drafting"],
    "Logo Design": [],
    "Marketing": [
      "Ad copy generation", "Social media captions", "Hashtag generators",
      "SEO/SEM optimization", "Email campaign tools", "Influencer outreach tools"
    ],
    
    "No Code Tools": [
      "Website generator", "App Testing", "Software Generator"
    ],
    
    "Productivity": [
      "Task automation", "Meeting summaries", "Calendar assistants", "Daily planners", "Email drafting"
    ],
    
    "Research & Chatbots": [
      "PDF summarization", "Data extraction", "Fact checking", "Research assistance",
      "Academic writing", "Citation generation", "Question answering"
    ],
   
    
    "Real Estate": [
      "Interior design generators", "3D Modelling & Rendering", "Listing optimization"
    ],

    "3D Modeling & Visual": []
    
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
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: "0.75rem 0",
                borderBottom: `1px solid ${lightGreyBorder}`,
              }}
            >
              {/* Parent Checkbox and Label */}
              <Form.Check
                type="checkbox"
                id={`category-${parent}`}
                label={parent}
                checked={categoryFilters.includes(parent)}
                onChange={() => onCategoryChange(parent)}
                style={{ fontWeight: "bold", fontSize: "0.95rem" }}
              />

              {/* Count + Toggle dropdown */}
              <div className="d-flex align-items-center" style={{ gap: "10px" }}>
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
                <span
                  style={{ cursor: "pointer", color: mutedText, fontSize: "1.25rem" }}
                  onClick={() => toggleDropdown(parent)}
                >
                  {openCategories[parent] ? "−" : "+"}
                </span>
              </div>
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
