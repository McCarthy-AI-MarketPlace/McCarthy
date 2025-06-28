import React from "react";
import { Col, Card } from "react-bootstrap";

const ToolCardSkeleton = () => {
  return (
    <Col lg={4} md={6} className="mb-4 w-100">
      <Card
        style={{
          borderRadius: "15px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          minHeight: "300px",
        }}
      >
        <Card.Body
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#e0e0e0",
              }}
            ></div>
            <div
              style={{
                width: "60%",
                height: "16px",
                borderRadius: "4px",
                backgroundColor: "#e0e0e0",
              }}
            ></div>
          </div>

          <div
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#e0e0e0",
              borderRadius: "6px",
            }}
          ></div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: "60px",
                  height: "24px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "15px",
                }}
              ></div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "36px",
                backgroundColor: "#e0e0e0",
                borderRadius: "20px",
              }}
            ></div>
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#e0e0e0",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ToolCardSkeleton;
