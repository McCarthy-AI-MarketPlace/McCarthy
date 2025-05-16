import { useState } from "react";
import { Modal, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import OAuth from "./OAuth";

const SignupModal = ({ show, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    // Empty fields check
    if (!trimmedData.fullName || !trimmedData.email || !trimmedData.password) {
      return showToast("Please fill in all fields", "danger");
    }

    // Email format validation
    if (!validateEmail(trimmedData.email)) {
      return showToast("Please enter a valid email address", "danger");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        return showToast(data.message, "danger");
      }

      showToast(data.message, "success");

      setFormData({ fullName: "", email: "", password: "" });
      setTimeout(() => {
        onSwitch();
      }, 1000);
    } catch (error) {
      setLoading(false);
      showToast(error.message, "danger");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered className="auth-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.fullName}
                id="fullName"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.email}
                id="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={formData.password}
                id="password"
                type="password"
                placeholder="Enter password"
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
              {loading ? <Spinner animation="border" size="sm" /> : "SIGN UP"}
            </Button>

            <div className="text-center mt-4 mb-3 text-muted">
              OR CONTINUE WITH
            </div>

           <OAuth onClose={onClose} />

            <div className="text-center mt-4">
              <small>
                Already have an account?{" "}
                <span
                  onClick={onSwitch}
                  style={{ color: "#7f4aca", cursor: "pointer" }}
                >
                  Log in
                </span>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-center" className="p-3" style={{ zIndex: 1056 }}>
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

export default SignupModal;
