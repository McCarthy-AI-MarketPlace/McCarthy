import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap";
import { Trash2, Edit, ExternalLink } from "lucide-react"; // Importing icons for actions

const MyTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error messages
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
  const [toolToDelete, setToolToDelete] = useState(null); // State to store the tool ID to be deleted
  const navigate = useNavigate();
  const { userId: paramUserId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // Define consistent colors
  const primaryPurple = "#6c63ff";
  const lightPurple = "#f0f0ff";
  const darkText = "#333";
  const mutedText = "#666";
  const lightGreyBorder = "#e0e0e0";
  const cardBackgroundColor = "#FFFFFF";

  // Redirect logic for non-super admins trying to view other user's tools
  useEffect(() => {
    if (
      paramUserId &&
      currentUser &&
      !currentUser.data.isSuperAdmin &&
      paramUserId !== currentUser.data._id
    ) {
      navigate("/");
    }
  }, [paramUserId, currentUser, navigate]);

  // Determine the actual userId to fetch tools for
  const userId =
    currentUser && currentUser.data
      ? paramUserId || currentUser.data._id
      : null;

  const fetchTools = async () => {
    if (!userId) {
      setLoading(false);
      setError("User ID not available. Please log in.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // In a real application, ensure your API endpoint is secured and handles authorization
      const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
      const res = await axios.get(`/api/tool/my-tools/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTools(res.data.data);
    } catch (err) {
      console.error("Error fetching tools:", err);
      setError("Failed to fetch tools. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, [userId]); // Re-fetch tools if userId changes

  // Function to handle tool deletion confirmation
  const handleDeleteClick = (toolId) => {
    setToolToDelete(toolId);
    setShowDeleteConfirm(true);
  };

  // Function to perform tool deletion
  const confirmDelete = async () => {
    setShowDeleteConfirm(false); // Close the modal immediately
    if (!toolToDelete) return;

    setError(null); // Clear previous errors
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`/api/tool/${toolToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Re-fetch the list of tools after successful deletion
      fetchTools();
    } catch (err) {
      console.error("Error deleting tool:", err);
      setError("Failed to delete tool. Please try again.");
    } finally {
      setToolToDelete(null); // Clear the tool to delete state
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Container style={{ marginTop: "5rem", padding: "2rem 0" }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: darkText }}>
        My Published Tools
      </h2>

      {error && (
        <Alert variant="danger" className="text-center mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner
            animation="border"
            role="status"
            style={{ color: primaryPurple }}
          >
            <span className="visually-hidden">Loading tools...</span>
          </Spinner>
          <p className="mt-3" style={{ color: mutedText }}>
            Loading your tools...
          </p>
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center py-5">
          <p className="lead" style={{ color: mutedText }}>
            No tools found. Start publishing your tools!
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/publish-tool")}
            style={{
              backgroundColor: primaryPurple,
              backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
              borderColor: primaryPurple,
              borderRadius: "8px",
              padding: "10px 25px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "white",
              boxShadow: "0 4px 15px rgba(108, 99, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5a52e0";
              e.currentTarget.style.backgroundImage =
                "linear-gradient(to right, #5a52e0, #7a6be0)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(108, 99, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryPurple;
              e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${primaryPurple}, #8a7dff)`;
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(108, 99, 255, 0.3)";
            }}
          >
            Publish New Tool
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {" "}
          {/* Use g-4 for consistent gutter */}
          {tools.map((tool) => (
            <Col xs={12} md={6} lg={4} key={tool._id}>
              {" "}
              {/* Responsive columns */}
              <Card
                className="h-100" // Ensures cards in the same row have equal height
                style={{
                  borderRadius: "15px",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: cardBackgroundColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <Card.Img
                  variant="top"
                  src={
                    tool.image ||
                    "https://placehold.co/400x180/E0E0E0/333333?text=Tool+Image"
                  } // Placeholder image, increased height
                  alt={tool.title}
                  style={{
                    height: "180px", // Fixed height for image, increased for more vertical/square format
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
                <Card.Body
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  {" "}
                  {/* Reduced padding */}
                  <Card.Title
                    className="fw-bold mb-2"
                    style={{ color: darkText, fontSize: "1.1rem" }}
                  >
                    {" "}
                    {/* Reduced font size */}
                    {tool.title}
                  </Card.Title>
                  <Card.Text
                    className="text-muted mb-3"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                      flexGrow: 1,
                    }}
                  >
                    {" "}
                    {/* Reduced font size */}
                    {truncateText(tool.description, 100)}{" "}
                    {/* Truncate description */}
                  </Card.Text>
                  <div className="mb-3">
                    {tool.hashtags &&
                      tool.hashtags.slice(0, 3).map(
                        (
                          tag,
                          index // Limit to 3 hashtags
                        ) => (
                          <span
                            key={index}
                            className="badge me-2 mb-2 rounded-pill"
                            style={{
                              backgroundColor: lightPurple,
                              color: primaryPurple,
                              fontWeight: "500",
                              padding: "6px 10px", // Reduced padding
                              fontSize: "0.75rem",
                            }}
                          >
                            #{tag}
                          </span>
                        )
                      )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Button
                      variant="primary"
                      href={tool.toolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: primaryPurple,
                        backgroundImage: `linear-gradient(to right, ${primaryPurple}, #8a7dff)`,
                        borderColor: primaryPurple,
                        borderRadius: "8px",
                        padding: "6px 15px", // Reduced padding
                        fontSize: "0.9rem", // Reduced font size
                        fontWeight: "600",
                        color: "white",
                        boxShadow: "0 2px 5px rgba(108, 99, 255, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#5a52e0";
                        e.currentTarget.style.backgroundImage =
                          "linear-gradient(to right, #5a52e0, #7a6be0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 10px rgba(108, 99, 255, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = primaryPurple;
                        e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${primaryPurple}, #8a7dff)`;
                        e.currentTarget.style.boxShadow =
                          "0 2px 5px rgba(108, 99, 255, 0.3)";
                      }}
                    >
                      <ExternalLink size={14} style={{ marginRight: "5px" }} />{" "}
                      Visit {/* Reduced icon size */}
                    </Button>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-secondary"
                        onClick={() => navigate(`/edit-tool/${tool._id}`)}
                        style={{
                          borderRadius: "8px",
                          padding: "6px 10px", // Reduced padding
                          fontSize: "0.8rem", // Reduced font size
                          color: darkText,
                          borderColor: lightGreyBorder,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f0f0")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <Edit size={14} /> Edit {/* Reduced icon size */}
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteClick(tool._id)}
                        style={{
                          borderRadius: "8px",
                          padding: "6px 10px", // Reduced padding
                          fontSize: "0.8rem", // Reduced font size
                          color: "#dc3545",
                          borderColor: "#dc3545",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#dc35451a")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <Trash2 size={14} /> Delete {/* Reduced icon size */}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this tool? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyTools;
