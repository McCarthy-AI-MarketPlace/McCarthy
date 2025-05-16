import { useState } from "react";
import { Container } from "react-bootstrap";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";

export default function Header() {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleOpenSignin = () => {
    setShowSignup(false);
    setShowSignin(true);
  };

  const handleOpenSignup = () => {
    setShowSignin(false);
    setShowSignup(true);
  };

  const handleCloseModals = () => {
    setShowSignin(false);
    setShowSignup(false);
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "rgba(181, 138, 197, 0.5)",

          backdropFilter: "blur(10px)",

          WebkitBackdropFilter: "blur(10px)",

          width: "100%",

          position: "fixed",

          height: "65px",

          zIndex: "2000",
        }}
      >
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

        <div className="d-flex align-items-center gap-4">
          <Link to="/tools" className="text-dark text-decoration-none">
            Explore
          </Link>

          <Link to="/support" className="text-dark text-decoration-none">
            Developers
          </Link>
        </div>

        <button
          onClick={handleOpenSignin}
          style={{ all: "unset", cursor: "pointer" }}
        >
          SIGN IN
        </button>
      </Container>

      <SigninModal
        show={showSignin}
        onClose={handleCloseModals}
        onSwitch={handleOpenSignup}
      />
      <SignupModal className="mt-2"
        show={showSignup}
        onClose={handleCloseModals}
        onSwitch={handleOpenSignin}
      />
    </>
  );
}
