import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ToolCard from "../components/ToolCard";

const RecommendedSection = () => {
  const recommendations = [
    {
      id: 1,
      name: "ChatGPT",
      description: "Revolutionize interaction, creativity, and innovation with the leader in AI.",
      tags: ["Chatbot", "Writing", "Content Creation"],
      image: "https://cdn2.futurepedia.io/0738f08099520811becf578c0761e576f9dedd39-180x180.svg?w=128",
      verified: true,
      url: "https://chat.openai.com/",
    },
    {
      id: 2,
      name: "DALL-E",
      description: "Create realistic images and art from natural language descriptions.",
      tags: ["Image Generation", "Art", "Design"],
      image: "https://cdn2.futurepedia.io/b6e50f0d7a55b834bbbc47f7baa3069472eef4b2-512x512.png?w=128",
      verified: true,
      url: "https://openai.com/dall-e",
    },
    {
      id: 3,
      name: "Midjourney",
      description: "Generate beautiful, detailed images from text prompts for illustration and concept art.",
      tags: ["Image Generation", "Art", "Design"],
      image: "https://cdn2.futurepedia.io/a453a2e62c4074b53ee009ee907a63180f0a3629-512x512.png?w=128",
      verified: true,
      url: "https://www.midjourney.com/",
    },
    {
      id: 4,
      name: "Leonardo AI",
      description: "Create stunning images and art with AI.",
      tags: ["Art", "Design", "AI Tools"],
      image: "https://cdn2.futurepedia.io/8c928e9ebca99cab412fbb34dcaf7f830ba5b534-192x192.svg?w=128",
      verified: true,
      url: "https://leonardo.ai/",
    },
    {
      id: 5,
      name: "Gamma AI",
      description: "Create stunning presentations in seconds with AI.",
      tags: ["Presentations", "AI Tools", "Education"],
      image: "https://th.bing.com/th/id/ODLS.c406a77f-4533-4a4c-ad64-f4de26d2176d?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2",
      verified: true,
      url: "https://gamma.app/",
    },
    {
      id: 6,
      name: "Copilot",
      description: "Revolutionize interaction and innovation with the leader in AI.",
      tags: ["Productivity", "Coding", "Writing"],
      image: "https://th.bing.com/th/id/ODLS.5e7e58d4-2d6d-4d41-b9ee-7eefac46b214?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
      verified: true,
      url: "https://copilot.microsoft.com/",
    },
  ];

  return (
    <div style={{ padding: "2rem 0" }}>
      <Container>
        <h2 className="fw-bold text-black mb-4">Discover tools here...</h2>
        <Row className="g-4">
          {recommendations.slice(0, 6).map((tool) => (
            <Col key={tool.id} xs={12} sm={6} lg={4}>
              <ToolCard tool={tool} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecommendedSection;
