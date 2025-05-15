import React from "react";
import RecommendedSection from "./RecommendedSection";

export default function Tools() {
  return (
    <>
      <div style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
        <svg
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
        </svg>
      <h1 className="fw-bold text-center mt-5" style={{ fontFamily: "Jost, sans-serif" }}>
        Trending Tools
      </h1>
      <RecommendedSection/>
      </div>
    </>
  );
}
