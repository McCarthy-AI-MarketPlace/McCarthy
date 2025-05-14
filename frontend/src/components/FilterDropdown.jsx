import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa'; // or any icon you like

const FilterDropdown = () => {
  return (
      <Dropdown.Menu style = {{
        zIndex : 1001, position : "absolute"
      }}>
           <Dropdown.Item eventKey="1">Customer Service & Support</Dropdown.Item>
           <Dropdown.Item eventKey="2">Sales</Dropdown.Item>
           <Dropdown.Item eventKey="3">Back Office</Dropdown.Item>
           <Dropdown.Item eventKey="4">Operations</Dropdown.Item>
           <Dropdown.Item eventKey="5">Growth & Marketing</Dropdown.Item>
           <Dropdown.Item eventKey="6">Writing & Editing</Dropdown.Item>
           <Dropdown.Item eventKey="7">Technology & IT</Dropdown.Item>
           <Dropdown.Item eventKey="8">Design & Creative</Dropdown.Item>
           <Dropdown.Item eventKey="9">Workflow Automation</Dropdown.Item>
      </Dropdown.Menu>
  );
};

export default FilterDropdown;