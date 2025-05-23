import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table, Button, Spinner, Modal, Form } from "react-bootstrap";
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
        });
        setAllUsers(res.data.data);
        setUsers(res.data.data.slice(0, usersPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
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
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
      toast.success("Admin status updated");
    } catch (error) {
      toast.error("Failed to update admin status");
    }
  };

  const handleViewTools = async (userId) => {
    navigate(`/my-tools/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted");
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
    return <Spinner animation="border" />;
  }

  return (
    <div style={{ marginTop: "100px", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>User Management</h1>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="avatar"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant={user.isAdmin ? "success" : "warning"}
                    onClick={() => handleToggleAdmin(user._id)}
                  >
                    {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewTools(user._id)}
                  >
                    View Tools
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {hasMoreUsers && (
        <Button onClick={handleLoadMore} variant="primary" className="mt-3">
          Load More
        </Button>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tools Published by User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tool Name</th>
                <th>Tool URL</th>
              </tr>
            </thead>
            <tbody>
              {tools.length === 0 ? (
                <tr>
                  <td colSpan="2">No tools found for this user.</td>
                </tr>
              ) : (
                tools.map((tool) => (
                  <tr key={tool._id}>
                    <td>{tool.title}</td>
                    <td>
                      <a
                        href={tool.toolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Tool
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
