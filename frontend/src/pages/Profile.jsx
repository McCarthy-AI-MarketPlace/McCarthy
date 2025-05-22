import {
  Alert,
  Button,
  Modal,
  Form,
  Spinner,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi"; // For the modal icon
import { FaPencilAlt } from "react-icons/fa"; // For the edit icon on avatar
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Set initial image file URL from current user's avatar
  useEffect(() => {
    if (currentUser && currentUser.data && currentUser.data.avatar) {
      setImageFileUrl(currentUser.data.avatar);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Show instant preview
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadProgress(0); // Reset progress

    const formDataForUpload = new FormData(); // Use a separate formData for upload
    formDataForUpload.append("image", imageFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataForUpload,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      // Simulate progress for the UI (as actual progress feedback needs more sophisticated handling like websockets or specific upload libraries)
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setImageFileUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 100);

      const data = await res.json();
      setImageFileUrl(data.data.url);
      setFormData((prevData) => ({ ...prevData, avatar: data.data.url })); // Update formData with new avatar URL
    } catch (err) {
      setImageFileUploadError(err.message);
      setImageFile(null);
      setImageFileUrl(currentUser.data.avatar); // Revert to current user's avatar on error
    } finally {
      setImageFileUploading(false);
      setImageFileUploadProgress(null); // Clear progress after upload is done or failed
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    // Only update if there are changes in formData or a new image file
    if (Object.keys(formData).length === 0 && !imageFile) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }

    // New password and confirm password validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      setUpdateUserError("New password and confirm password do not match.");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Unexpected response from server (not JSON)");
      }

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        marginTop:"3rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Navbar /> */}

      <Container
        style={{ flex: 1, padding: "2.5rem 1rem", maxWidth: "1200px" }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "700",
            marginBottom: "2.5rem",
            color: "#343a40",
          }}
        >
          Your Profile
        </h1>

        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 -0.75rem",
          }}
        >
          {" "}
          {/* Row with manual gutter */}
          <Col
            md={8}
            lg={7}
            xl={8}
            style={{ padding: "0 0.75rem", marginBottom: "1.5rem" }}
          >
            {" "}
            {/* Col with manual padding and margin-bottom */}
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
                Personal Information
              </Card.Header>
              <Card.Body style={{ padding: "2rem" }}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        position: "relative",
                        borderRadius: "50%",
                        overflow: "hidden",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        marginBottom: "0.75rem",
                        border: "3px solid #f8f9fa",
                      }}
                      onClick={() => filePickerRef.current.click()}
                    >
                      {imageFileUploadProgress && (
                        <CircularProgressbar
                          value={imageFileUploadProgress}
                          text={`${imageFileUploadProgress}%`}
                          strokeWidth={5}
                          styles={{
                            root: {
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 10,
                              background: "rgba(255,255,255,0.7)",
                              borderRadius: "50%",
                            },
                            path: {
                              stroke: `#007bff`,
                              transition: "stroke-dashoffset 0.5s ease 0s",
                            },
                            text: {
                              fill: "#343a40",
                              fontSize: "18px",
                              fontWeight: "600",
                            },
                          }}
                        />
                      )}
                      <img
                        src={
                          imageFileUrl ||
                          (currentUser && currentUser.data.avatar)
                        }
                        alt={currentUser && currentUser.data.fullName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity:
                            imageFileUploadProgress &&
                            imageFileUploadProgress < 100
                              ? 0.6
                              : 1,
                          position: "relative",
                          zIndex: 5,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "50%",
                          padding: "0.4rem",
                          cursor: "pointer",
                          zIndex: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        }}
                      >
                        <FaPencilAlt style={{ fontSize: "0.85rem" }} />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                      Click the icon to update your profile picture
                    </p>
                  </div>

                  {imageFileUploadError && (
                    <Alert
                      variant="danger"
                      style={{ marginTop: "1rem", borderRadius: "5px" }}
                    >
                      {imageFileUploadError}
                    </Alert>
                  )}

                  <div style={{ marginBottom: "1rem" }}>
                    <Form.Group style={{ marginBottom: "1rem" }}>
                      <Form.Label
                        htmlFor="fullName"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.5rem",
                          color: "#495057",
                        }}
                      >
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="fullName"
                        placeholder="Full Name"
                        defaultValue={currentUser && currentUser.data.fullName}
                        onChange={handleChange}
                        style={{
                          borderRadius: "5px",
                          borderColor: "#ced4da",
                          padding: "0.75rem 1rem",
                        }}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "1rem" }}>
                      <Form.Label
                        htmlFor="email"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.5rem",
                          color: "#495057",
                        }}
                      >
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Email"
                        defaultValue={currentUser && currentUser.data.email}
                        onChange={handleChange}
                        style={{
                          borderRadius: "5px",
                          borderColor: "#ced4da",
                          padding: "0.75rem 1rem",
                        }}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "1rem" }}>
                      <Form.Label
                        htmlFor="password"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.5rem",
                          color: "#495057",
                        }}
                      >
                        New Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        placeholder="Leave blank to keep current password"
                        onChange={handleChange}
                        style={{
                          borderRadius: "5px",
                          borderColor: "#ced4da",
                          padding: "0.75rem 1rem",
                        }}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "1rem" }}>
                      <Form.Label
                        htmlFor="confirmPassword"
                        style={{
                          fontWeight: "500",
                          marginBottom: "0.5rem",
                          color: "#495057",
                        }}
                      >
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        onChange={handleChange}
                        style={{
                          borderRadius: "5px",
                          borderColor: "#ced4da",
                          padding: "0.75rem 1rem",
                        }}
                      />
                    </Form.Group>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading || imageFileUploading}
                      style={{
                        borderRadius: "5px",
                        padding: "0.75rem 1.5rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}
                    >
                      {loading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          style={{ marginRight: "0.5rem" }}
                        />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col
            md={4}
            lg={5}
            xl={4}
            style={{ padding: "0 0.75rem", marginBottom: "1.5rem" }}
          >
            {" "}
            {/* Col with manual padding and margin-bottom */}
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
                Account Actions
              </Card.Header>
              <Card.Body style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {currentUser && currentUser.data.isAdmin && (
                    <Link
                      to="/create-post"
                      style={{
                        display: "block",
                        width: "100%",
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        variant="outline-primary"
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          padding: "0.75rem 1.5rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                          borderColor: "#007bff",
                          color: "#007bff",
                        }}
                      >
                        Create a post
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="outline-secondary"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      padding: "0.75rem 1.5rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      borderColor: "#6c757d",
                      color: "#6c757d",
                    }}
                    onClick={handleSignout}
                  >
                    Log out
                  </Button>

                  <Button
                    variant="danger"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      padding: "0.75rem 1.5rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {updateUserSuccess && (
          <Alert
            variant="success"
            style={{ marginTop: "1.5rem", borderRadius: "5px" }}
          >
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert
            variant="danger"
            style={{ marginTop: "1.5rem", borderRadius: "5px" }}
          >
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert
            variant="danger"
            style={{ marginTop: "1.5rem", borderRadius: "5px" }}
          >
            {error}
          </Alert>
        )}
      </Container>

      {/* <Footer /> */}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: "none" }} />
        <Modal.Body style={{ textAlign: "center", padding: "2rem" }}>
          <HiOutlineExclamationCircle
            style={{
              fontSize: "4.5rem",
              color: "#ffc107",
              marginBottom: "1.5rem",
            }}
          />
          <h4
            style={{
              marginBottom: "1.5rem",
              fontWeight: "600",
              color: "#343a40",
            }}
          >
            Are you sure you want to delete your account?
          </h4>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              style={{ borderRadius: "5px", padding: "0.6rem 1.2rem" }}
            >
              Yes, I'm sure
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              style={{ borderRadius: "5px", padding: "0.6rem 1.2rem" }}
            >
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
