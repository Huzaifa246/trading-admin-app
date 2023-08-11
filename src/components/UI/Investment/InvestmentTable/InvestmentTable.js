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

    // Filter out rows with missing fullName or email
    const filteredUsersInvest = usersInvest.filter(item => item?.user?.fullName && item?.user?.email);

    return (
        <>
            <div style={{ marginTop: "6rem" }}>
            </div>
            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Investment List</span>
                </div>
                <div className='table-border-style'>
                    {usersInvest.length > 0 ? (
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
                                {filteredUsersInvest?.map((item, index) => (
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
                                            <large className="currency-style">{item?.profitPercentage.toFixed(2)}%</large>
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
                    ) : (
                        <>
                            <div className='Main-NotFound'>
                                <div class="empty-state__message">No records has been added yet.</div>
                                <div class="empty-state__help">
                                    Add a new record by simpley clicking the button on top right side.
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
}

export default InvestmentTable;
