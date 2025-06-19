import React, { useEffect, useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
  InputGroup,
  Badge,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [allUsers, setAllUsers] = useState([]);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/all", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          withCredentials: true,
        });
        setAllUsers(res.data.data);
        setUsers(res.data.data.slice(0, usersPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        toast.error("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const handleToggleAdmin = async (userId) => {
    try {
      await axios.put(
        "/api/user/toggle-admin",
        { userId },
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          withCredentials: true,
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
      setAllUsers(
        allUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
      toast.success("Admin status updated successfully");
    } catch (error) {
      toast.error("Failed to update admin status");
    }
  };

  const handleViewTools = async (userId) => {
    navigate(`/my-tools/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await axios.delete(`/api/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
      setAllUsers(allUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTools([]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const startIdx = nextPage * usersPerPage - usersPerPage;
    const newUsers = allUsers.slice(startIdx, nextPage * usersPerPage);
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    if (nextPage * usersPerPage >= allUsers.length) {
      setHasMoreUsers(false);
    }
  };

  const filteredUsers = allUsers
    .filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isAdmin === b.isAdmin) return 0;
      return a.isAdmin ? -1 : 1;
    });

  const usersToDisplay = filteredUsers.slice(0, currentPage * usersPerPage);

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
          <div style={{ marginTop: "1rem", color: "#6c757d" }}>
            Loading users...
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container fluid>
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div
              style={{
                marginTop: "3rem",
                background: "linear-gradient(90deg, #7b2ff7 0%, #4facfe 100%)",
                borderRadius: "12px",
                padding: "2rem",
                color: "white",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                User Management
              </h1>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "0",
                  opacity: "0.9",
                  fontSize: "1.1rem",
                }}
              >
                Manage users and administrative permissions
              </p>
            </div>
          </Col>
        </Row>

        {/* Search and Stats Section */}
        <Row className="mb-4">
          <Col lg={8}>
            <Card
              style={{
                border: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <Form.Group>
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#495057",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Search Users
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#e9ecef",
                        border: "1px solid #ced4da",
                      }}
                    >
                      <i
                        className="fas fa-search"
                        style={{ color: "#6c757d" }}
                      ></i>
                      <MdOutlinePersonSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{
                        border: "1px solid #ced4da",
                        fontSize: "0.95rem",
                      }}
                    />
                  </InputGroup>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card
              style={{
                border: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "#495057",
                      marginBottom: "0.5rem",
                      fontSize: "1.75rem",
                      fontWeight: "700",
                    }}
                  >
                    {filteredUsers.length}
                  </h3>
                  <p
                    style={{
                      color: "#6c757d",
                      marginBottom: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    Total Users Found
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Users Table Section */}
        <Row>
          <Col>
            <Card
              style={{
                border: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                borderRadius: "12px",
              }}
            >
              <Card.Header
                style={{
                  backgroundColor: "white",
                  borderBottom: "1px solid #e9ecef",
                  borderRadius: "12px 12px 0 0",
                  padding: "1.25rem",
                }}
              >
                <h5
                  style={{
                    marginBottom: "0",
                    color: "#495057",
                    fontWeight: "600",
                  }}
                >
                  All Users ({usersToDisplay.length})
                </h5>
              </Card.Header>
              <Card.Body style={{ padding: "0" }}>
                {usersToDisplay.length > 0 ? (
                  <Table
                    responsive
                    hover
                    style={{
                      marginBottom: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "2px solid #e9ecef",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            padding: "1rem",
                            fontWeight: "600",
                            color: "#495057",
                            border: "none",
                          }}
                        >
                          User
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            fontWeight: "600",
                            color: "#495057",
                            border: "none",
                          }}
                        >
                          Email
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            fontWeight: "600",
                            color: "#495057",
                            border: "none",
                            textAlign: "center",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            padding: "1rem",
                            fontWeight: "600",
                            color: "#495057",
                            border: "none",
                            textAlign: "center",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersToDisplay.map((user, index) => (
                        <tr
                          key={user._id}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#fafbfc",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <td
                            style={{
                              padding: "1rem",
                              verticalAlign: "middle",
                              border: "none",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={user.avatar || "/default-avatar.png"}
                                alt="User Avatar"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "50%",
                                  marginRight: "12px",
                                  objectFit: "cover",
                                  border: "2px solid #e9ecef",
                                }}
                              />
                              <div>
                                <div
                                  style={{
                                    fontWeight: "600",
                                    color: "#495057",
                                    marginBottom: "2px",
                                  }}
                                >
                                  {user.fullName}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#6c757d",
                                  }}
                                >
                                  User ID: {user._id.slice(-6)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              verticalAlign: "middle",
                              border: "none",
                            }}
                          >
                            <div style={{ color: "#495057" }}>{user.email}</div>
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              verticalAlign: "middle",
                              textAlign: "center",
                              border: "none",
                            }}
                          >
                            <Badge
                              bg={user.isAdmin ? "success" : "secondary"}
                              style={{
                                padding: "0.5rem 0.75rem",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                              }}
                            >
                              {user.isAdmin ? "Admin" : "User"}
                            </Badge>
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              verticalAlign: "middle",
                              textAlign: "center",
                              border: "none",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                variant={
                                  user.isAdmin
                                    ? "outline-warning"
                                    : "outline-success"
                                }
                                size="sm"
                                onClick={() => handleToggleAdmin(user._id)}
                                style={{
                                  borderRadius: "6px",
                                  fontWeight: "500",
                                  fontSize: "0.8rem",
                                  padding: "0.375rem 0.75rem",
                                }}
                              >
                                {user.isAdmin ? "Remove Admin" : "Make Admin"}
                              </Button>
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => handleViewTools(user._id)}
                                style={{
                                  borderRadius: "6px",
                                  fontWeight: "500",
                                  fontSize: "0.8rem",
                                  padding: "0.375rem 0.75rem",
                                }}
                              >
                                View Tools
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteUser(user._id)}
                                style={{
                                  borderRadius: "6px",
                                  fontWeight: "500",
                                  fontSize: "0.8rem",
                                  padding: "0.375rem 0.75rem",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div
                    style={{
                      padding: "3rem",
                      textAlign: "center",
                      color: "#6c757d",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                      👥
                    </div>
                    <h5 style={{ marginBottom: "0.5rem" }}>No users found</h5>
                    <p style={{ marginBottom: "0" }}>
                      {searchQuery
                        ? "Try adjusting your search criteria"
                        : "No users available"}
                    </p>
                  </div>
                )}
              </Card.Body>

              {hasMoreUsers && usersToDisplay.length > 0 && (
                <Card.Footer
                  style={{
                    backgroundColor: "#f8f9fa",
                    textAlign: "center",
                    borderTop: "1px solid #e9ecef",
                    padding: "1.25rem",
                  }}
                >
                  <Button
                    onClick={handleLoadMore}
                    variant="primary"
                    style={{
                      borderRadius: "8px",
                      fontWeight: "500",
                      padding: "0.75rem 2rem",
                      boxShadow: "0 2px 8px rgba(0,123,255,0.3)",
                    }}
                  >
                    Load More Users
                  </Button>
                </Card.Footer>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Tools Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <Modal.Title
            style={{
              fontWeight: "600",
              color: "#495057",
            }}
          >
            Tools Published by User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0" }}>
          {tools.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#6c757d",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔧</div>
              <h6>No tools found for this user</h6>
            </div>
          ) : (
            <Table hover style={{ marginBottom: "0" }}>
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th
                    style={{
                      padding: "1rem",
                      fontWeight: "600",
                      color: "#495057",
                      border: "none",
                    }}
                  >
                    Tool Name
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      fontWeight: "600",
                      color: "#495057",
                      border: "none",
                    }}
                  >
                    Tool URL
                  </th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool._id}>
                    <td
                      style={{
                        padding: "1rem",
                        border: "none",
                      }}
                    >
                      {tool.title}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        border: "none",
                      }}
                    >
                      <a
                        href={tool.toolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        View Tool →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
