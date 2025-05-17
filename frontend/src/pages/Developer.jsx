import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import ShowcaseSection from '../components/ShowcaseSection';
import FAQSection from '../components/toggleFAQ ';
const Developer = () => {
  return (
    <div style={{ marginTop: "4.1rem" }}>
      {/* Gradient Header */}
      <div
        style={{
          minHeight: "30rem",
          background: "#b58ac5",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "3.1rem", fontWeight: "bold", color: "black" }}>
          Add Your AI Tool to McCarthy
        </h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "700px", color: "#463f30" }}>
          Join hundreds of AI developers showcasing their tools to millions of
          users looking for the perfect solution.
        </p>
        <button
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#6e348e",
            border: "none",
            padding: "12px 24px",
            borderRadius: "999px",
            color: "white",
            fontWeight: "600",
            fontSize: "1rem", // Fixed from "rem" to "1rem"
            cursor: "pointer",
            boxShadow: "0px 4px 14px rgba(139, 77, 255, 0.3)",
            display: "flex", // Changed from grid to flex for horizontal layout
            alignItems: "center",
            gap: "8px", // Increased gap between text and icon
          }}
        >
          Submit Your Tool
          <FaArrowRight />
        </button>
      </div>

      {/* Why List Section */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#222" }}>
          Why List Your AI Tool on McCarthy?
        </h2>
        <p style={{ color: "#666", marginBottom: "3rem" }}>
          Get discovered by the right audience and grow your user base.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
              maxWidth: "280px",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "2rem" }}>👁️</p>
            <h3 style={{ fontWeight: "600" }}>Increased Visibility</h3>
            <p style={{ color: "#555" }}>
              Get in front of thousands of users actively looking for AI tools
              like yours.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
              maxWidth: "280px",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "2rem" }}>📊</p>
            <h3 style={{ fontWeight: "600" }}>Real-time Analytics</h3>
            <p style={{ color: "#555" }}>
              Access detailed metrics about how users are engaging with your
              tool.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 0 20px rgba(0,0,0,0.05)",
              maxWidth: "280px",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "2rem" }}>🔁</p>
            <h3 style={{ fontWeight: "600" }}>Direct Integration</h3>
            <p style={{ color: "#555" }}>
              Users can access your tool directly from McCarthy without leaving
              the platform.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ background: "#D1B8DD", padding: "4rem 2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#222",
            textAlign: "center",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "2rem auto",
            gap: "2rem",
          }}
        >
          {/* Steps */}
          <div style={{ flex: "1 1 300px" }}>
            {[
              {
                number: "01",
                title: "Submit Your Tool",
                desc: "Fill out our simple submission form with details about your AI tool.",
              },
              {
                number: "02",
                title: "Review Process",
                desc: "Our team reviews your submission to ensure it meets our quality standards.",
              },
              {
                number: "03",
                title: "Get Listed",
                desc: "Once approved, your tool will be listed in our marketplace for users to discover.",
              },
              {
                number: "04",
                title: "Grow & Scale",
                desc: "Gain new users and get valuable feedback to improve your tool.",
              },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#eee6ff",
                    color: "#6c2bd9",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h4
                    style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Box */}
          <div
            style={{
              flex: "1 1 320px",
              backgroundColor: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 0 30px rgba(0,0,0,0.05)",
            }}
          >
            {[
              "Fast approval process",
              "Free basic listings available",
              "Promotional opportunities for featured tools",
              "Detailed analytics dashboard",
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#eee6ff",
                    borderRadius: "50%",
                    color: "#6c2bd9",
                    textAlign: "center",
                    lineHeight: "24px",
                    fontWeight: "bold",
                    marginRight: "0.75rem",
                  }}
                >
                  ✓
                </span>
                <span style={{ color: "#444", fontSize: "0.95rem" }}>
                  {feature}
                </span>
              </div>
            ))}
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <h3
                style={{ fontSize: "2rem", fontWeight: "bold", color: "#222" }}
              >
                500+
              </h3>
              <p style={{ color: "#6a6a6a", margin: 0 }}>
                AI tools already listed
              </p>
            </div>
          </div>
        </div>
      </div>
      <FAQSection />
    </div>
  );
};

export default Developer;
