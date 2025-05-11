import React from "react";
import Header from "../components/Header";
import "./SignupForm.css";

export default function Signin() {
  return (
    <>
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-left">
            <h2>
              <span style={{ color: "#6a5acd", fontWeight: "bold" }}>
                McCarthy
              </span>
            </h2>
            <h4 style={{ margin: "10px 0", fontWeight: "bold" }}>
              THE AI MARKETPLACE
            </h4>
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                lineHeight: "1.6",
                fontWeight: "600",
              }}
            >
              Join the premium community connecting AI creators, developers and
              businesses. <br />
              Discover and trade cutting edge AI solutions.
            </p>
          </div>

          <div className="signup-right">
            <div className="signup-inner-box">
              <h3>Create an account</h3>
              <p>Enter your information to get started with McCarthy</p>
              <form className="signup-form">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="" required />

                <button type="submit" className="signup-button">
                  SIGN UP
                </button>

                <p className="or">OR</p>
              </form>

              <div className="social-buttons">
                <button>Google</button>
                <button>Facebook</button>
              </div>

              <div className="login-link">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
