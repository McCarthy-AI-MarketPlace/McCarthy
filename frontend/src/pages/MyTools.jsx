import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const fetchTools = async () => {
    try {
      const res = await axios.get(
        `/api/tool/my-tools/${currentUser.data._id}`,
        {}
      );
      // console.log(res);
      setTools(res.data.data);
    } catch (err) {
      console.error("Error fetching tools:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTool = async (id) => {
    try {
      console.log(currentUser.data._id);
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`/api/tool/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete tool");
      }

      fetchTools();
    } catch (err) {
      alert(err.message);
    }
  };

  const editTool = (id) => {
    navigate(`/edit-tool/${id}`);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <Container style={{marginTop: "5rem"}}>
      <h2 className="text-center mb-4">My Published Tools</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center">
          <p>No tools found. Start publishing your tools!</p>
        </div>
      ) : (
        <Row>
          {tools.map((tool) => (
            <Col md={6} lg={4} key={tool._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={tool.image} alt={tool.title} />
                <Card.Body>
                  <Card.Title>{tool.title}</Card.Title>
                  <Card.Text>{tool.description}</Card.Text>

                  <div className="mb-2">
                    {tool.hashtags.map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    href={tool.toolUrl}
                    target="_blank"
                    className="me-2"
                  >
                    Visit
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => editTool(tool._id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteTool(tool._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyTools;
