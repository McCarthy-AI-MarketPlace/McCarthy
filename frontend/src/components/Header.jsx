import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center px-5 py-3 "
      style={{
        background: "rgba(235, 226, 244, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex align-items-center gap-4">
        <Link
          to="/"
          className="text-decoration-none text-dark d-inline-flex align-items-center"
          style={{
            flexDirection: "column",
            lineHeight: "1",
          }}
        >
          <h3 className="fw-bold mb-1" style={{ margin: 0 }}>
            McCarthy
          </h3>
          <p className="text-dark" style={{ fontSize: "0.75rem", margin: 0 }}>
            An AI Marketplace.
          </p>
        </Link>

        <div className="d-flex gap-4">
          <Link to="/tools" className="text-dark text-decoration-none">
            TOOLS
          </Link>
          <Link to="/support" className="text-dark text-decoration-none">
            SUPPORT
          </Link>
        </div>
      </div>

      <Link to="/signin" className="text-dark text-decoration-none">
        SIGN IN
      </Link>
    </Container>
  );
}
