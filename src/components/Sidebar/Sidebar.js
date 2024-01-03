import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        {/* <li><Link to="/">Home</Link> </li> */}
        {/* <li><Link to="/visualization">Emission</Link></li> */}
        <li>Home</li>
        <li>Emission</li>

        <li>Water</li>
        <li>Scorecard</li>
      </ul>
    </div>
  );
}

export default Sidebar;
