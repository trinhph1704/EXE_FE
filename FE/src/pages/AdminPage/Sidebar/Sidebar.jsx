import React, { useState } from 'react';
import { FaHome, FaFileInvoiceDollar, FaRegChartBar, FaUser, FaCog, FaDollarSign, FaWallet, FaCreditCard, FaLightbulb } from "react-icons/fa"; // Import icons
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebars ${isOpen ? "" : "sidebar-change"}`}>
      {/* <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "<<" : ">>"}
      </button> */}

      {/* Profile Section */}
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src="https://i.imgur.com/4M34hi2.png" alt="profile image" />
        </div>
        {isOpen && <span className="info-name">Admin Page</span>}
      </div>

      {/* Navigation Links */}
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              <FaHome className="nav-link-icon" />
              {isOpen && <span className="nav-link-text">DASHBOARD</span>}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/account">
              <FaFileInvoiceDollar className="nav-link-icon" />
              {isOpen && <span className="nav-link-text">ACCOUNTS</span>}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/item">
              <FaWallet className="nav-link-icon" />
              {isOpen && <span className="nav-link-text">ITEMS</span>}
            </a>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;