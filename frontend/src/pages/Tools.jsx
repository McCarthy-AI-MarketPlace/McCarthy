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
        <h1
          className="fw-bold text-center mt-5"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          Trending Tools
        </h1>
        <RecommendedSection />
      </div>
    </>
  );
}
