import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ShowcaseSection = () => {
  return (
    <>
      <style>{`
        .showcase-wrapper {
          background: linear-gradient(90deg, #b58ac5, #a36ec2, #7c4b9f);
          padding: 80px 20px;
          text-align: center;
          color: white;
        }

        .showcase-wrapper h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .showcase-wrapper p {
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        .submit-btn {
          background-color: #fff;
          color: #6e348e;
          padding: 12px 24px;
          border: none;
          border-radius: 999px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0px 4px 14px rgba(139, 77, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .submit-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(120deg, #ff6ec4, #b58ac5, #7e2ea7);
          transition: left 0.4s ease;
          z-index: -1;
        }

        .submit-btn:hover::before {
          left: 0;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(181, 138, 197, 0.5);
          color: white;
        }

        .submit-btn:hover .arrow-icon {
          transform: translateX(6px);
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }
      `}</style>

      <div className="showcase-wrapper">
        <h2>Ready to Showcase Your AI Tool?</h2>
        <p>
          Join our growing marketplace of innovative AI tools and reach
          thousands of potential users.
        </p>
        <button className="submit-btn">
          Submit Your Tool Now
          <span className="arrow-icon">
            <FaArrowRight />
          </span>
        </button>
      </div>
    </>
  );
};

export default ShowcaseSection;
