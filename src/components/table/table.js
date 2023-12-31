import './table.css';
import { defaultImageUrl } from '../header/header';
import fetchAllUsers from '../../Services/getAllUser';
import adminActiveUser from '../../Services/getActiveUser';
import adminInActiveUser from '../../Services/getInActiveUser';
import Loader from '../Loader/Loader';
import deleteUserByAdmin from '../../Services/deleteUserByAdmin';
import ViewUserDetails from '../../Services/getViewUserDetails';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,
{
    useState, useEffect,
    Table, Image, Card, Button, Modal, FontAwesomeIcon,
    Dropdown, DropdownButton,
    faTrashAlt, faEdit, faEye, faSearch
}
    from "../../Services/Imports/ImportsItems";
const UserTableComp = () => {
    const { page } = useParams();
    const [users, setUsers] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Add state for the current page
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserViewDetails, setSelectedUserViewDetails] = useState(null);
    const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);

    const [error, setError] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusChange = (status, userId) => {
        setModalShow(true);
        setSelectedStatus(status);
        setSelectedUserId(userId);
    };

    const handleConfirmStatusChange = async (status, usersArr) => {
        // console.log("Changing status to:", status);
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
                setIsLoading(true);
                const decryptedData = await fetchAllUsers(currentPage, searchQuery);
                if (decryptedData.data && Array.isArray(decryptedData.data)) {
                    setUsers(decryptedData.data);
                    setTotalPages(decryptedData.totalPages);

                    setError(false); // Reset error state since data was successfully fetched.
                }
                else if (decryptedData.data.length === 0 && searchQuery.trim() !== '') {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
                setError(true);
            }
            finally {
                setIsLoading(false);
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
    const handleViewUser = async (userId) => {
        try {
            const userDetailsResponse = await ViewUserDetails(userId);
            const userDetails = userDetailsResponse.data;
            console.log(userDetails, "view")
            setSelectedUserViewDetails(userDetails);
            setViewModalShow(true);
        } catch (error) {
            console.error('Error Viewing user:', error);
            setViewModalShow(false)
        }
    };

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
            <Modal show={viewModalShow} onHide={() => setViewModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUserViewDetails && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className='View-inner-style'>
                                <p><b>Name:</b></p>
                                <p>{selectedUserViewDetails?.fullName}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Email:</b></p>
                                <p>{selectedUserViewDetails?.email}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Binance Id:</b></p>
                                <p>{selectedUserViewDetails?.binance_id || "No Id"}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Total Balance:</b></p>
                                <p>{selectedUserViewDetails?.totalbalance}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Withdrawable:</b></p>
                                <p>{selectedUserViewDetails?.withdrawable.toFixed(2)}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>InvestmentBalance:</b></p>
                                <p>{selectedUserViewDetails?.investmentBalance}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Profit:</b></p>
                                <p>{selectedUserViewDetails?.profit}</p>
                            </div>
                            <div className='View-inner-style'>
                                <p><b>Status:</b></p>
                                <p>{selectedUserViewDetails?.status}</p>
                            </div>                    
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setViewModalShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', paddingRight: '0' }} className='market-heading'>User List</span>
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
                        <Loader />
                    ) : error ? ( // Display an error message when no results are found.
                        <div className="no-data-message">No results found for "{searchQuery}".</div>
                    ) : users?.length === 0 ? (
                        <div className="no-data-message">No data found, Select Date Range.</div>
                    ) : users?.length > 0 && (
                        <Table striped className='main-table'>
                            <thead className='table-heading-style'>
                                <tr>
                                    <th style={{ textAlign: "start" }}>Name</th>
                                    <th>Email</th>
                                    <th>TotalBalance</th>
                                    <th>Referral</th>
                                    {/* <th>Deleted</th> */}
                                    <th>Status</th>
                                    <th className='action-heading'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item, index) => (
                                    item?.email && item?.fullName ? (
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
                                            {/* <td>
                                                <span className={`badge badge-style ${item?.deleted ? 'bg-danger' : 'bg-success'}`}>
                                                    {item?.deleted ? 'Deleted' : 'Active'}
                                                </span>
                                            </td> */}
                                            <td className='active-user-style'>
                                                <DropdownButton
                                                    title={item.deleted === true ? "deleted" : item.status}
                                                    className="dropdown-button"
                                                    style={{
                                                        backgroundColor: item.deleted === true ? "red" : "",
                                                    }}
                                                    variant={item.deleted === true ? "danger" : (item.status === "active" ? "success" : "danger")}
                                                    disabled={item?.deleted === true}
                                                >

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
                                                    {/* <FontAwesomeIcon icon={faEdit} className="edit-icon" /> */}
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        className={`delete-icon ${item.deleted ? 'disabled-icon' : ''}`}
                                                        disabled={item?.deleted === true}
                                                        onClick={() => {
                                                            if (!item.deleted) {
                                                                setDelModalShow(true);
                                                                setSelectedUserIdToDelete(item._id); // Set the selectedUserIdToDelete
                                                            } // Set the selectedUserIdToDelete
                                                        }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="view-icon"
                                                        onClick={() => {
                                                            setViewModalShow(true);
                                                            handleViewUser(item._id)
                                                        }}
                                                    />

                                                </large>
                                            </td>
                                        </tr>
                                    ) : users?.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No data found, Select Date Range.
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                <div className="pagination-User-container">
                    {currentPage > 1 && (
                        <Button
                            variant="secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </Button>
                    )}
                    <Button
                        key={currentPage}
                        variant="primary"
                        onClick={() => handlePageChange(currentPage)}
                    >
                        {currentPage}
                    </Button>
                    {currentPage < totalPages && (
                        <Button
                            variant="primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </Button>
                    )}
                </div>
            </Card>

        </>
    );
}

export default UserTableComp;
