import React from "react";
import { Container, Row, Col, DropdownButton, Dropdown, Button, Card } from "react-bootstrap";
import { FaBookmark, FaThumbsUp } from "react-icons/fa";

const tools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Revolutionize interaction, creativity, and innovation with the leader in AI.",
    tags: ["writing generators", "ai chatbots", "education"],
    bookmarkCount: 5332,
    upvoteCount: 2,
    image: "https://cdn2.futurepedia.io/0738f08099520811becf578c0761e576f9dedd39-180x180.svg?w=128",
    verified: true,
  },
  {
    id: 2,
    name: "Claude 3",
    description: "Revolutionize workflows with AI-driven text, analytics, automation.",
    tags: ["marketing", "ai chatbots", "customer support"],
    bookmarkCount: 203,
    upvoteCount: 1,
    image: "https://cdn2.futurepedia.io/b6e50f0d7a55b834bbbc47f7baa3069472eef4b2-512x512.png?w=128",
    verified: true,
  },
];



const RightSidebar = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Showing {tools.length} tools</span>
        <DropdownButton id="dropdown-basic-button" title="Sort by: Most Popular">
          <Dropdown.Item href="#">Most Popular</Dropdown.Item>
          <Dropdown.Item href="#">Recently Added</Dropdown.Item>
          <Dropdown.Item href="#">Highest Rated</Dropdown.Item>
        </DropdownButton>
      </div>
      <Row className="g-4">
        {tools.map((tool) => (
          <Col key={tool.id} xs={12} sm={4} lg={4}>
            <ToolCard tool={tool} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RightSidebar;
