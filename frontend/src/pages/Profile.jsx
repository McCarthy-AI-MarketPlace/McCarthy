import { Alert, Button, Modal, Form, Spinner } from "react-bootstrap";
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
import { HiOutlineExclamationCircle } from "react-icons/hi";
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
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

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setImageFileUrl(data.data.url);
      setFormData({ ...formData, avatar: data.data.url }); // Set avatar in form
    } catch (err) {
      setImageFileUploadError(err.message);
      setImageFile(null);
      setImageFileUrl(null);
    } finally {
      setImageFileUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
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

      // Validate response is JSON
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
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1rem",
        marginTop: "3rem",
      }}
    >
      <h1
        className="text-center mb-4"
        style={{ fontWeight: "600", fontSize: "2rem" }}
      >
        Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          style={{ display: "none" }}
        />
        <div
          onClick={() => filePickerRef.current.click()}
          style={{
            width: "128px",
            height: "128px",
            margin: "0 auto",
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
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
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.data.avatar}
            alt="user"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity:
                imageFileUploadProgress && imageFileUploadProgress < 100
                  ? 0.6
                  : 1,
              border: "4px solid lightgray",
            }}
          />
        </div>

        {imageFileUploadError && (
          <Alert variant="danger" className="mt-3">
            {imageFileUploadError}
          </Alert>
        )}

        <Form.Group className="mt-4">
          <Form.Control
            type="text"
            id="fullName"
            placeholder="Full Name"
            defaultValue={currentUser.data.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.data.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="w-100 mt-3"
          disabled={loading || imageFileUploading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Update"}
        </Button>

        {currentUser.data.isAdmin && (
          <Link to="/create-post" className="d-block mt-2">
            <Button variant="outline-success" className="w-100">
              Create a post
            </Button>
          </Link>
        )}
      </form>

      <div
        className="d-flex justify-content-between mt-4"
        style={{ color: "red", cursor: "pointer" }}
      >
        <span onClick={() => setShowModal(true)}>Delete Account</span>
        <span onClick={handleSignout}>Sign Out</span>
      </div>

      {updateUserSuccess && (
        <Alert variant="success" className="mt-3">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert variant="danger" className="mt-3">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle
            style={{ fontSize: "3.5rem", color: "gray", marginBottom: "1rem" }}
          />
          <h4 className="mb-3">
            Are you sure you want to delete your account?
          </h4>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="danger" onClick={handleDeleteUser}>
              Yes, I'm sure
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
