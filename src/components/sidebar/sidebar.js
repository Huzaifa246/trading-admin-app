import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css'; // Import the custom CSS file

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav id="sidebar" className={isSidebarOpen ? "active" : ""}>
        <div className="p-4" style={{marginTop: "50px"}}>
          <ul className="list-unstyled">
            <Nav.Link href="/dashboard" className="mb-2">
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link href="/" className="mb-2">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Users
            </Nav.Link>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </nav>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </>
  );
};

export default Sidebar;
