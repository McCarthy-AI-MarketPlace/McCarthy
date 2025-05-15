import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center px-5 py-3 "
      style={{
        backgroundColor: "rgba(229, 231, 235, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        width: "100%",
        position: "fixed",
        height: "65px",
        zIndex:"2000"
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
