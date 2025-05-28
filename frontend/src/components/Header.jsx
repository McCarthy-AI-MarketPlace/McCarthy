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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

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
  backgroundColor: "rgba(232, 226, 251, 0.7)", // translucent light purple
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  width: "100%",
  position: "fixed",
  height: "65px",
  zIndex: "2",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
}}

      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "black",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              background: "linear-gradient(to right, #7C3AED, #3B82F6)",
              padding: "8px",
            }}
          >
            <div
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
              }}
            ></div>
          </div>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>McCarthy</span>
        </Link>

        <div className="d-none d-md-flex align-items-center gap-4">
          <Link to="/" className="text-dark text-decoration-none">
            Home
          </Link>
          <Link to="/explore" className="text-dark text-decoration-none">
            Explore
          </Link>
          <Link to="/developer" className="text-dark text-decoration-none">
            Developers
          </Link>
          {currentUser && (
            <Link to="/dashboard" className="text-dark text-decoration-none">
              Dashboard
            </Link>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          {currentUser ? (
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <Image
                src={currentUser.data.avatar}
                alt="profile"
                roundedCircle
                style={{ width: 40, height: 40, cursor: "pointer" }}
                onClick={() => {
                  toggleDropdown();
                  setMobileMenuOpen(false);
                }}
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
                    minWidth: 180,
                  }}
                >
                  <div
                    className="d-flex flex-column p-2"
                    style={{ gap: "0.25rem" }}
                  >
                    <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {currentUser.data.fullName}
                    </p>
                    <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {currentUser.data.email}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#e9ecef",
                      margin: "0.5rem 0",
                    }}
                  />
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
                  {currentUser.data.isSuperAdmin && (
                    <div
                      onClick={() => {
                        navigate("/users");
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      User
                    </div>
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
          ) : (
            <button
              onClick={handleOpenLogin}
              style={{ all: "unset", cursor: "pointer", fontWeight: "bold" }}
              className=" d-md-inline"
            >
              LOG IN
            </button>
          )}

          <div className="d-md-none">
            <button
              onClick={() => {
                toggleMobileMenu();
                setDropdownOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div
          className="d-md-none w-100"
          style={{
            position: "fixed",
            top: 65,
            left: 0,
            zIndex: 3,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex flex-column align-items-start p-3 gap-2">
            <Link
              to="/"
              className="text-dark text-decoration-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-dark text-decoration-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/developer"
              className="text-dark text-decoration-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              Developers
            </Link>
            {currentUser && (
              <Link
                to="/dashboard"
                className="text-dark text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}

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