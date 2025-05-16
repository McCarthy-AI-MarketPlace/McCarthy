<<<<<<< HEAD
import React from "react";

import { FaSearch, FaSlidersH } from "react-icons/fa";

import { Form, InputGroup, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

=======
import React from 'react'
import { FaSearch, FaSlidersH } from "react-icons/fa";
import FilterDropdown from "../components/FilterDropdown";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";



>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
export default function SearchBar() {
  return (
    <InputGroup
      className="mx-auto my-4"
      style={{
        width: "60%",
<<<<<<< HEAD

        maxWidth: "500px",

        borderRadius: "15px",

        background: "rgba(255, 255, 255, 0.5)",

        backdropFilter: "blur(10px)",

        boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.5)",

=======
        maxWidth: "500px",
        borderRadius: "15px",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.5)",
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
        // overflow: "hidden",
      }}
    >
      <InputGroup.Text
        style={{
          background: "transparent",
<<<<<<< HEAD

          border: "none",

          color: "#fff",
        }}
      ></InputGroup.Text>

      <Form.Control
        className="mt-1 mb-1"
        type="text"
        placeholder="Search (eg: video editing )"
        style={{
          background: "#ebe2f4",

          border: "none",

          borderRadius: "10px",
        }}
      />

      <InputGroup.Text
        style={{
          background: "transparent",

          border: "none",

=======
          border: "none",
          color: "#fff",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            as="span"
            id="icon-dropdown"
            style={{ cursor: "pointer", position: "relative" }}
            className="d-flex align-items-center"
          >
            <FaSlidersH color="#000" />
          </Dropdown.Toggle>
          <FilterDropdown></FilterDropdown>
        </Dropdown>
      </InputGroup.Text>
      <Form.Control
        className="mt-1 mb-1"
        type="text"
        placeholder="Search"
        style={{
          background: "#ebe2f4",
          border: "none",
          borderRadius: "10px",
        }}
      />
      <InputGroup.Text
        style={{
          background: "transparent",
          border: "none",
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
          color: "#fff",
        }}
      >
        <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
          <FaSearch color="#000" />
        </Link>
      </InputGroup.Text>
    </InputGroup>
  );
}
