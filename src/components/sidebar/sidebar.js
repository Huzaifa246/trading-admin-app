import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { itsLogo } from '../imagesImport';


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [isToggleActive, setIsToggleActive] = useState(false);

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        toggleSidebar();
    };


    return (
        <>
            {!isToggleActive && (
                <div className="its-heading-logo">
                    <img src={itsLogo} alt="ITS Logo" className="its-logo"/>
                    <h1 className="its-heading">ITS</h1>
                </div>
            )}
            <nav id="sidebar" className={isSidebarOpen ? "active" : ""}>
                <div className="p-4" style={{ marginTop: "50px" }}>
                    <ul className="list-unstyled">
                        {/* <Nav.Link href="/dashboard" activeClassName="active-link" className="mb-2 main-sidebar">*/}
                        <Nav.Link href="/dashboard" className={`mb-2 main-sidebar ${window.location.pathname === '/dashboard' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Dashboard
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/" className={`mb-2 main-sidebar ${window.location.pathname === '/' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Users
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/traders" className={`mb-2 main-sidebar ${window.location.pathname === '/traders' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faUsers} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Traders
                            </span>
                        </Nav.Link>
                        <Nav.Link href="/investment" className={`mb-2 main-sidebar ${window.location.pathname === '/investment' ? 'active-link' : ''}`}>
                            <FontAwesomeIcon icon={faMoneyBill} className="me-2 sidebar-icon" />
                            <span className='sidebar-text'>
                                Investment
                            </span>
                        </Nav.Link>
                    </ul>
                </div>
            </nav>
            {/* <div
                className={`sidebar-toggle sidebar-togglestyle ${isToggleActive ? 'active' : ''}`}
                onClick={handleToggle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16" className='grid-icon-style'>
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
            </div> */}
        </>
    );
};

export default Sidebar;
