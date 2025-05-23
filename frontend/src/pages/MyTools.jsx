import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";

const MyTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId: paramUserId } = useParams(); 
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (paramUserId && !currentUser.data.isSuperAdmin) {
      navigate("/"); 
    }
  }, [paramUserId, currentUser, navigate]);

  const userId = paramUserId || currentUser.data._id; 

  const fetchTools = async () => {
    try {
      if (paramUserId && !currentUser.data.isSuperAdmin) {
        navigate("/");
        return;
      }

      const res = await axios.get(`/api/tool/my-tools/${userId}`);
      setTools(res.data.data);
    } catch (err) {
      console.error("Error fetching tools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, [userId]);

  return (
    <Container style={{ marginTop: "5rem" }}>
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
                    onClick={() => navigate(`/edit-tool/${tool._id}`)}
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
