import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa'; // or any icon you like

const FilterDropdown = () => {
  return (
      <Dropdown.Menu style = {{
        zIndex : 1001, position : "absolute"
      }}>
        <Dropdown.Item eventKey="1">Pricing</Dropdown.Item>
        <Dropdown.Item eventKey="2">Categories</Dropdown.Item>
      </Dropdown.Menu>
  );
};

export default FilterDropdown;