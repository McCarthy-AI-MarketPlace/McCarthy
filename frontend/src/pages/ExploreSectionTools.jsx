// src/components/ExploreSectionTools.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import ToolCard from "../components/ToolCard";

const ExploreSectionTools = () => {
  const tools = [
    {
      id: "1",
      name: "WordCraft AI",
      description: "Advanced AI writing assistant for content creation, blogs, and marketing copy.",
      imageUrl: "https://source.unsplash.com/featured/?writing,keyboard",
      category: ["ai-writing", "productivity"],
      rating: 4.8,
      pricing: "Freemium",
      featured: true,
      link: "/tools/1",
    },
    {
      id: "2",
      name: "PixelMind",
      description: "Create stunning images from text descriptions with advanced style controls.",
      imageUrl: "https://source.unsplash.com/featured/?ai,art",
      category: ["image-generation"],
      rating: 4.9,
      pricing: "Freemium",
      featured: true,
      link: "/tools/2",
    },
    {
      id: "3",
      name: "CodeCompanion",
      description: "AI pair programmer that helps write, debug and explain code across languages.",
      imageUrl: "https://source.unsplash.com/featured/?coding,developer",
      category: ["code-assistant", "productivity"],
      rating: 4.7,
      pricing: "Paid",
      featured: false,
      link: "/tools/3",
    },
    {
      id: "4",
      name: "VoiceMorph",
      description: "Transform text to realistic voices in multiple languages and accents.",
      imageUrl: "https://source.unsplash.com/featured/?microphone,audio",
      category: ["voice-generation"],
      rating: 4.5,
      pricing: "Free",
      featured: false,
      link: "/tools/4",
    },
    {
      id: "5",
      name: "DataSynthesis",
      description: "AI-powered data analysis and visualization tool for business intelligence.",
      imageUrl: "https://source.unsplash.com/featured/?data,charts",
      category: ["data-analysis"],
      rating: 4.6,
      pricing: "Enterprise",
      featured: true,
      link: "/tools/5",
    },
    {
      id: "6",
      name: "ConvoBot Builder",
      description: "No-code platform for building advanced AI chatbots for customer service.",
      imageUrl: "https://source.unsplash.com/featured/?chatbot,ai",
      category: ["chatbots"],
      rating: 4.4,
      pricing: "Paid",
      featured: false,
      link: "/tools/6",
    },
    {
      id: "7",
      name: "MotionAI",
      description: "Create professional-quality videos from text prompts and image inputs.",
      imageUrl: "https://source.unsplash.com/featured/?video,ai",
      category: ["video-generation"],
      rating: 4.3,
      pricing: "Paid",
      featured: false,
      link: "/tools/7",
    },
    {
      id: "8",
      name: "IntelliWrite",
      description: "Grammar correction and style improvement assistant for professional writing.",
      imageUrl: "https://source.unsplash.com/featured/?grammar,writing",
      category: ["ai-writing"],
      rating: 4.7,
      pricing: "Freemium",
      featured: false,
      link: "/tools/8",
    },
    {
      id: "9",
      name: "CodeGenius",
      description: "AI code generator and problem solver for developers.",
      imageUrl: "https://source.unsplash.com/featured/?code,ai",
      category: ["code-assistant"],
      rating: 4.8,
      pricing: "Freemium",
      featured: true,
      link: "/tools/9",
    },
    {
      id: "10",
      name: "VoxArtist",
      description: "Turn voice recordings into music and artistic audio compositions.",
      imageUrl: "https://source.unsplash.com/featured/?music,studio",
      category: ["voice-generation"],
      rating: 4.2,
      pricing: "Freemium",
      featured: false,
      link: "/tools/10",
    },
    {
      id: "11",
      name: "ReportGPT",
      description: "Automatic data analysis and report generation for business intelligence.",
      imageUrl: "https://source.unsplash.com/featured/?report,ai",
      category: ["data-analysis", "productivity"],
      rating: 4.5,
      pricing: "Enterprise",
      featured: false,
      link: "/tools/11",
    },
    {
      id: "12",
      name: "ArtisticAI",
      description: "AI art generator with customizable styles and high-resolution outputs.",
      imageUrl: "https://source.unsplash.com/featured/?art,ai",
      category: ["image-generation"],
      rating: 4.6,
      pricing: "Freemium",
      featured: false,
      link: "/tools/12",
    },
  ];

  if (tools.length === 0) {
    return <div className="text-center text-muted mt-5">No tools match your filters.</div>;
  }

  return (
    <Row xs={1} sm={2} md={2} lg={3} className="g-4">
      {tools.map((tool) => (
        <Col key={tool.id}>
          <ToolCard tool={tool} />
        </Col>
      ))}
    </Row>
  );
};

export default ExploreSectionTools;
