import React from "react";
import { Container, Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import Header from "../components/Header";
import FixedLogos from "../components/FixedLogos";
import { Link } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";

const Landing = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(circle at center, #D000FF, #4B0082)",
        color: "#000",
        fontFamily: "Poppins, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Header />

      <Container className="text-center mt-5" style={{ flex: 1 }}>
        <h1 className="fw-bold">
          There’s an AI for <span className="text-uppercase">everything</span>
        </h1>

        <InputGroup
          className="mx-auto my-4"
          style={{
            width: "60%",
            maxWidth: "500px",
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.5)",
            // overflow: "hidden",
          }}
        >
          <InputGroup.Text
            style={{ background: "transparent", border: "none", color: "#fff" }}
          >
            <FaSearch color="#000" />
          </InputGroup.Text>
          <Form.Control
            className="mt-1 mb-1"
            type="text"
            placeholder="Search"
            style={{
              background: "#ebe2f4",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
          <InputGroup.Text
            style={{ background: "transparent", border: "none", color: "#fff" }}
          >

            <Dropdown>
      <Dropdown.Toggle
        as="span"
        id="icon-dropdown"
        style={{ cursor: 'pointer', position : "relative" }}
        className="d-flex align-items-center"
      >
            <FaSlidersH color="#000" />
            </Dropdown.Toggle>
            <FilterDropdown></FilterDropdown>
            </Dropdown>


          </InputGroup.Text>
        </InputGroup>

        <Button
          className="mt-2 px-4 py-2"
          style={{
            backgroundColor: "#FFFACD",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
            
         <Link to = "/Signup"> TRY NOW!
         </Link>
         
        </Button>
      </Container>

      <FixedLogos />

      <div style={{ width: "100%", overflow: "hidden" }}>
        <svg
          viewBox="0 0 800 400"
          style={{
            display: "block",
            width: "100%",
            height: "30vh",
            marginTop: "-1px",
            marginBottom: "-1px",
          }}
          preserveAspectRatio="none"
        >
          <path
            d="M 0 300 Q 100 200 250 300 Q 350 400 450 300 Q 650 100 800 300    
               L 800 400 
               L 0 400 
               Z"
            fill="#ebe2f4"
          />
        </svg>

        <div
          style={{
            backgroundColor: "#ebe2f4",
            textAlign: "center",
            padding: "2rem 1rem",
          }}
        >
          <h2 style={{ color: "#000", fontWeight: "600" }}>What we do</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
