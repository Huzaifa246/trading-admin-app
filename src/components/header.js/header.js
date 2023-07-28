import React, { useState } from 'react';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faBell } from '@fortawesome/free-solid-svg-icons';
import './header.css'; // Import the custom CSS file

export const defaultImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';
const Header = () => {
    const logoimage = 'https://static.vecteezy.com/system/resources/thumbnails/004/921/511/small/mountain-arrow-diagram-trading-business-marketing-logo-design-vector.jpg';

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    return (
        <Navbar bg="light" expand="lg" className="fixed-top main-Nav">
            <Navbar.Brand href="/dashboard">
                <Image src={logoimage} width="30" height="30" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMobileNav} />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Home</Nav.Link>
                        <Nav.Link href="/">Wallet</Nav.Link>
                        <Nav.Link href="/">Exchange</Nav.Link>
                        <Nav.Link href="/">History</Nav.Link>
                    </Nav>
                <Nav className="profile-info">
                    <FontAwesomeIcon icon={faSlidersH} className="notification-icon" />
                    <FontAwesomeIcon icon={faBell} className="notification-icon" />
                    <NavDropdown
                        title={
                            <Image src={defaultImageUrl} width="30" height="30" alt="Profile" roundedCircle />
                        }
                        id="basic-nav-dropdown"
                    >
                        {isMobileNavOpen ? (
                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        ) : (
                            <NavDropdown.Item href="/">Login</NavDropdown.Item>
                        )}
                    </NavDropdown>
                    <span>Your Name</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
