import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"; // Import Link from React Router

const LoginModal = ({ show, onClose, onSwitch }) => {
  // State management for form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Handle changes for the input fields and remember me checkbox
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  useEffect(() => {
    const body = document.body;
    // Lock the body scroll when the modal is open
    if (show) {
      body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      body.style.overflow = 'auto'; // Restore body scroll
    }

    return () => {
      // Cleanup in case the modal is closed before the component unmounts
      body.style.overflow = 'auto';
    };
  }, [show]);

  return (
    <>
      {/* Background Overlay with Blur Effect */}
      {show && (
        <div
          id="background-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)", // Optional: Add slight darkening
            backdropFilter: "blur(4px)", // Reduced the blur effect to 4px
            zIndex: 1040, // Below the modal
          }}
        ></div>
      )}

      {/* Modal from React-Bootstrap */}
      <Modal
        show={show}
        onHide={onClose}
        centered
        style={{
          zIndex: 1050, // Ensure the modal is above the overlay
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log in to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Email Input */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            {/* Remember Me and Forgot Password */}
            <div className="d-flex justify-content-between mb-3">
              <Form.Check
                type="checkbox"
                label="Always stay signed in"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#7f4aca" }}>
                Forgot Password?
              </Link>
            </div>

            {/* Log In Button */}
            <Button
              type="submit"
              className="w-100 text-white fw-bold"
              style={{
                background: "linear-gradient(90deg, #7f4aca, #d672ec)",
                border: "none",
                borderRadius: "25px",
              }}
            >
              LOG IN
            </Button>

            <div className="text-center mt-4 mb-3 text-muted">OR CONTINUE WITH</div>

            {/* Google Button */}
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

            {/* Switch to Sign Up Link */}
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
    </>
  );
};

export default LoginModal;
