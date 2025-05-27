import React, { useState } from "react";
import { Tabs, Tab, Form, Button, Row, Col, Container } from "react-bootstrap";

const ToolSubmissionForm = () => {
  // State for active tab
  const [key, setKey] = useState("basic");

  // State for Basic Info form fields
  const [toolName, setToolName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  // State for Basic Info form validation errors
  const [toolNameError, setToolNameError] = useState(false);
  const [shortDescriptionError, setShortDescriptionError] = useState(false);
  const [fullDescriptionError, setFullDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [tagsError, setTagsError] = useState(false);

  // Styles for the form and its elements
  const formStyle = {
    border: "1px solid #eee",
    borderRadius: "15px",
    padding: "30px",
    backgroundColor: "#ffffff",
    marginTop: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "5px",
  };

  const descriptionStyle = {
    color: "#666",
    fontSize: "14px",
    marginBottom: "20px",
  };

  const tabStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  };

  const buttonStyle = {
    backgroundColor: "#9b59b6",
    border: "none",
    borderRadius: "20px",
    padding: "10px 25px",
    fontWeight: "500",
  };

  // Function to validate Basic Info fields
  const validateBasicInfo = () => {
    let isValid = true;

    if (toolName.trim() === "") {
      setToolNameError(true);
      isValid = false;
    } else {
      setToolNameError(false);
    }

    if (shortDescription.trim() === "") {
      setShortDescriptionError(true);
      isValid = false;
    } else {
      setShortDescriptionError(false);
    }

    if (fullDescription.trim() === "") {
      setFullDescriptionError(true);
      isValid = false;
    } else {
      setFullDescriptionError(false);
    }

    if (category === "" || category === "Select category") {
      setCategoryError(true);
      isValid = false;
    } else {
      setCategoryError(false);
    }

    if (tags.trim() === "") {
      setTagsError(true);
      isValid = false;
    } else {
      setTagsError(false);
    }

    return isValid;
  };

  // Handle form submission for Basic Info tab
  const handleBasicInfoSubmit = (event) => {
    event.preventDefault();
    const isValid = validateBasicInfo();

    if (isValid) {
      console.log("Basic Info Submitted:", {
        toolName,
        shortDescription,
        fullDescription,
        category,
        tags,
      });
      // Place your API submission logic here
    } else {
      console.log("Basic Info validation failed.");
    }
  };

  // Determine if the submit button should be disabled
  const isBasicInfoFormComplete =
    toolName.trim() !== "" &&
    shortDescription.trim() !== "" &&
    fullDescription.trim() !== "" &&
    category !== "" &&
    category !== "Select category" &&
    tags.trim() !== "";

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <Container className="py-5" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Submit Your AI Tool
          </h1>
          <p className="text-gray-600">
            Fill out the form below and our team will review your submission.
          </p>
        </div>

        <div style={formStyle}>
          <div style={sectionTitleStyle}>Tool Submission Form</div>
          <div style={descriptionStyle}>
            Provide detailed information about your AI tool to help us properly
            showcase it.
          </div>

          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            style={tabStyle}
            justify
          >
            <Tab eventKey="basic" title="Basic Info">
              <Form onSubmit={handleBasicInfoSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tool Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the name of your AI tool"
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    isInvalid={toolNameError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Tool Name is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Short Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brief description (max 100 characters)"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    isInvalid={shortDescriptionError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Short Description is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Full Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Provide a detailed description of what your tool does..."
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    isInvalid={fullDescriptionError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Full Description is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Category <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        isInvalid={categoryError}
                      >
                        <option value="">Select category</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Writing">Writing</option>
                        <option value="Education">Education</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Category is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Tags (Comma Separated){" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., chatbot, writing, translation"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    isInvalid={tagsError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Tags are required.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="outline-secondary">Save Draft</Button>
                  <Button
                    style={{buttonStyle, background:"#7646C3"}}
                    type="submit"
                    disabled={!isBasicInfoFormComplete}
                  >

                    Submit for Review →
                  </Button>
                </div>
              </Form>
            </Tab>

            {/* Technical Details Tab */}
            <Tab eventKey="technical" title="Technical Details">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tool URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://yourtool.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Embed URL (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL for embedding your tool directly"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>API Documentation (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="URL to your API documentation"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Required Data Permissions</Form.Label>
                  <Row>
                    <Col xs={6} md={3}>
                      <Form.Check type="checkbox" label="User Email" />
                    </Col>
                    <Col xs={6} md={3}>
                      <Form.Check type="checkbox" label="User Name" />
                    </Col>
                    <Col xs={6} md={3}>
                      <Form.Check type="checkbox" label="User Content" />
                    </Col>
                    <Col xs={6} md={3}>
                      <Form.Check type="checkbox" label="Chat History" />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Technical Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any specific browser, device, or other technical requirements..."
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="outline-secondary">Save Draft</Button>
                  <Button style={buttonStyle}>Submit for Review →</Button>
                </div>
              </Form>
            </Tab>

            {/* Business Info Tab */}
            <Tab eventKey="business" title="Business Info">
              <Form>
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Company/Developer Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your company or individual name"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Contact Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email@example.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Pricing Model</Form.Label>
                  <Form.Select>
                    <option>Select pricing model</option>
                    <option>Free</option>
                    <option>Freemium</option>
                    <option>Subscription</option>
                    <option>One-time purchase</option>
                    <option>Contact for pricing</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Pricing Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe your pricing tiers, free trial period, etc."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Privacy Policy URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://yourtool.com/privacy"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any other information you'd like to share about your tool..."
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="outline-secondary">Save Draft</Button>
                  <Button style={buttonStyle}>Submit for Review →</Button>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default ToolSubmissionForm;



