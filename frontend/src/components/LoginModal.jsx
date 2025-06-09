import { useState } from "react";
import { Modal, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "./OAuth";

const LoginModal = ({ show, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (!e.target.id) return;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.email || !trimmedData.password) {
      showToast("Please fill in all fields", "danger");
      return;
    }

    if (!validateEmail(trimmedData.email)) {
      showToast("Please enter a valid email address", "danger");
      return;
    }

    try {
      dispatch(signInStart());
      setLoading(true);

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with error code: ${res.status}`);
      }

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        showToast(data.message, "danger");
        return;
      }

      dispatch(signInSuccess(data));
      localStorage.setItem("user", JSON.stringify(data)); // ✅ Save to localStorage

      showToast(data.message, "success");

      setFormData({ email: "", password: "" }); // Clear form
      onClose(); // Close modal
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      setLoading(false);
      showToast(error.message, "danger");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered className="auth-modal">
        <Modal.Header closeButton>
          <Modal.Title>Sign in to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                id="email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                id="password"
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 text-white fw-bold"
              style={{
                background: "linear-gradient(90deg, #7f4aca, #d672ec)",
                border: "none",
                borderRadius: "25px",
              }}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "SIGN IN"}
            </Button>

            <div className="text-center mt-4 mb-3 text-muted">
              OR CONTINUE WITH
            </div>

            <OAuth onClose={onClose} />

            <div className="text-center mt-4">
              <small>
                Don’t have an account?{" "}
                <span
                  onClick={onSwitch}
                  style={{ color: "#7f4aca", cursor: "pointer" }}
                >
                  Sign up
                </span>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{ zIndex: 1056 }}
      >
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default LoginModal;
