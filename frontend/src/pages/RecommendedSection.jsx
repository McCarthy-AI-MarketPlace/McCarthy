import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ToolCard from "../components/ToolCard";


const RecommendedSection = () => {
  const recommendations = [
    {
      id: 1,
      name: "ChatGPT",
      description:
        "Revolutionize interaction, creativity, and innovation with the leader in AI.",
      tags: ["writing generators", "ai chatbots", "education"],
      bookmarkCount: 5332,
      upvoteCount: 2,
      image:
        "https://cdn2.futurepedia.io/0738f08099520811becf578c0761e576f9dedd39-180x180.svg?w=128",
      verified: true,
    },
    {
      id: 2,
      name: "Claude 3",
      description:
        "Revolutionize workflows with AI-driven text, analytics, automation.",
      tags: [" marketing", "ai chatbots", "customer support"],
      bookmarkCount: 203,
      upvoteCount: 1,
      image:
        "https://cdn2.futurepedia.io/b6e50f0d7a55b834bbbc47f7baa3069472eef4b2-512x512.png?w=128",
      verified: true,
    },
    {
      id: 3,
      name: "Perplexity AI",
      description:
        "Deliver Concise , real time ansers with source.Along with links to the sources.",
      tags: ["writing generators", "ai chatbots", "search engine"],
      bookmarkCount: 853,
      upvoteCount: 0,
      image:
        "https://cdn2.futurepedia.io/a453a2e62c4074b53ee009ee907a63180f0a3629-512x512.png?w=128",
      verified: true,
    },
    {
      id: 4,
      name: "Google Gemini",
      description:
        "Multimodal reasoning across text, images, audio, and video.",
      tags: ["writing generators", "ai chatbots", "education"],
      bookmarkCount: 632,
      upvoteCount: 1,
      image:
        "https://cdn2.futurepedia.io/2025-03-25T23-28-06.507Z-6xrSc_MgwlF_Cw5niiayDEGdL9ypt62sI.png?w=128",
      verified: true,
    },
    {
      id: 5,
      name: "Grok 3",
      description:
        "Revolutionize interaction, creativity, and Generate answers, code, and images in real time.",
      tags: ["writing generators", "ai chatbots", "education"],
      bookmarkCount: 45,
      upvoteCount: 1,
      image:
        "https://cdn2.futurepedia.io/0705e9164457282a06df336920794f964b22bd30-225x225.png?w=128",
      verified: true,
    },
    {
      id: 6,
      name: "Leonardo AI",
      description: "Create stunning images and art with AI.",
      tags: ["writing generators", "ai chatbots", "education"],
      bookmarkCount: 300,
      upvoteCount: 2,
      image:
        "https://cdn2.futurepedia.io/8c928e9ebca99cab412fbb34dcaf7f830ba5b534-192x192.svg?w=128",
      verified: true,
    },
    {
      id: 7,
      name: "Gamma AI",
      description: "Create stunning presentations in seconds with AI.",
      tags: ["ppt generators", "ai ppt ouline generator", "education"],
      bookmarkCount: 120,
      upvoteCount: 2,
      image:
        "https://th.bing.com/th/id/ODLS.c406a77f-4533-4a4c-ad64-f4de26d2176d?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2",
      verified: true,
    },
    {
      id: 8,
      name: "Copilot",
      description:
        "Revolutionize interaction and innovation with the leader in AI.",
      tags: ["writing generators", "ai chatbots", "education"],
      bookmarkCount: 500,
      upvoteCount: 1,
      image:
        "https://th.bing.com/th/id/ODLS.5e7e58d4-2d6d-4d41-b9ee-7eefac46b214?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
      verified: true,
    },
    {
      id: 9,
      name: "Napkin AI",
      description: "Create stunning images and art with AI.",
      tags: ["diagram & flowchart generator", "ai chatbots", "education"],
      bookmarkCount: 200,
      upvoteCount: 0,
      image:
        "https://th.bing.com/th/id/ODLS.e0438ca4-1818-4a49-96bc-4013b5dd3d5f?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2",
      verified: true,
    },
  ];

  return (
    <div style={{ padding: "2rem 0" }}>
      <Container>
        <h2 className="fw-bold text-black mb-4">Discover tools here... </h2>
        <Row className="g-4">
          {recommendations.map((tool) => (
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
