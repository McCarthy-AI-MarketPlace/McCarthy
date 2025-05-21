import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const ToolCard = ({ tool }) => {
  return (
    <Card className="h-100 shadow-sm rounded-4 border-0 tool-card">
      <Card.Img
        variant="top"
        src={tool.imageUrl}
        alt={tool.name}
        className="rounded-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-semibold">{tool.name}</Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
          {tool.description}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Badge bg="light" text="dark" className="px-2 py-1 rounded-pill border">
            {tool.pricing}
          </Badge>
          <span className="text-warning fw-medium">{tool.rating} ★</span>
        </div>

        <Button
          href={tool.link}
          target="_blank"
          className="mt-3 rounded-pill w-100"
          variant="outline-primary"
        >
          Visit Tool
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ToolCard;
