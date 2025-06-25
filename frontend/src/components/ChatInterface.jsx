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

const ChatInterface = () => {
  const { toolId } = useParams();
  const [tool, setTool] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef();

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get(`/api/tool/${toolId}`, {});
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
          },
        }
      );

      const aiMessage = {
        role: "assistant",
        content:
          res.data?.data?.response?.parts?.[0]?.text || "No response received.",
      };

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
    <Container fluid className="p-4 mt-5" style={{ maxWidth: "900px" }}>
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex align-items-center">
          <div>
            <h5 className="mb-1">{tool?.title || "Loading Tool..."}</h5>
            <small className="text-muted">{tool?.subtitle}</small>
          </div>
        </Card.Header>

        <Card.Body
          style={{
            height: "70vh",
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
          }}
          ref={chatRef}
        >
          {messages.map((msg, index) => (
            <Row
              key={index}
              className="mb-3"
              style={{
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Col xs={10}>
                <div
                  style={{
                    background: msg.role === "user" ? "#d0ebff" : "#e9ecef",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </Col>
            </Row>
          ))}
          {loading && (
            <Row>
              <Col xs={12}>
                <Spinner animation="border" size="sm" className="me-2" />
                Typing...
              </Col>
            </Row>
          )}
        </Card.Body>

        <Card.Footer className="bg-white">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row className="align-items-center">
              <Col xs={10}>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ resize: "none" }}
                />
              </Col>
              <Col xs={2} className="text-end">
                <Button
                  variant="primary"
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
