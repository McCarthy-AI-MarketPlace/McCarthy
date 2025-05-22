import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FaStar, FaRegHeart, FaPlus } from "react-icons/fa";

const ToolCard = ({ tool }) => {
  const openTool = () => {
    window.open(tool.url, "_blank");
  };

  const styles = {
    card: {
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    },
    useNowBtn: {
      backgroundColor: "#8e5efc",
      border: "none",
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    useNowBtnHover: {
      backgroundColor: "#734fd9",
      transform: "scale(1.03)",
    },
    tag: {
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: "#f8f9fa",
      color: "#000",
    },
    tagHover: {
      backgroundColor: "#8e5efc",
      color: "#fff",
    },
    iconBtn: {
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    iconBtnHover: {
      backgroundColor: "#efefef",
      transform: "scale(1.1)",
    },
  };

  // State for hover effects
  const [hover, setHover] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);
  const [tagHoverIndex, setTagHoverIndex] = React.useState(null);
  const [iconHoverIndex, setIconHoverIndex] = React.useState(null);

  return (
    <Card
      className="h-100 shadow-sm rounded-4 p-3 border-0"
      style={hover ? { ...styles.card, ...styles.cardHover } : styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="d-flex align-items-center mb-3" onClick={openTool}>
        <img
          src={tool.image}
          alt={tool.name}
          className="me-3"
          style={{
            width: 48,
            height: 48,
            borderRadius: "0.75rem",
            objectFit: "cover",
          }}
        />
        <div>
          <div className="d-flex align-items-center mb-1">
            <h5 className="mb-0 me-2 fw-semibold">{tool.name}</h5>
            <Badge bg="warning" text="dark" className="rounded-pill px-2">
              Popular
            </Badge>
          </div>
          <div className="d-flex align-items-center text-warning small">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} />
            ))}
            <span className="text-muted ms-2">
              {(4 + Math.random()).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <Card.Text className="text-muted" style={{ minHeight: "60px" }}>
        {tool.description}
      </Card.Text>

      <div className="mb-3 d-flex flex-wrap gap-2">
        {tool.tags.slice(0, 3).map((tag, idx) => (
          <Badge
            key={idx}
            pill
            bg="light"
            text="dark"
            className="px-3 py-2 fw-medium"
            style={
              tagHoverIndex === idx
                ? { ...styles.tag, ...styles.tagHover }
                : styles.tag
            }
            onMouseEnter={() => setTagHoverIndex(idx)}
            onMouseLeave={() => setTagHoverIndex(null)}
            onClick={openTool}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-auto">
        <Button
          variant="primary"
          className="rounded-pill px-4 w-75"
          style={btnHover ? { ...styles.useNowBtn, ...styles.useNowBtnHover } : styles.useNowBtn}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={openTool}
        >
          Use Now
        </Button>

        <div className="d-flex gap-2 ms-3">
          {[FaRegHeart, FaPlus].map((Icon, idx) => (
            <Button
              key={idx}
              variant="light"
              className="rounded-circle border"
              style={
                iconHoverIndex === idx
                  ? { ...styles.iconBtn, ...styles.iconBtnHover }
                  : styles.iconBtn
              }
              onMouseEnter={() => setIconHoverIndex(idx)}
              onMouseLeave={() => setIconHoverIndex(null)}
              onClick={openTool}
            >
              <Icon />
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
