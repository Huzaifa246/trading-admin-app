import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './header.css'; // Import the custom CSS file
import Sidebar from '../sidebar/sidebar';
import { logoutImg, userImg, settingImg } from '../imagesImport';
import { useSidebar } from '../../store';

export const defaultImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';

const Header = () => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className={`fixed-top main-Nav ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto profile-info">
                        <FontAwesomeIcon icon={faSlidersH} className="notification-icon" />
                        <FontAwesomeIcon icon={faBell} className="notification-icon" />
                        <div className="user-icon" onClick={toggleUserDropdown}>
                            <FontAwesomeIcon icon={faUser} className='user-icon'/>
                            {isUserDropdownOpen && (
                                <div className="dropdown-menu show-on-hover">
                                    <a class="dropdown-item" href="/dashboard">
                                        <img src={userImg} alt="user"  className='list-img-icons'/>
                                        Account
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/">
                                        <img src={settingImg} alt="user"  className='list-img-icons'/>
                                        Settings
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/">
                                        <img src={logoutImg} alt="user"  className='list-img-icons'/>
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
            </Navbar>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/> 
        </>
    );
};

export default Header;
