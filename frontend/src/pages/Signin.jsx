import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <Container
        fluid
        className="vh-80 d-flex align-items-center justify-content-center mt-2"
      >
        <Row className="w-100 justify-content-center">
          <Col
            md={10}
            lg={8}
            xl={7}
            className="d-flex shadow-lg overflow-hidden p-3"
            style={{ borderRadius: "25px", backgroundColor: "#ebe2f4" }}
          >
            {/* Left Info Panel - Hidden on mobile */}
            <Col
              md={6}
              className="p-5 d-none d-md-flex flex-column justify-content-center"
              style={{ borderRadius: "25px" }}
            >
              <h2 className="fw-bold" style={{ color: "#7f4aca" }}>
                Welcome Back to McCarthy
              </h2>
              <h5 className="fw-bold mt-2">Access the Marketplace of Cutting-Edge AI</h5>
              <p className="mt-3 text-muted">
                Sign in to connect with the premium community of AI innovators, explore groundbreaking solutions, and manage your tools and transactions — all in one place.
              </p>
            </Col>

            {/* Signup Form */}
            <Col
              xs={12}
              md={6}
              style={{ borderRadius: "25px" }}
              className="p-3 myBox"
            >
              <h3 className="fw-bold text-center mb-1">Signin to your account</h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 text-white fw-bold"
                  style={{
                    background: "linear-gradient(90deg, #7f4aca, #d672ec)",
                    border: "none",
                    borderRadius: "25px",
                    boxShadow: "0 4px 15px rgba(127, 74, 202, 0.4)",
                  }}
                >
                  SIGN IN
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
                    fontWeight: "500",
                    color: "#5f6368",
                  }}
                >
                  <FcGoogle size={20} />
                  <span>Google</span>
                </div>

                <div className="text-center mt-4">
                  <small>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-decoration-none"
                      style={{ color: "#7f4aca" }}
                    >
                      Sign up
                    </Link>
                  </small>
                </div>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
