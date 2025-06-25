import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
  Badge,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const PublishTool = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [logoUrl, setLogoUrl] = useState("");
  const [toolData, setToolData] = useState({
    image: "",
    title: "",
    subtitle: "",
    toolUrl: "",
    pricing: "",
    keyWords: "",
    hashtags: "",
    description: "",
    overview: "",
    features: "",
    useCases: "",
    isFeatured: false,
    isEditorsChoice: false,
    apiKey: "",
    modelEndpoint: "",
    model: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   let objectURL;

  //   const fetchLogo = async () => {
  //     try {
  //       const res = await axios.get("/api/images/logo", {
  //         responseType: "blob",
  //       });
  //       objectURL = URL.createObjectURL(res.data);
  //       setLogoUrl(objectURL);
  //     } catch (error) {
  //       console.error("Failed to fetch logo image", error);
  //     }
  //   };

  //   fetchLogo();

  //   return () => {
  //     if (objectURL) URL.revokeObjectURL(objectURL);
  //   };
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setToolData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

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
      setUploadError("Please upload an image first.");
      return;
    }

    const hashtagsArray = toolData.hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const keyWordsArray = toolData.keyWords
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean);

    const featuresArray = toolData.features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const useCasesArray = toolData.useCases
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const updatedToolData = {
      ...toolData,
      hashtags: hashtagsArray,
      keyWords: keyWordsArray,
      features: featuresArray,
      useCases: useCasesArray,
    };

    try {
      const token = localStorage.getItem("accessToken");

      await axios.post("/api/tool", updatedToolData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert("Tool published successfully.");
      setToolData({
        image: "",
        title: "",
        subtitle: "",
        toolUrl: "",
        pricing: "",
        keyWords: "",
        hashtags: "",
        description: "",
        overview: "",
        features: "",
        useCases: "",
        isFeatured: false,
        isEditorsChoice: false,
        apiKey: "",
        modelEndpoint: "",
        model: "",
      });

      setUploadError(null);
    } catch (error) {
      setUploadError(error.response?.data?.message || "Error publishing tool");
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        {logoUrl && <Image src={logoUrl} alt="Logo" height={60} />}
        <h2 className="fw-bold mt-2">Publish a New AI Tool</h2>
        <p className="text-muted">
          Submit your AI tool to the platform and get it featured.
        </p>
      </div>

      <Card className="p-4 shadow border-0">
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div
                  className="position-relative border rounded d-flex justify-content-center align-items-center"
                  style={{ height: 200, background: "#f8f9fa" }}
                >
                  {toolData.image ? (
                    <img
                      src={toolData.image}
                      alt="Uploaded"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <p className="text-muted">Click or drag image here</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                </div>
                <small className="text-muted d-block mt-2">
                  Recommended size: 512x512px
                </small>
                {uploading && (
                  <Spinner animation="border" size="sm" className="mt-2" />
                )}
                {uploadError && (
                  <Alert variant="danger" className="mt-2">
                    {uploadError}
                  </Alert>
                )}
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Tool Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={toolData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                  type="text"
                  name="subtitle"
                  value={toolData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., AI Resume Builder"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tool URL *</Form.Label>
                <Form.Control
                  type="url"
                  name="toolUrl"
                  value={toolData.toolUrl}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pricing *</Form.Label>
                <Form.Select
                  name="pricing"
                  value={toolData.pricing}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select pricing</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Premium">Premium</option>
                  <option value="Free Trial">Free Trial</option>
                  <option value="Pay Per Use">Pay Per Use</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={toolData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Overview</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="overview"
                  value={toolData.overview}
                  onChange={handleChange}
                  placeholder="Short overview of the tool..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Features (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="features"
                  value={toolData.features}
                  onChange={handleChange}
                  placeholder="e.g., Drag-and-drop UI, Export to PDF"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Use Cases (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="useCases"
                  value={toolData.useCases}
                  onChange={handleChange}
                  placeholder="e.g., Resume creation, Job applications"
                />
              </Form.Group>

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

              <Form.Group className="mb-3">
                <Form.Label>Model Endpoint</Form.Label>
                <Form.Control
                  type="text"
                  name="modelEndpoint"
                  value={toolData.modelEndpoint}
                  onChange={handleChange}
                  placeholder="e.g., https://api.openai.com/v1/chat/completions"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model Name</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={toolData.model}
                  onChange={handleChange}
                  placeholder="e.g., gpt-4o"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>API Key</Form.Label>
                <Form.Control
                  type="text"
                  name="apiKey"
                  value={toolData.apiKey}
                  onChange={handleChange}
                  placeholder="Optional API Key (e.g., sk-...)"
                />
              </Form.Group>

              {currentUser?.data?.isSuperAdmin && (
                <>
                  <Form.Check
                    type="switch"
                    label="Featured Tool"
                    name="isFeatured"
                    checked={toolData.isFeatured}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="switch"
                    label="Editor's Choice"
                    name="isEditorsChoice"
                    checked={toolData.isEditorsChoice}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </>
              )}

              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="dark"
                  disabled={uploading}
                  className="px-4"
                >
                  {uploading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Publish Tool"
                  )}
                </Button>
              </div>
            </Form>
          </Col>

          <Col md={4} className="bg-light p-3 rounded">
            <h5 className="fw-bold mb-3">Preview</h5>
            <p>
              <strong>Pricing:</strong>{" "}
              <Badge bg="info">{toolData.pricing || "N/A"}</Badge>
            </p>
            <p>
              <strong>Subtitle:</strong> {toolData.subtitle || "--"}
            </p>
            <p>
              <strong>Overview:</strong> {toolData.overview || "--"}
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul>
              {toolData.features
                .split(",")
                .map((f, i) => f.trim() && <li key={i}>{f.trim()}</li>)}
            </ul>
            <p>
              <strong>Use Cases:</strong>
            </p>
            <ul>
              {toolData.useCases
                .split(",")
                .map((u, i) => u.trim() && <li key={i}>{u.trim()}</li>)}
            </ul>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PublishTool;
