import React from "react";
import { Image } from "react-bootstrap";

const FixedLogos = () => {
  return (
    <>
      {/* Top-left Logo */}
      <Image
        src="https://thepixel.ai/wp-content/uploads/2024/04/Copy.ai-logo.jpg"
        alt="Copy.ai Logo"
        style={{
          position: "absolute",
          top: "12%",
          left: "5%",
          width: "80px",
          borderRadius: "15px",
          zIndex: 1000,
        }}
      />

      {/* Top-right Logo */}
      <Image
        src="https://programmaticseo.dk/wp-content/uploads/2025/01/perplexityai-logo.webp"
        alt="Perplexity AI Logo"
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "60px",
          borderRadius: "15px",
          zIndex: 1000,
        }}
      />

      {/* Bottom-left Logo */}
      <Image
        src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-black-background-png-1-1200x1200.png"
        alt="ChatGPT Logo"
        style={{
          position: "absolute",
          bottom: "28%",
          left: "5%",
          width: "60px",
          borderRadius: "15px",
          zIndex: 1000,
        }}
      />

      {/* Bottom-right Logo */}
      <Image
        src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7cf51e188450701.65b6d6991d38d.png"
        alt="Gemini Logo"
        style={{
          position: "absolute",
          bottom: "35%",
          right: "5%",
          width: "80px",
          borderRadius: "15px",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default FixedLogos;
