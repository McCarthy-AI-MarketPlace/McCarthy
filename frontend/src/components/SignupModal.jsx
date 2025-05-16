import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const SignupModal = ({ show, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        onSwitch();
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered className="signup-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create an account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              id="fullName"
              type="text"
              placeholder="Enter full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>

          {errorMessage && (
            <div className="text-danger mb-3">{errorMessage}</div>
          )}

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

          <div
            className="d-flex align-items-center justify-content-center gap-2 py-2 px-3 mt-2"
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <FcGoogle size={20} />
            <span>Google</span>
          </div>

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
  );
};

export default SignupModal;
