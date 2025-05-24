import { Container, Row,  Button } from "react-bootstrap";

import ToolCard from "./ToolCard";

export default function ToolList({ tools }) {
 
  const trendingTools = tools.slice(0, 12).map((tool) => ({
    _id: tool._id,
    icon: tool.image || "https://placehold.co/40x40/E0E0E0/333333?text=AI",
    name: tool.title,
    description: tool.description,
    tags: tool.hashtags,
    toolUrl: tool.toolUrl,
  }));

  return (
    <Container className="my-5 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold"
          style={{ color: "#7646C3", fontSize: "2.5rem" }}
        >
          Top Trending Tools
        </h2>
        <Button
          variant="link"
          style={{ color: "#9369DA", textDecoration: "none" }}
          href="/explore"
        >
          View all tools &rarr;
        </Button>
      </div>

      <Row>
        {trendingTools.map((tool, index) => (
            <ToolCard tool={tool} key={index}/>
        ))}
      </Row>
    </Container>
  );
}
