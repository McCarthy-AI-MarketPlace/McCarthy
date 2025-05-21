import { useState, useEffect, useRef } from "react";
import { Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleOpenSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          zIndex: "2",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
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
          <Link to="/explore" className="text-dark text-decoration-none">
            Explore
          </Link>
          <Link to="/developer" className="text-dark text-decoration-none">
            Developers
          </Link>
          <Link to="/dashboard" className="text-dark text-decoration-none">
            Dashboard
          </Link>
        </div>

        {!currentUser ? (
          <button
            onClick={handleOpenLogin}
            style={{ all: "unset", cursor: "pointer", fontWeight: "bold" }}
          >
            LOG IN
          </button>
        ) : (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <Image
              src={currentUser.data.avatar}
              alt="profile"
              roundedCircle
              style={{ width: 40, height: 40, cursor: "pointer" }}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 10px)",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "6px",
                  padding: "0.5rem 0",
                  zIndex: 10,
                  minWidth: 120,
                }}
              >
                <div
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Profile
                </div>
                {currentUser.data.isAdmin && (
                  <>
                    <div
                      onClick={() => {
                        navigate("/publish");
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Publish
                    </div>
                    <div
                      onClick={() => {
                        navigate("/my-tools");
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      My Tools
                    </div>
                  </>
                )}

                <div
                  onClick={handleLogout}
                  style={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </Container>

      <LoginModal
        show={showLogin}
        onClose={handleCloseModals}
        onSwitch={handleOpenSignup}
      />
      <SignupModal
        show={showSignup}
        onClose={handleCloseModals}
        onSwitch={handleOpenLogin}
      />
    </>
  );
}
