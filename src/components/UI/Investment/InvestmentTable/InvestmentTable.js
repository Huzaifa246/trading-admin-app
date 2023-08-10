import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import './investTable.css';
import fetchAllInvestment from '../../../../Services/getAllInvestment';
import { useSidebar } from '../../../../store';

const InvestmentTable = () => {
    const { isSidebarOpen } = useSidebar();
    const [usersInvest, setUsersInvest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllInvestment();
                setUsersInvest(response?.data?.send);
            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div style={{ marginTop: "6rem" }}>
            </div>
            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Investment List</span>
                </div>
                <div className='table-border-style'>
                    <Table striped className='main-table'>
                        <thead className='table-heading-style'>
                            <tr>
                                <th className='First-heading'>Name</th>
                                <th>Email</th>
                                <th>InvestmentName</th>
                                <th>ProfitPercentage</th>
                                <th>Payment</th>
                                <th className='action-heading'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersInvest?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='main-tableicon'>
                                            <large className="large-text-IT">{item?.user?.fullName}</large>
                                        </div>
                                    </td>
                                    <td style={{ color: 'black' }}>
                                        <small>{item?.user?.email}</small>
                                    </td>
                                    <td>
                                        <large className="large-text-IT">{item?.investment_name?.name}</large>
                                    </td>
                                    <td className='third-col'>
                                        <large className="currency-style">{item?.profitPercentage}%</large>
                                    </td>
                                    <td>
                                        <large className="currency-style">{item?.payment}</large>
                                    </td>
                                    <td className='action-col'>
                                        <large className="currency-style">{item?.status}</large>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </>
    );
}

export default InvestmentTable;
