import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const PublishTool = () => {
  const [toolData, setToolData] = useState({
    image: "",
    title: "",
    toolUrl: "",
    pricing: "",
    keyWords: "",
    description: "",
    hashtags: "",
    isFeatured: false,
    isEditorsChoice: false,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setToolData({
      ...toolData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setUploadError(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setToolData((prev) => ({ ...prev, image: data.data.url }));
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!toolData.image) {
      alert("Please upload an image first");
      return;
    }

    const hashtagsArray = toolData.hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const keyWordsArray = toolData.keyWords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);

    const updatedToolData = {
      ...toolData,
      hashtags: hashtagsArray,
      keyWords: keyWordsArray,
    };

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post("/api/tool", updatedToolData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Tool published successfully");
    } catch (error) {
      alert("Error publishing tool: " + error.response?.data?.message);
    }
  };

  return (
    <Container style={{ marginTop: "5rem" }}>
      <h2 className="text-center mb-4">Publish a New Tool</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {uploading && (
                <Spinner animation="border" size="sm" className="mt-2" />
              )}
              {uploadError && (
                <Alert variant="danger" className="mt-2">
                  {uploadError}
                </Alert>
              )}
              {toolData.image && (
                <img
                  src={toolData.image}
                  alt="preview"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={toolData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tool URL</Form.Label>
              <Form.Control
                type="url"
                name="toolUrl"
                value={toolData.toolUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pricing</Form.Label>
              <Form.Select
                name="pricing"
                value={toolData.pricing}
                onChange={handleChange}
                required
              >
                <option value="">Select pricing</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="premium">Premium</option>
                <option value="one-time">One-time Purchase</option>
                <option value="subscription">Subscription</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={toolData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hashtags (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="hashtags"
                value={toolData.hashtags}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Keywords (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="keyWords"
                value={toolData.keyWords}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Featured"
              name="isFeatured"
              checked={toolData.isFeatured}
              onChange={handleChange}
              className="mb-3"
            />

            <Form.Check
              type="checkbox"
              label="Editor's Choice"
              name="isEditorsChoice"
              checked={toolData.isEditorsChoice}
              onChange={handleChange}
              className="mb-3"
            />

            <Button type="submit" className="mt-4 w-100" disabled={uploading}>
              {uploading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Publish Tool"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PublishTool;