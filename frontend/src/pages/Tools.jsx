import React from "react";
import RecommendedSection from "./RecommendedSection";
import WaveAnimation from "../components/WaveAnimation";

export default function Tools() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#ebe2f4",

          opacity: "0.6",

          textAlign: "center",

          padding: "2rem 1rem",
        }}
      >
        <h2 style={{ color: "#000", fontWeight: "600" }}>What we do</h2>
      </div>
      <WaveAnimation flip />
      <div style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
<<<<<<< HEAD
        <h1
          className="fw-bold text-center mt-5"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          Trending Tools
        </h1>
        <RecommendedSection />
=======
        {/* <svg
          viewBox="0 0 800 450"
          style={{
            display: "block",
            width: "100%",
            height: "30vh",
            marginTop: "-4px",
            marginBottom: "-1px",
          }}
          preserveAspectRatio="none"
        >
          <path
            d="
            M 0 150 
            Q 0 450 400 450 
            Q 800 450 800 150 
            L 800 0 
            L 0 0 
            Z
          "
            fill="#ebe2f4"
          />
        </svg> */}
      <h1 className="fw-bold text-center mt-5" style={{ fontFamily: "Jost, sans-serif" }}>
        Trending Tools
      </h1>
      <RecommendedSection/>
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
      </div>
    </>
  );
}
