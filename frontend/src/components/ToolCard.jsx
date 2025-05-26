import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const ToolCard = ({ tool }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const darkText = "#333";
  const lightGreyBorder = "#e0e0e0";

  const favoriteToolIds = currentUser?.data?.favoriteTools || [];
  const [loadingHeartId, setLoadingHeartId] = useState(null);

  const toggleHeart = async (toolId) => {
    if (!toolId || !currentUser) return;

    const isFavorite = favoriteToolIds.includes(toolId);
    const url = isFavorite
      ? `/api/user/removeFavorite`
      : `/api/user/addFavorite`;

    setLoadingHeartId(toolId);

    try {
      if (isFavorite) {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: { toolId },
        });

        const updatedFavorites = favoriteToolIds.filter((id) => id !== toolId);
        dispatch(
          updateUser({
            ...currentUser,
            data: {
              ...currentUser.data,
              favoriteTools: updatedFavorites,
            },
          })
        );
      } else {
        await axios.post(
          url,
          { toolId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const updatedFavorites = [...favoriteToolIds, toolId];
        dispatch(
          updateUser({
            ...currentUser,
            data: {
              ...currentUser.data,
              favoriteTools: updatedFavorites,
            },
          })
        );
      }

      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update favorites"
      );
    } finally {
      setLoadingHeartId(null);
    }
  };

  const handleDelete = async (toolId) => {
    // if (!window.confirm("Are you sure you want to delete this tool?")) return;

    try {
      await axios.delete(`/api/tool/${toolId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Tool deleted successfully");

      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete tool");
    }
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Col lg={4} md={6} className="mb-4" key={tool._id}>
      <Card
        style={{
          borderRadius: "15px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          overflow: "hidden",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <Card.Body
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "1rem",
            }}
          >
            <img
              src={tool.icon}
              alt={tool.name}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "15px",
                borderRadius: "8px",
              }}
            />
            <div>
              <Card.Title className="mb-0 fw-bold" style={{ color: "#333333" }}>
                {tool.name}
              </Card.Title>
            </div>
          </div>

          <Card.Text className="text-muted mb-3">
            {truncateText(tool.description, 75)}
          </Card.Text>

          <div className="mb-3">
            {tool.tags?.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="badge me-2 mb-2 rounded-pill"
                style={{
                  backgroundColor: "#F0F0FF",
                  color: "#7646C3",
                  fontWeight: "500",
                  padding: "8px 12px",
                }}
              >
                {"#" + tag}
              </span>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Button
              href={tool.toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#6c63ff",
                backgroundImage: "linear-gradient(to right, #6c63ff, #8a7dff)",
                borderColor: "#6c63ff",
                borderRadius: "8px",
                padding: "8px 20px",
                boxShadow: "0 2px 5px rgba(138, 94, 253, 0.7)",
                color: "white",
                transition:
                  "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5a52e0";
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #5a52e0, #7a6be0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6c63ff";
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #6c63ff, #8a7dff)";
              }}
              className="rounded-pill"
            >
              Use Now
            </Button>

            <Button
              variant="light"
              className="rounded-circle d-flex justify-content-center align-items-center shadow-sm"
              onClick={() =>
                currentUser
                  ? toggleHeart(tool._id)
                  : toast.info("Login to add tools to favorites")
              }
              disabled={loadingHeartId === tool._id}
              style={{
                width: "38px",
                height: "38px",
                border: "1px solid #E0E0E0",
                color: "#8B5CF6",
                backgroundColor: "#FFFFFF",
                opacity: loadingHeartId === tool._id ? 0.6 : 1,
                pointerEvents: loadingHeartId === tool._id ? "none" : "auto",
              }}
            >
              <Heart
                size={20}
                fill={favoriteToolIds.includes(tool._id) ? "#FF0000" : "none"}
                color={
                  favoriteToolIds.includes(tool._id) ? "#FF0000" : "#8B5CF6"
                }
              />
            </Button>
          </div>
          {currentUser?.data?.isSuperAdmin && (
            <div className="d-flex justify-content-between align-items-center mt-4 p-1 gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/edit-tool/${tool._id}`)}
                style={{
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "0.8rem",
                  color: darkText,
                  borderColor: lightGreyBorder,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <Edit size={14} /> Edit
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => handleDelete(tool._id)}
                style={{
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "0.8rem",
                  color: "#dc3545",
                  borderColor: "#f5c6cb",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8d7da")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ToolCard;
