import React, { useState, useEffect } from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import './investTable.css';
import fetchAllInvestment from '../../../../Services/getAllInvestment';
import Loader from '../../../Loader/Loader';

const InvestmentTable = () => {
    const [usersInvest, setUsersInvest] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoader(true);
                const response = await fetchAllInvestment(currentPage);
                const currentPageData = response?.data?.investment;
                setUsersInvest(currentPageData);
                setIsLoader(false);

            } catch (error) {
                console.error('Error fetching and decrypting data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const filteredUsersInvest = usersInvest?.filter(item => item?.user?.fullName && item?.user?.email);

    return (
        <>
            <div style={{ marginTop: "6rem" }}></div>
            <Card>
                <div className='table-heading'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Investment List</span>
                </div>
                <div className='table-border-style'>
                    {isLoader ? (
                        <Loader />
                    ) :
                        filteredUsersInvest?.length > 0 ? (
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
                                                <large className="invest-cur-style">{item?.profitPercentage.toFixed(2)}%</large>
                                            </td>
                                            <td>
                                                <large className="invest-cur-style">{item?.payment}</large>
                                            </td>
                                            <td className='action-col'>
                                                <large className="invest-cur-style status-invest">{item?.status}</large>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                                <div className='Main-NotFound'>
                                    <div class="empty-state__message">No records have been added yet.</div>
                                    <div class="empty-state__help">
                                        Add a new record!!!
                                    </div>
                                </div>
                        )}
                </div>
                <div className="pagination-invest-container">
                    {currentPage > 1 && (
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant={currentPage ? "primary" : "secondary"}
                        onClick={() => setCurrentPage(currentPage)}
                    >
                        {currentPage}
                    </Button>
                    <Button
                        variant={currentPage === totalPages + 1 ? "primary" : "secondary"}
                        onClick={() => {
                            if (filteredUsersInvest?.length) {
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                    >
                        {currentPage + 1}
                    </Button>

                </div>
            </Card>
        </>
    );
}

export default InvestmentTable;
