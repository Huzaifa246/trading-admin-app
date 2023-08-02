// TableComp.js
import React from 'react';
import { Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTrashAlt, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import './table.css';
import { defaultImageUrl } from '../header/header';

function TableComp() {
    // Sample data for the table rows
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
            <div style={{ marginTop: '6rem' }}></div>
            <div className='table-heading'>
                <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>User List</span>
                <span style={{ textAlign: 'right', marginBottom: '0' }}>See All</span>
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
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className='main-tableicon'>
                                        <Image src={defaultImageUrl} width="30" height="30" alt="Profile" roundedCircle className='imagetable-style' />
                                        <large className="large-text">{item.name}</large>
                                    </div>
                                </td>
                                <td style={{ color: 'black' }}>
                                    <small>{item.email}</small>
                                </td>
                                <td>
                                    <large className="large-text">{item.transaction}</large>
                                </td>
                                <td>
                                    <large className="large-text">{item.status}</large>
                                </td>
                                <td className='third-col'>
                                    <large className="currency-style">{item.currency}</large>
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
        </>
    );
}

export default TableComp;
