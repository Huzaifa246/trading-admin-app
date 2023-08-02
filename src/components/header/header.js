import React, { useState } from 'react';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faBell } from '@fortawesome/free-solid-svg-icons';
import './header.css'; // Import the custom CSS file
import Sidebar from '../sidebar/sidebar';

export const defaultImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="fixed-top main-Nav">
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto profile-info">
                        <FontAwesomeIcon icon={faSlidersH} className="notification-icon" />
                        <FontAwesomeIcon icon={faBell} className="notification-icon" />
                        <NavDropdown
                            title={
                                <Image src={defaultImageUrl} width="30" height="30" alt="Profile" roundedCircle />
                            }
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <span>Your Name</span>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
            </Navbar>
            <Sidebar />
        </>
    );
};

export default Header;
