import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatInterface = () => {
  const { toolId } = useParams();
  const [tool, setTool] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const chatRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get(`/api/tool/${toolId}`);
        setTool(res.data.data);
      } catch (err) {
        console.error("Failed to fetch tool", err);
      }
    };

    fetchTool();
  }, [toolId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    console.log(currentUser);
    try {
      const res = await axios.post(
        "/api/chat",
        {
          prompt: input,
          toolId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": currentUser.data._id,
            "X-Session-Id": sessionId,
          },
        }
      );

      const aiMessage = res.data?.data?.response || "No response received.";
      setSessionId(res.data?.data?.sessionId);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error during chat:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ AI error or bad configuration.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Container
      fluid
      className="p-4 mt-4 d-flex justify-content-center"
      style={{ backgroundColor: "#f3f0ff", minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg w-100"
        style={{
          maxWidth: "900px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <Card.Header
          className="d-flex align-items-center px-4 py-3 border-0"
          style={{
            background: "linear-gradient(to right, #e6e0f8, #f6f0ff)",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <div>
            <h5 className="mb-1 fw-bold text-dark">
              {tool?.title || "Loading Tool..."}
            </h5>
            <small className="text-muted">{tool?.subtitle}</small>
          </div>
        </Card.Header>

        <Card.Body
          ref={chatRef}
          className="px-4 py-3"
          style={{
            height: "70vh",
            overflowY: "auto",
            backgroundColor: "#f6f0ff",
            borderBottom: "2px solid #e2d9f3",
          }}
        >
          {messages.map((msg, index) => (
            <Row
              key={index}
              className="mb-3"
              style={{
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Col xs={10} md={8}>
                <div
                  className={`p-3 rounded-4 shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                  }}
                >
                  {msg.content}
                </div>
              </Col>
            </Row>
          ))}
          {loading && (
            <Row className="mb-2">
              <Col xs={12} className="d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" variant="secondary" />
                <span className="text-muted">Typing...</span>
              </Col>
            </Row>
          )}
        </Card.Body>

        <Card.Footer
          className="px-4 py-3 border-0"
          style={{
            backgroundColor: "#eae4ff",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="g-3 align-items-center">
              <Col xs={10}>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Type your message..."
                  className="rounded-pill px-4 py-2 shadow-sm border border-secondary"
                  style={{ resize: "none", backgroundColor: "#fdfcff" }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Col>
              <Col xs={2} className="text-end">
                <Button
                  variant="secondary"
                  className="w-100 rounded-pill py-2 shadow-sm fw-semibold"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatInterface;
