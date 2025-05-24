import React, { useState, useEffect } from "react";
import { Container, Row, Button, Nav } from "react-bootstrap";
import { Heart, Clock, List, Gear } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import ToolCard from "../components/ToolCard";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Favorites");

  const { currentUser } = useSelector((state) => state.user);
  const [favoriteToolIds, setFavoriteToolIds] = useState(
    currentUser.data.favoriteTools || []
  );
  const [favoriteTools, setFavoriteTools] = useState([]);

  useEffect(() => {
    setFavoriteToolIds(currentUser.data.favoriteTools || []);
  }, [currentUser]);

  useEffect(() => {
    const fetchFavoriteTools = async () => {
      if (!favoriteToolIds?.length) {
        setFavoriteTools([]);
        return;
      }

      const fetchedTools = [];

      for (const toolId of favoriteToolIds) {
        try {
          const response = await axios.get(`/api/tool/${toolId}`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });

          const tool = response.data.data;
          fetchedTools.push({
            _id: tool._id,
            icon:
              tool.image || "https://placehold.co/40x40/E0E0E0/333333?text=AI",
            name: tool.title,
            description: tool.description,
            tags: tool.hashtags,
            toolUrl: tool.toolUrl,
          });
        } catch (error) {
          console.error("Error fetching tool:", toolId, error);
        }
      }

      setFavoriteTools(fetchedTools);
    };

    fetchFavoriteTools();
  }, [favoriteToolIds]);

  const handleFavoriteChange = (updatedIds) => {
    setFavoriteToolIds(updatedIds);
  };

  return (
    <>
      <style>{`
        .custom-nav .nav-link {
          color: #6c757d;
          border-radius: 999px;
        }

        .custom-nav .nav-link.active {
          background-color: #B58AC5 !important;
          color: white !important;
        }
      `}</style>

      <Container
        fluid
        className="min-vh-100 p-5 mt-5"
        style={{ backgroundColor: "#fff" }}
      >
        <h2 className="fw-bold mb-1">Your Dashboard</h2>
        <p className="text-muted mb-4">
          Manage your favorite tools, recently used, and playlists
        </p>

        <Nav
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 gap-2 flex-wrap custom-nav"
        >
          <Nav.Item>
            <Nav.Link eventKey="Favorites">
              <Heart className="me-1" />
              Favorites
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="Recently Used">
              <Clock className="me-1" />
              Recently Used
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="AI Playlists">
              <List className="me-1" />
              AI Playlists
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === "Favorites" && (
          <>
            <h5 className="fw-semibold mb-3">Your Favorite Tools</h5>

            <Row xs={1} md={3} className="g-4">
              {favoriteTools.map((tool) => (
                <ToolCard
                  key={tool._id}
                  tool={tool}
                  favoriteTools={favoriteToolIds}
                  setFavoriteTools={handleFavoriteChange}
                />
              ))}
            </Row>
          </>
        )}

        {activeTab === "Recently Used" && (
          <>
            <h5 className="fw-semibold mb-3">Recently Used Tools</h5>
            {/* Add your recently used tool UI here */}
          </>
        )}

        {activeTab === "AI Playlists" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold mb-0">Your AI Playlists</h5>

              <Button
                className="rounded-pill px-3"
                style={{ backgroundColor: "#B58AC5", border: "none" }}
              >
                Create New Playlist
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
