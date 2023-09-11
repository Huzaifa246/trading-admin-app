import React, { useState, useEffect } from 'react';
import getAllWithDraw from '../../../../Services/getAllWithDraw';
import { Card, Table, Button, Dropdown, Modal } from 'react-bootstrap';
import "./withDraw.css";
import { formatDateTime } from '../../../../Services/DataFormat/DateFormat';
import getWithDrawRelease from './../../../../Services/getWdrawRelease';
import Loader from './../../../Loader/Loader';

function WithDraw() {
    const [usersWithDraw, setUsersWithDraw] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [status, setStatus] = useState('pending');
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        fetchData();
    }, [currentPage, status]);

    const fetchData = async () => {
        try {
            setIsLoader(true)
            const response = await getAllWithDraw(currentPage, status);
            const currentPageData = response.data;
            setUsersWithDraw(currentPageData);
            setTotalPages(response.totalPages);
            setIsLoader(false)

        } catch (error) {
            console.error('Error fetching and decrypting data:', error);
        }
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setCurrentPage(1); // Reset to the first page when changing status
    };

    // Function to handle approval
    const handleApprove = async (withdrawId) => {
        try {
            await getWithDrawRelease(withdrawId, 'approved');
            setSuccessMessage('Withdrawal Approved');
            setShowModal(true); // Show modal
        } catch (error) {
            console.error('Error approving withdrawal:', error);
        }
    };

    // Function to handle decline
    const handleDecline = async (withdrawId) => {
        try {
            await getWithDrawRelease(withdrawId, 'declined');
            setSuccessMessage('Withdrawal Declined');
            setShowModal(true); // Show modal
        } catch (error) {
            console.error('Error declining withdrawal:', error);
        }
    };

    console.log(usersWithDraw);

    const handleModalClose = () => {
        setShowModal(false);
        window.location.reload(true)
    };
    return (
        <>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{successMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleModalClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className='margin-tb-30'>
                <div className='buttons-container'>
                    <Button
                        className={`btn-invest-style ${status === 'pending' ? 'active' : ''}`}
                        variant={status === 'pending' ? 'primary' : 'outline-primary'}
                        onClick={() => handleStatusChange('pending')}
                    >
                        Withdrawal
                    </Button>
                    <Button
                        className={`btn-invest-style ${status === 'approved' ? 'active' : ''}`}
                        variant={status === 'approved' ? 'primary' : 'outline-primary'}
                        onClick={() => handleStatusChange('approved')}
                    >
                        Withdrawal Release
                    </Button>
                </div>
            </Card>
            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Withdraw Data</span>
                </div>
                <div className='table-border-style'>
                    {isLoader ? ( // Render loader while fetching data
                        <Loader />
                    ) : usersWithDraw?.length > 0 ? (
                        <Table striped className='main-table'>
                            <thead className='table-heading-style'>
                                <tr>
                                    <th>User</th>
                                    <th>Binance ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersWithDraw.map((withdraw, index) => (
                                    <tr key={index}>
                                        <td>{withdraw.userId.fullName}</td>
                                        <td>{withdraw.binance_id}</td>
                                        <td>{withdraw.amount}</td>
                                        <td>
                                            {status === 'pending' ? (
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id={`status-dropdown-${index}`}>
                                                        {withdraw.status}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleApprove(withdraw._id)}>Approved</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleDecline(withdraw._id)}>Declined</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            ) : (
                                                <span className={`badge wd-badge-style ${withdraw.status === 'approved' ? 'bg-success' : 'bg-danger'}`}
                                                >
                                                    {withdraw.status}
                                                </span>
                                            )}
                                        </td>
                                        <td>{formatDateTime(withdraw.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className='Main-NotFound'>
                            <div className="empty-state__message">No records found.</div>
                        </div>
                    )}
                </div>
                <div className="pagination-container">
                    {currentPage > 1 && (
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                    )}
                    {currentPage < totalPages && (
                        <Button
                            variant="primary"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </Card>
        </>
    );
}

export default WithDraw;
