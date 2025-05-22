import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Card, // Import Card for the new design
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
      // Replaced alert with a more integrated error message
      setUploadError("Please upload an image first.");
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
      // Ensure axios is imported and configured correctly
      const token = localStorage.getItem("accessToken");
      await axios.post("/api/tool", updatedToolData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Replaced alert with a success message
      setToolData({
        // Reset form after successful submission
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
      setUploadError(null); // Clear any previous upload errors
      alert("Tool published successfully"); // Keeping original alert for success as per your code
    } catch (error) {
      // Replaced alert with a more integrated error message
      setUploadError(
        "Error publishing tool: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        marginTop:"3rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* <Navbar /> */}

      <Container
        style={{
          flex: 1,
          padding: "2.5rem 1rem",
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            color: "#343a40",
            textAlign: "center",
          }}
        >
          Publish a New AI Tool
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          Submit your AI tool to McCarthy and share it with thousands of users.
        </p>

        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            border: "none",
          }}
        >
          <Card.Header
            as="h4"
            style={{
              fontWeight: "600",
              padding: "1.5rem",
              borderBottom: "1px solid #e9ecef",
              backgroundColor: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              color: "#495057",
            }}
          >
            Tool Information
          </Card.Header>
          <Card.Body style={{ padding: "2rem" }}>
            <Form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                }}
              >
                {" "}
                {/* Mimic grid and gap */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      height: "160px", // h-40
                      width: "160px", // w-40
                      border: "2px dashed #ced4da", // border-2 border-dashed border-border
                      borderRadius: "8px", // rounded-lg
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "1rem",
                      backgroundColor: "#f8f9fa", // bg-background
                    }}
                  >
                    {toolData.image ? (
                      <img
                        src={toolData.image}
                        alt="Tool preview"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div style={{ textAlign: "center", padding: "1rem" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            margin: "auto",
                            height: "48px",
                            width: "48px",
                            color: "#adb5bd",
                          }}
                        >
                          {" "}
                          {/* mx-auto h-12 w-12 text-muted-foreground */}
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          <path d="M12 18v-6" />
                          <path d="M9 15h6" />
                        </svg>
                        <p
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            color: "#6c757d",
                          }}
                        >
                          {" "}
                          {/* mt-2 text-sm text-muted-foreground */}
                          Drag and drop or click to upload
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                      }}
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                    Upload your tool's logo (recommended: 512x512px)
                  </p>
                  {uploading && (
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  {uploadError && (
                    <Alert
                      variant="danger"
                      style={{ marginTop: "0.5rem", borderRadius: "5px" }}
                    >
                      {uploadError}
                    </Alert>
                  )}
                </div>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="title"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Tool Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    value={toolData.title}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  />
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="toolUrl"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Tool URL *
                  </Form.Label>
                  <Form.Control
                    type="url"
                    id="toolUrl"
                    name="toolUrl"
                    placeholder="https://"
                    value={toolData.toolUrl}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  />
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="pricing"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Pricing *
                  </Form.Label>
                  <Form.Select
                    id="pricing"
                    name="pricing"
                    value={toolData.pricing}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <option value="">Select pricing</option>
                    <option value="free">Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="premium">Premium</option>
                    <option value="one-time">One-time Purchase</option>
                    <option value="subscription">Subscription</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="description"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Description *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Write a detailed description of your AI tool..."
                    value={toolData.description}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  />
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="hashtags"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Hashtags (comma separated)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="hashtags"
                    name="hashtags"
                    placeholder="#AITools, #MachineLearning, #ComputerVision"
                    value={toolData.hashtags}
                    onChange={handleChange}
                    required // Keeping required as per original code
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6c757d",
                      marginTop: "0.25rem",
                    }}
                  >
                    Separate hashtags with commas
                  </p>
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                  <Form.Label
                    htmlFor="keyWords"
                    style={{
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#495057",
                    }}
                  >
                    Keywords (comma separated)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="keyWords"
                    name="keyWords"
                    placeholder="AI, Machine Learning, Text Generation"
                    value={toolData.keyWords}
                    onChange={handleChange}
                    required // Keeping required as per original code
                    style={{
                      borderRadius: "5px",
                      borderColor: "#ced4da",
                      padding: "0.75rem 1rem",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6c757d",
                      marginTop: "0.25rem",
                    }}
                  >
                    Separate keywords with commas
                  </p>
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Form.Label
                        htmlFor="isFeatured"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.25rem",
                          color: "#495057",
                        }}
                      >
                        Featured Tool
                      </Form.Label>
                      <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                        Request to be featured on our homepage
                      </p>
                    </div>
                    <Form.Check
                      type="switch"
                      id="isFeatured"
                      name="isFeatured"
                      checked={toolData.isFeatured}
                      onChange={handleChange}
                      style={{ transform: "scale(1.2)" }} // Slightly larger switch
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Form.Label
                        htmlFor="isEditorsChoice"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.25rem",
                          color: "#495057",
                        }}
                      >
                        Editor's Choice
                      </Form.Label>
                      <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                        Request to be considered for Editor's Choice
                      </p>
                    </div>
                    <Form.Check
                      type="switch"
                      id="isEditorsChoice"
                      name="isEditorsChoice"
                      checked={toolData.isEditorsChoice}
                      onChange={handleChange}
                      style={{ transform: "scale(1.2)" }} // Slightly larger switch
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={uploading}
                  style={{
                    borderRadius: "5px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {uploading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ marginRight: "0.5rem" }}
                    />
                  ) : (
                    "Publish Tool"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* <Footer /> */}
    </div>
  );
};

export default PublishTool;
