import React from 'react';
import Logo from '../../images/logoround.svg';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
            <div className="logo-img">
                <img src={Logo}></img>
            </div>
            <div className="logo-text">Sustainability Monitor</div>
      </div>
      <div className="user">User Profile</div>
    </nav>
  );
}

export default Navbar;
