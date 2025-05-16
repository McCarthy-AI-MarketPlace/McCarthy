import { Container, Button, Row, Col } from "react-bootstrap";

import FixedLogos from "../components/FixedLogos";

import { Link } from "react-router-dom";

import Tools from "./Tools";

// import "@fontsource/jost";

import SearchBar from "../components/SearchBar";

import WaveAnimation from "../components/WaveAnimation";

const Landing = () => {
  const tools = [
    "ChatGPT",

    "Midjourney",

    "Copy.ai",

    "DALL-E",

    "GitHub Copilot",
  ];

  return (
    <>
      <div
        style={{
          minHeight: "90vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "space-between",

          color: "#000",

          fontFamily: "Poppins, sans-serif",

          // overflowX: "hidden",

          position: "relative",

          marginTop: "9vh",
        }}
      >
        <section className="hero-gradient">
          <Container>
            <div className="text-center d-flex flex-column align-items-center gap-2">
              <div className="animate-fade-up" style={{ maxWidth: "768px" }}>
                <h1 className="display-4 fw-bold gradient-text custom-main-text">
                  There's an AI for Everything. Find it. Use it. Instantly.
                </h1>

                <p className="lead text-muted mx-auto custom-text">
                  McCarthy is your one-stop marketplace to discover, compare,
                  and use the best AI tools for any task.
                </p>
              </div>

              <SearchBar />

              <Button
                className="mt-2 px-4 py-2"
                style={{
                  backgroundColor: "#FFFACD",

                  color: "#000",

                  border: "none",

                  borderRadius: "10px",

                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  TRY NOW!
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        <FixedLogos />

          <WaveAnimation />
        
      </div>

      <Tools />
    </>
  );
};

export default Landing;
