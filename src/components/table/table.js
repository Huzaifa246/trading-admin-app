import React, { useState, useEffect } from 'react';
import { Table, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';
import fetchAllUsers from '../../Services/getAllUser';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

const TableComp = () => {
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Add state for the current page

    const handleStatusChange = (status) => {
        setModalShow(true);
        setSelectedStatus(status);
    };

    const handleConfirmStatusChange = (status) => {
        console.log("Changing status to:", status);
        setModalShow(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decryptedData = await fetchAllUsers(currentPage); // Pass the current page as a parameter
                setUsers(decryptedData.data);
            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const getStatusLabel = (status) => {
        return status === "active" ? "Inactive" : "Active";
    };


    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                    {/* <button type="button" className="btn-close" onClick={() => setModalShow(false)}></button> */}
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to change your status to "{getStatusLabel(selectedStatus)}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmStatusChange(selectedStatus)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>User List</span>
                </div>
                <div className='table-border-style'>
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
                            {users.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='main-tableicon'>
                                            <Image src={defaultImageUrl} width="30" height="30" alt="Profile" roundedCircle className='imagetable-style' />
                                            <large className="large-text">{item.fullName}</large>
                                        </div>
                                    </td>
                                    <td style={{ color: 'black' }}>
                                        <small>{item.email}</small>
                                    </td>
                                    <td>
                                        {/* You need to get the correct data property for the 'transaction' */}
                                        <large className="large-text">{item.totalbalance}</large>
                                    </td>
                                    <td className='third-col'>
                                        <large className="currency-style">{item.investmentBalance}</large>
                                    </td>
                                    <td>
                                        <DropdownButton title={(item.status)} variant={item.status === "active" ? "success" : "danger"}>
                                            <Dropdown.Item eventKey="1" onClick={() => handleStatusChange(item.status)}>
                                                {getStatusLabel(item.status)}
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                    <td className='action-col'>
                                        <large className="action-style">
                                            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                                            <FontAwesomeIcon icon={faEye} className="view-icon" />
                                        </large>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    {/* Assuming the API returns total pages count */}
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
                </div>
            </Card>
        </>
    );
}

export default TableComp;
