<<<<<<< HEAD
import { Container, Button, Row, Col } from "react-bootstrap";

=======
import { Container, Button, Row, Col} from "react-bootstrap";
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
import FixedLogos from "../components/FixedLogos";

import { Link } from "react-router-dom";

import Tools from "./Tools";
<<<<<<< HEAD

// import "@fontsource/jost";

import SearchBar from "../components/SearchBar";

=======
import Footer from "../components/Footer";
import "@fontsource/jost";
import SearchBar from "../components/SearchBar";
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
import WaveAnimation from "../components/WaveAnimation";

const Landing = () => {
  const tools = [
    "ChatGPT",
<<<<<<< HEAD

    "Midjourney",

    "Copy.ai",

    "DALL-E",

    "GitHub Copilot",
  ];

=======
    "Midjourney",
    "Copy.ai",
    "DALL-E",
    "GitHub Copilot",
  ];
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
  return (
    <>
      <div
        style={{
<<<<<<< HEAD
          minHeight: "90vh",

=======
          minHeight: "95vh",
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
          display: "flex",

          flexDirection: "column",

          justifyContent: "space-between",

          color: "#000",

          fontFamily: "Poppins, sans-serif",
<<<<<<< HEAD

          // overflowX: "hidden",

          position: "relative",

=======
          // overflowX: "hidden",
          position: "relative",
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
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
<<<<<<< HEAD

                <p className="lead text-muted mx-auto">
                  McCarthy is your one-stop marketplace to discover, compare,
                  and use the best AI tools for any task.
                </p>
              </div>

=======
                <p className="lead text-muted mx-auto">
                  McCarthy is your one-stop marketplace to discover, compare,
                  and use the best AI tools for any task.
                </p>
              </div>

>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
              <SearchBar />

              <Button
                className="mt-2 px-4 py-2"
                style={{
                  backgroundColor: "#FFFACD",
<<<<<<< HEAD

                  color: "#000",

                  border: "none",

                  borderRadius: "10px",

=======
                  color: "#000",
                  border: "none",
                  borderRadius: "10px",
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
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
<<<<<<< HEAD

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
=======
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
             
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
        </div>
      </div>

      <Tools />
<<<<<<< HEAD
=======

      <Footer />
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
    </>
  );
};

export default Landing;
