import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const SigninModal = ({ show, onClose, onSwitch }) => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (

    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign in to your account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={handleChange}/>
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
            onClick={handleSubmit}
          > {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "SIGN IN"
          )}
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
  );
};

export default SigninModal;
