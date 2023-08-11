import React, { useState, useEffect } from 'react';
import { Table, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';
import fetchAllUsers from '../../Services/getAllUser';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import adminActiveUser from '../../Services/getActiveUser';
import adminInActiveUser from '../../Services/getInActiveUser';
import Loader from '../Loader/Loader';
import deleteUserByAdmin from '../../Services/deleteUserByAdmin';

const UserTableComp = () => {
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Add state for the current page
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleStatusChange = (status, userId) => {
        setModalShow(true);
        setSelectedStatus(status);
        setSelectedUserId(userId);
    };

    const handleConfirmStatusChange = async (status, usersArr) => {
        console.log("Changing status to:", status);
        setModalShow(false);
        // console.log(usersArr,"id")
        try {
            setIsLoading(true);
            if (status === 'active') {
                await adminInActiveUser(usersArr);
            } else if (status === 'inactive') {
                await adminActiveUser(usersArr);
            }

            // Update the users after changing the status
            const decryptedData = await fetchAllUsers(currentPage);
            setUsers(decryptedData.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating user status:', error);
            setIsLoading(false);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decryptedData = await fetchAllUsers(currentPage, searchQuery); // Pass the current page and search query as parameters
                setUsers(decryptedData.data);
                console.log(decryptedData, "data")
                setTotalPages(decryptedData.totalPages);
            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
            }
        };

        fetchData();
    }, [currentPage, searchQuery]);

    const getStatusLabel = (status) => {
        return status === "active" ? "Inactive" : "Active";
    };

    const handleConfirmDelete = async (userId) => {
        setDelModalShow(false);

        try {
            setIsLoading(true);
            await deleteUserByAdmin(userId);
            setUsers(users.filter(user => user?._id !== userId));
            setIsLoading(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            setIsLoading(false);
        }
    };
    //  const usersArr = users.data;
    // for (const user of users) {
    //     console.log(user._id, "User id");
    //   }

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to change your status to "{getStatusLabel(selectedStatus)}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmStatusChange(selectedStatus, selectedUserId)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={delModalShow} onHide={() => setDelModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDelModalShow(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirmDelete(selectedUserIdToDelete)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>User List</span>
                    <div className='main-bar-calendar'>
                        <div class="form-group has-search">
                            <span className="form-control-feedback">
                                <FontAwesomeIcon icon={faSearch} style={{ color: "#c9c8c8" }} />
                            </span>
                            <input
                                type="text"
                                className="form-control search-form"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                        </div>
                    </div>
                </div>
                <div className='table-border-style'>
                    {isLoading ? (
                        <Loader /> // Display the loader when isLoading is true
                    ) : filteredUsers.length === 0 ? (
                        <div className="no-data-message">No data found.</div>
                    ) : (
                        <Table striped className='main-table'>
                            <thead className='table-heading-style'>
                                <tr>
                                    <th style={{ textAlign: "start" }}>Name</th>
                                    <th>Email</th>
                                    <th>TotalBalance</th>
                                    <th>Referral</th>
                                    <th>Status</th>
                                    <th className='action-heading'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='main-tableicon'>
                                                <Image src={item?.profile_image?.url || defaultImageUrl} width="30" height="30" alt="Profile" roundedCircle className='imagetable-style' />
                                                <large className="large-text">{item?.fullName}</large>
                                            </div>
                                        </td>
                                        <td style={{ color: 'black' }}>
                                            <small>{item?.email}</small>
                                        </td>
                                        <td>
                                            {/* You need to get the correct data property for the 'transaction' */}
                                            <large className="large-text">{item?.totalbalance.toFixed(2)}</large>
                                        </td>
                                        <td className='third-col'>
                                            <large className="currency-style">{item?.totalreferral}</large>
                                        </td>
                                        <td className='active-user-style'>
                                            <DropdownButton title={(item.status)}
                                                className="dropdown-button"
                                                variant={item.status === "active" ? "success" : "danger"}>
                                                <Dropdown.Item eventKey="1"
                                                    onClick={() => handleStatusChange(item.status, item._id)}
                                                    className="dropdown-item"
                                                >
                                                    {getStatusLabel(item.status)}
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                        <td className='action-col-user'>
                                            <large className="action-style">
                                                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="delete-icon"
                                                    onClick={() => {
                                                        setDelModalShow(true);
                                                        setSelectedUserIdToDelete(item._id); // Set the selectedUserIdToDelete
                                                    }}
                                                />
                                                <FontAwesomeIcon icon={faEye} className="view-icon" />
                                            </large>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                            <Button
                                                key={index}
                                                variant={index + 1 === currentPage ? 'primary' : 'secondary'}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    )}
                </div>
            </Card>
        </>
    );
}

export default UserTableComp;
