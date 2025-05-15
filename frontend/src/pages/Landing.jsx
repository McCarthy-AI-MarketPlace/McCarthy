import { Container, Button, Row, Col} from "react-bootstrap";
import FixedLogos from "../components/FixedLogos";
import { Link } from "react-router-dom";
import Tools from "./Tools";
import Footer from "../components/Footer";
import "@fontsource/jost";
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
          minHeight: "95vh",
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
                <h1 className="display-4 fw-bold gradient-text">
                  There's an AI for Everything. Find it. Use it. Instantly.
                </h1>
                <p className="lead text-muted mx-auto">
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

        {/* <div style={{ width: "100%", overflow: "hidden" }}>
          <svg
            viewBox="0 0 800 400"
            style={{
              display: "block",
              width: "100%",
              height: "30vh",
              marginTop: "-1px",
              marginBottom: "-1px",
            }}
            preserveAspectRatio="none"
          >
            <path
              d="M 0 300 Q 100 200 250 300 Q 350 400 450 300 Q 650 100 800 300    
               L 800 400 
               L 0 400 
               Z"
              fill="#ebe2f4"
            />
          </svg>

          <div
            style={{
              backgroundColor: "#ebe2f4",
              textAlign: "center",
              padding: "2rem 1rem",
            }}
          >
            <h2 style={{ color: "#000", fontWeight: "600" }}>What we do</h2>
          </div>
        </div> */}
        <div>
          {/* Your existing content */}
          <WaveAnimation />
          <div
            style={{
              backgroundColor: "#ebe2f4",
              opacity:"0.6",
              textAlign: "center",
              padding: "2rem 1rem",
            }}
          >
            <h2 style={{ color: "#000", fontWeight: "600" }}>What we do</h2>
          </div>
             
        </div>
      </div>
      <Tools />

      <Footer />
    </>
  );
};

export default Landing;
