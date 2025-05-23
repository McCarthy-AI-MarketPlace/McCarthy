import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaHeart,
  FaPlus,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa"; 
export default function Home() {
  const trendingTools = [
    {
      name: "ChatGPT",
      rating: 4.8,
      status: "Popular",
      description:
        "Advanced AI chatbot that can understand complex prompts and generate human-like text.",
      tags: ["Chatbot", "Writing", "Content Creation"],
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png", 
    },
    {
      name: "DALL-E",
      rating: 4.7,
      status: "Popular",
      description:
        "Create realistic images and art from natural language descriptions.",
      tags: ["Image Generation", "Art", "Design"],
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/DALL-E_logo.svg/1024px-DALL-E_logo.svg.png", 
    },
    {
      name: "Midjourney",
      rating: 4.9,
      status: "Popular",
      description:
        "Generate beautiful, detailed images from text prompts for illustration and concept art.",
      tags: ["Image Generation", "Art", "Design"],
      icon: "https://www.midjourney.com/assets/logo.png", 
    },
    {
      name: "Copy.ai",
      rating: 4.5,
      status: "New",
      description:
        "Create marketing copy, content, and ideas for your business in seconds.",
      tags: ["Copywriting", "Marketing", "Content"],
      icon: "https://global-uploads.webflow.com/62c0b490483c6c0964a2c510/62d985fc6f7f6314f8a9a463_favicon.png", 
    },
    {
      name: "Murf.ai",
      rating: 4.3,
      status: "",
      description:
        "Convert text to natural-sounding speech with AI voices for videos and presentations.",
      tags: ["Voice", "Audio", "Text-to-Speech"],
      icon: "https://assets-global.website-files.com/618210332d787d55bfb200d7/6477e69c762512a20b925b41_murf-logo.svg", 
    },
    {
      name: "GitHub Copilot",
      rating: 4.6,
      status: "Popular",
      description:
        "AI pair programmer that helps you write better code by suggesting code snippets.",
      tags: ["Code", "Development", "Productivity"],
      icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", 
    },
  ];
  const categories = [
    { name: "Text Generation", tools: 156 },
    { name: "Image Generation", tools: 87 },
    { name: "Voice Generation", tools: 42 },
    { name: "Video Generation", tools: 35 },
    { name: "Code Generation", tools: 28 },
    { name: "Data Analysis", tools: 63 },
  ];
  const primaryColor = "#5F2EEA";
  const primaryLight = "#9369DA ";
  const textColor = "#6A6A80";
  const backgroundColor = "#F8F8FC";
  const cardBackgroundColor = "#FFFFFF";
  const fontFamily = "Poppins, sans-serif"; 
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        marginTop:"3rem",
        justifyContent: "space-between",
        color: "#000",
        fontFamily: fontFamily,
        position: "relative",
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="py-5 text-center d-flex align-items-center"
        style={{
          background: `linear-gradient(180deg,rgb(232, 226, 251) 30%, rgb(223, 231, 251) 100%)`, 
          minHeight: "70vh",
          paddingTop: "8vh", 
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: primaryColor, fontSize: "3.5rem" }}
              >
                There's an AI for Everything. <br /> Find it. Use it. Instantly.
              </h1>
              <p
                className="lead mb-5"
                style={{ color: textColor, fontSize: "1.25rem" }}
              >
                McCarthy is your one-stop marketplace to discover, compare, and
                use the best AI tools for any task.
              </p>
              <InputGroup
                className="mb-4 shadow mx-auto rounded-pill" 
                style={{ maxWidth: "600px", overflow: "hidden" }}
              >
                <InputGroup.Text
                  style={{
                    backgroundColor: cardBackgroundColor,
                    border: "none", 
                    borderRight: "1px solid #E0E0E0", 
                    paddingLeft: "15px",
                  }}
                >
                  <FaSearch style={{ color: textColor }} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search for AI tools (e.g., image generator, text to speech)"
                  aria-label="Search"
                  style={{ border: "none", boxShadow: "none" }} 
                />
                <Dropdown as={InputGroup.Append}>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-filters"
                    style={{
                      backgroundColor: cardBackgroundColor,
                      border: "none", 
                      borderLeft: "1px solid #E0E0E0", 
                      color: textColor,
                      zIndex: 0,
                    }}
                  >
                    <FaFilter className="me-2" /> Filters
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Category</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Pricing</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  style={{
                    backgroundColor: "#7646C3",
                    borderColor: "#7646C3",
                    borderRadius: "0",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    zIndex: 0,
                  }}
                >
                  Search
                </Button>
              </InputGroup>
              <Button
                style={{
                  backgroundColor: "#7646C3",
                  borderColor: primaryLight,
                  padding: "12px 30px",
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(147, 105, 218)", 
                }}
                className="mt-3 rounded-pill" 
              >
                Search &rarr;
              </Button>
              <div className="d-flex justify-content-center mt-5 gap-3">
                {["C", "M", "C", "D", "G"].map((letter, index) => (
                  <div
                    key={index}
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: cardBackgroundColor,
                      border: `1px solid #E0E0E0`,
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="text-center my-5 py-5">
        <h2
          className="fw-bold mb-3"
          style={{ color: "black", fontSize: "2.0rem" }}
        >
          How McCarthy Works
        </h2>
        <p className="lead mb-5" style={{ color: textColor }}>
          Discover, compare, and use AI tools without the hassle of switching
          between websites.
        </p>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm border-0 rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <div className="mb-3">
                  <FaSearch
                    size={40}
                    style={{
                      color: primaryLight,
                      backgroundColor: "#F0F0FF",
                      padding: "10px",
                      borderRadius: "12px",
                    }} 
                  />
                </div>
                <h5 className="fw-bold" style={{ color: "#333333" }}>
                  Search & Discover
                </h5>
                <p className="text-muted">
                  Explore our curated collection of AI tools categorized by use
                  case and functionality.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm border-0 rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <div className="mb-3">
                  <FaLightbulb
                    size={40}
                    style={{
                      color: "#FFD700",
                      backgroundColor: "#FFFBEB",
                      padding: "10px",
                      borderRadius: "12px",
                    }} 
                  />
                </div>
                <h5 className="fw-bold" style={{ color: "#333333" }}>
                  Compare & Choose
                </h5>
                <p className="text-muted">
                  Read reviews, compare features, and find the perfect AI tool
                  for your specific needs.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-sm border-0 rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <div className="mb-3">
                  <FaRocket
                    size={40}
                    style={{
                      color: "#FF6347",
                      backgroundColor: "#FFEEEA",
                      padding: "10px",
                      borderRadius: "12px",
                    }} 
                  />
                </div>
                <h5 className="fw-bold" style={{ color: "#333333" }}>
                  Use Instantly
                </h5>
                <p className="text-muted">
                  Launch tools directly from McCarthy and start creating without
                  any setup required.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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
          >
            View all tools &rarr;
          </Button>
        </div>
        <Row>
          {trendingTools.map((tool, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card
                className="h-100 shadow-sm border-0 rounded-4 p-3"
                style={{ backgroundColor: "cardBackgroundColor" }}
              >
                {" "}
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "15px",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      <Card.Title
                        className="mb-0 fw-bold"
                        style={{ color: "#333333" }}
                      >
                        {tool.name}
                      </Card.Title>
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={14}
                            color={
                              i < Math.floor(tool.rating)
                                ? "#FFD700"
                                : "#E0E0E0"
                            }
                            className="me-1"
                          />
                        ))}
                        <span
                          className="ms-1"
                          style={{ fontSize: "0.9rem", color: "textColor" }}
                        >
                          {tool.rating}
                        </span>
                        {tool.status && (
                          <span
                            className="badge ms-2"
                            style={{
                              backgroundColor: "#E0F7FA",
                              color: "#007B8C",
                              fontWeight: "normal",
                            }}
                          >
                            {tool.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Card.Text className="text-muted mb-3">
                    {tool.description}
                  </Card.Text>
                  <div className="mb-3">
                    {tool.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="badge me-2 mb-2 rounded-pill" 
                        style={{
                          backgroundColor: "#F0F0FF",
                          color: "#7646C3",
                          fontWeight: "Medium",
                          padding: "8px 12px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      style={{
                        backgroundColor: "#7646C3",
                        borderColor: primaryLight,
                        borderRadius: "8px",
                        padding: "8px 20px",
                        boxShadow: "0 2px 5px rgba(138, 94, 253, 0.7)", 
                      }}
                      className="rounded-pill" 
                    >
                      Use Now
                    </Button>
                    <div className="d-flex gap-2">
                      <Button
                        variant="light"
                        className="rounded-circle d-flex justify-content-center align-items-center shadow-sm" 
                        style={{
                          width: "38px",
                          height: "38px",
                          border: `1px solid #E0E0E0`,
                          color: textColor,
                          backgroundColor: cardBackgroundColor,
                        }}
                      >
                        <FaHeart />
                      </Button>
                      <Button
                        variant="light"
                        className="rounded-circle d-flex justify-content-center align-items-center shadow-sm" 
                        style={{
                          width: "38px",
                          height: "38px",
                          border: `1px solid #E0E0E0`,
                          color: textColor,
                          backgroundColor: cardBackgroundColor,
                        }}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="my-5 py-5 text-center">
        <h2
          className="fw-bold mb-3"
          style={{ color: "black", fontSize: "2.5rem" }}
        >
          Browse by Category
        </h2>
        <p className="lead mb-5" style={{ color: textColor }}>
          Find the perfect AI tool for your specific needs.
        </p>
        <Row className="justify-content-center g-4">
          {categories.map((category, index) => (
            <Col xs={6} sm={4} lg={2} className="mb-3" key={index}>
              <Card
                className="h-100 border-0 shadow-sm rounded-4 d-flex flex-column justify-content-center align-items-center p-3" 
                style={{
                  minHeight: "150px",
                  backgroundColor: cardBackgroundColor,
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  {category.name === "Text Generation" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/document.png"
                      alt="Text Generation"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {category.name === "Image Generation" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/image.png"
                      alt="Image Generation"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {category.name === "Voice Generation" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/microphone.png"
                      alt="Voice Generation"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {category.name === "Video Generation" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/video-camera.png"
                      alt="Video Generation"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {category.name === "Code Generation" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/code.png"
                      alt="Code Generation"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {category.name === "Data Analysis" && (
                    <img
                      src="https://img.icons8.com/ios-filled/50/data-transfer.png"
                      alt="Data Analysis"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <p className="fw-semibold mb-1" style={{ color: "#333333" }}>
                    {category.name}
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                    {category.tools} tools
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="my-5 py-5 text-center">
        <h2
          className="fw-bold mb-3"
          style={{ color: "black", fontSize: "2.3rem" }}
        >
          Why McCarthy?
        </h2>
        <p className="lead mb-5" style={{ color: textColor }}>
          We're not just a directory – we're your AI tool companion.
        </p>
        <Row className="justify-content-center g-4">
          <Col md={3}>
            <Card
              className="h-100 border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <h5 className="fw-bold mb-2" style={{ color: "#333333" }}>
                  All in One Place
                </h5>
                <p className="text-muted">
                  Access hundreds of AI tools without switching between
                  websites.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100 border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <h5 className="fw-bold mb-2" style={{ color: "#333333" }}>
                  User Privacy First
                </h5>
                <p className="text-muted">
                  Transparent data policies so you know exactly what information
                  is shared.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100 border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <h5 className="fw-bold mb-2" style={{ color: "#333333" }}>
                  Expert Curation
                </h5>
                <p className="text-muted">
                  Our team tests and reviews tools to ensure quality and
                  usefulness.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="h-100 border-0 shadow-sm rounded-4 p-3"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              {" "}
              <Card.Body>
                <h5 className="fw-bold mb-2" style={{ color: "#333333" }}>
                  Personalized Recommendations
                </h5>
                <p className="text-muted">
                  Get AI tool suggestions based on your usage patterns and
                  preferences.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div
        className="text-white text-center py-5 mb-5 rounded-4 mx-auto" 
        style={{
          background: "linear-gradient(90deg, #8A5EFD 0%, #5F2EEA 100%)", 
          maxWidth: "80%",
          padding: "60px 0",
          boxShadow: "0 10px 20px rgba(95, 46, 234, 0.3)", 
        }}
      >
        <Container>
          <h2 className="fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
            Ready to enhance your workflow with AI?
          </h2>
          <p className="mb-5" style={{ fontSize: "1.1rem" }}>
            Start exploring the world's best AI tools curated just for you.
          </p>
          <Button
            variant="light"
            size="lg"
            style={{
              backgroundColor: "white",
              borderColor: "white",
              color: "black",
              borderRadius: "8px",
              padding: "12px 40px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", 
            }}
            className="rounded-pill"
          >
            Explore AI Tools &rarr;
          </Button>
        </Container>
      </div>
    </div>
  );
}
