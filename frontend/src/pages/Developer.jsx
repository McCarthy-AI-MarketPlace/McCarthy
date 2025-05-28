import React from 'react';
import { Container, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa6";
import ToolSubmissionForm from '../components/ToolSubmissionForm';
import FAQSection from '../components/toggleFAQ ';

const Developer = () => {
  const backgroundStyle = {
    minHeight: "40vh",
    background: "linear-gradient(90deg, #7b2ff7 0%, #4facfe 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    padding: "40px",
  };
  return (
    <div style={{ marginTop: "4rem" }}>
      {/* Gradient Header */}
      <div
        style={{
          minHeight: "30rem",
          background: "linear-gradient(180deg, #e8e2fb 30%, #dfe7fb 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <Container>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "700",
              color: "#4b4ded",
              marginBottom: "1rem",
            }}
          >
            Add Your AI Tool to McCarthy
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6c6a73",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Join hundreds of AI developers showcasing their tools to millions of
            users looking for the perfect solution.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              style={{
                backgroundColor: "#7646C3", // updated bluish-purple to match screenshot/video
                border: "none",
                padding: "12px 28px",
                borderRadius: "999px",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
                boxShadow: "0px 4px 14px rgba(108, 99, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Submit Your Tool <FaArrowRight />
            </Button>
          </div>
        </Container>
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
      <div style={{ background: "#eeebfc", padding: "4rem 2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#222",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Step Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              flex: "2",
            }}
          >
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
                  background: "#fff",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#CADCFF",
                    color: "black",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.number}
                </div>
                <h4
                  style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}
                >
                  {step.title}
                </h4>
                <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Features Box */}
          <div
            style={{
              flex: "1 1 300px",
              backgroundColor: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 0 30px rgba(0,0,0,0.1)",
              height: "fit-content",
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
                    backgroundColor: "#CADCFF",
                    borderRadius: "50%",
                    color: "black",
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

      <ToolSubmissionForm />

      <div style={backgroundStyle}>
        <Container>
          <h2 style={{ fontWeight: "bold", fontSize: "2rem" }}>
            Ready to Showcase Your AI Tool?
          </h2>
          <p style={{ fontSize: "1.25rem", marginTop: "15px" }}>
            Join our growing marketplace of innovative AI tools and reach <br />
            thousands of potential users.
          </p>
          <Button
            variant="light"
            style={{
              marginTop: "25px",
              padding: "10px 25px",
              fontWeight: "500",
              borderRadius: "25px",
            }}
          >
            Submit Your Tool Now
          </Button>
        </Container>
      </div>
      <FAQSection />
      <div >
        

      </div>
    </div>
  );
};

export default Developer;

