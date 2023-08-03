// TableComp.js
import React, { useState, useEffect } from 'react';
import { Table, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';
import { useSidebar } from '../../store';
import { decryption } from '../../Services/encryptionDecryption';
import fetchAllUsers from '../../Services/getAllUser';

const TableComp = () => {
    const { isSidebarOpen } = useSidebar();

    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const decryptedData = await fetchAllUsers();
          setUsers(decryptedData.users);
        //   console.log(decryptedData, "all users")
        } catch (error) {
          console.error('Error fetching and decrypting data:', error);
        }
      };
  
      fetchData();
    }, []);

    const data = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            transaction: 'BTC',
            status: '+0.11%',
            currency: '$999.89',
        },
        {
            name: 'Hunain ',
            email: 'Hunain.ceo@example.com',
            transaction: 'ETH',
            status: '-0.32%',
            currency: '$789.45',
        },
        {
            name: 'Huzaifa ',
            email: 'Huzaifa@example.com',
            transaction: 'BTC',
            status: '+0.91%',
            currency: '$299.89',
        }, {
            name: 'Doe',
            email: 'doe@example.com',
            transaction: 'BTC',
            status: '+0.11%',
            currency: '$99.29',
        },
        {
            name: 'TOV',
            email: 'tov@example.com',
            transaction: 'BTC',
            status: '+0.51%',
            currency: '$399.01',
        }
    ];

    return (
        <>
            <div className={`main-table-class ${isSidebarOpen ? 'table-open' : ''}`}>
                <Card>
                    <div className='table-heading'>
                        <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>User List</span>
                    </div>
                    <div className='table-border-style'>
                        <Table striped className='main-table'>
                            <thead className='table-heading-style'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Transaction</th>
                                    <th>Status</th>
                                    <th>Currency</th>
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
                                        <td>
                                            <large className="large-text">{item.status}</large>
                                        </td>
                                        <td className='third-col'>
                                            <large className="currency-style">{item.investmentBalance}</large>
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
                        </Table>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default TableComp;
