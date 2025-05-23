import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditTool = () => {
  const [toolData, setToolData] = useState({
    title: "",
    description: "",
    image: "",
    public_id: "",
    toolUrl: "",
    hashtags: "",
    keyWords: "",
    pricing: "",
    isFeatured: false,
    isEditorsChoice: false,
  });

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fileInputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`/api/tool/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tool = res.data.data;

        setToolData({
          ...tool,
          hashtags: tool.hashtags.join(", "),
          keyWords: tool.keyWords ? tool.keyWords.join(", ") : "",
          public_id: tool.imagePublicId || "",
        });
      } catch (err) {
        setFetchError("Failed to load tool data. Please try again.");
      }
    };
    fetchTool();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("oldPublicId", toolData.public_id);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setToolData((prev) => ({
        ...prev,
        image: data.data.url,
        public_id: data.data.public_id,
        toolUrl: data.data.url,
      }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setToolData({
      ...toolData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUploading) {
      alert("Please wait for image to finish uploading.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const updatedData = {
        ...toolData,
        hashtags: toolData.hashtags.split(",").map((tag) => tag.trim()),
        keyWords: toolData.keyWords.split(",").map((kw) => kw.trim()),
      };

      await axios.put(`/api/tool/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/my-tools");
    } catch (err) {
      alert("Failed to update tool. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        marginTop: "3rem",
        backgroundColor: "#f5f7fa",
      }}
    >
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
            textAlign: "center",
            color: "#343a40",
          }}
        >
          Edit Tool
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#6c757d",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          Update your AI tool information.
        </p>

        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            border: "none",
          }}
        >
          <Card.Body style={{ padding: "2rem" }}>
            {fetchError && <Alert variant="danger">{fetchError}</Alert>}
            {uploadError && <Alert variant="danger">{uploadError}</Alert>}

            <Form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "160px",
                      width: "160px",
                      border: "2px dashed #ced4da",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "1rem",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    {toolData.image ? (
                      <img
                        src={toolData.image}
                        alt="Tool"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <p style={{ color: "#adb5bd" }}>Upload Tool Image</p>
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
                  {imageUploading && <Spinner animation="border" size="sm" />}
                </div>

                {[
                  { label: "Tool Name *", name: "title", type: "text" },
                  { label: "Tool URL *", name: "toolUrl", type: "url" },
                  { label: "Pricing *", name: "pricing", type: "select" },
                  {
                    label: "Description *",
                    name: "description",
                    type: "textarea",
                  },
                  {
                    label: "Hashtags (comma separated)",
                    name: "hashtags",
                    type: "text",
                  },
                  {
                    label: "Keywords (comma separated)",
                    name: "keyWords",
                    type: "text",
                  },
                ].map((field) => (
                  <Form.Group key={field.name}>
                    <Form.Label style={{ fontWeight: "500", color: "#495057" }}>
                      {field.label}
                    </Form.Label>
                    {field.type === "textarea" ? (
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name={field.name}
                        value={toolData[field.name]}
                        onChange={handleChange}
                        required
                      />
                    ) : field.type === "select" ? (
                      <Form.Select
                        name={field.name}
                        value={toolData[field.name]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Pricing</option>
                        <option value="Free">Free</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Premium">Premium</option>
                        <option value="Free Trial">Free Trial</option>
                        <option value="Pay Per Use">Pay Per Use</option>
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        value={toolData[field.name]}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </Form.Group>
                ))}

                {currentUser?.data?.isSuperAdmin && (
                  <>
                    <Form.Check
                      type="checkbox"
                      label="Featured Tool"
                      name="isFeatured"
                      checked={toolData.isFeatured}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Editor's Choice"
                      name="isEditorsChoice"
                      checked={toolData.isEditorsChoice}
                      onChange={handleChange}
                    />
                  </>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={imageUploading}
                  style={{
                    padding: "0.75rem",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditTool;
