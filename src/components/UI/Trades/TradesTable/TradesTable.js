import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Modal } from 'react-bootstrap';
import './TradTable.css';
import { crossImg } from '../../../imagesImport';
import fetchAllTradeOption from '../../../../Services/getAllTradeOption';
import fetchCurrentUserTrade from '../../../../Services/getCurrentUserTrade';
import Loader from '../../../Loader/Loader';


const TradesTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [profitPercentage, setProfitPercentage] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [tradeOptions, setTradeOptions] = useState([]);
    const [dataCurrentUserT, setDataCurrentUserT] = useState([]);
    const [selectedOption, setSelectedOption] = useState("gold");
    const [isLoading, setIsLoading] = useState(false);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalInvestors, setTotalInvestors] = useState(0);

    const openReleaseModal = () => {
        setShowModal(true);
    };

    const closeReleaseModal = () => {
        setShowModal(false);
    };

    const handleProfitSubmit = () => {
        console.log('Profit Percentage:', profitPercentage);
        setShowConfirmationModal(true);
        closeReleaseModal();
    };
    const confirmRelease = () => {
        console.log('Confirmed release');
        setShowConfirmationModal(false);
    };
    const cancelRelease = () => {
        setShowConfirmationModal(false);
    };

    const handleOptionClick = async (optionName) => {
        setSelectedOption(optionName);
        setIsLoading(true);
        const currentUserTradeData = await fetchCurrentUserTrade(optionName);
        setDataCurrentUserT(currentUserTradeData);
        setIsLoading(false);
    };

    //fetching options from api
    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            console.log(decryptedData.data)
        }
        fetchData();
    }, []);


    useEffect(() => {
        async function fetchData() {
            if (selectedOption !== "" && selectedOption) {
                setIsLoading(true);
                const currentUserTradeData = await fetchCurrentUserTrade(selectedOption);
                const userObjectsArray = currentUserTradeData?.data?.send?.map(item => item.user) || [];

                // Calculate total investment and total investors
                const totalInv = userObjectsArray.reduce((sum, user) => sum + (user?.trades?.total_investment || 0), 0);
                setTotalInvestment(totalInv);
                setTotalInvestors(userObjectsArray.length);

                console.log("users", userObjectsArray);
                setDataCurrentUserT(userObjectsArray);
                setIsLoading(false);

            }
        }
        fetchData();
    }, [selectedOption]);

    console.log(dataCurrentUserT, "data")
    console.log(selectedOption, "opt")


    return (
        <>
            <Modal show={showModal} onHide={closeReleaseModal}>
                <Modal.Header>
                    <Modal.Title>Enter Profit in Percentage</Modal.Title>
                    <img src={crossImg} alt="" className='cross-style' onClick={closeReleaseModal} />
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="profitPercentage">
                        <Form.Label>Profit Percentage</Form.Label>
                        <Form.Control
                            type="number"
                            value={profitPercentage}
                            onChange={(e) => setProfitPercentage(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeReleaseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleProfitSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirmationModal} onHide={cancelRelease}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Release</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to release?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelRelease}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmRelease}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ marginTop: "6rem" }}>

            </div>
            <Card style={{ margin: "0 30px" }}>
                <div className='buttons-container'>
                    {/* <Button className='btn-trades-style' variant="warning" >
                        Gold
                    </Button>
                    <Button className='btn-trades-style' variant="secondary">
                        Silver
                    </Button>
                    <Button className='btn-trades-style' variant="danger">
                        Oil
                    </Button> */}
                    {tradeOptions?.map((option, index) => (
                        <Button
                            key={index}
                            className='btn-trades-style'
                            variant="warning"
                            onClick={() => handleOptionClick(option.name)}
                        >
                            {option.name}
                        </Button>
                    ))}
                </div>


                <div className='main-total-style' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>Total Investors: {totalInvestors}</div>
                    <div>Total Amount: ${totalInvestment}</div>
                </div>
            </Card>
            <div className="trades-table-class">
                <Card>
                    <div className='table-heading'>
                        <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Traders List</span>
                    </div>
                    <div className='table-border-style'>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Table striped className='main-table'>
                                <thead className='table-heading-style'>
                                    <tr>
                                        <Form.Check
                                            type="checkbox"
                                            id="checkbox-select-all"
                                            style={{ textAlign: "center", marginTop: "10px" }}
                                        />
                                        <th>Date & Time</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th style={{ textAlign: "center" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCurrentUserT?.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>
                                                <Form.Check type="checkbox" id={`checkbox-${index}`} />
                                            </td>
                                            <td style={{ color: 'black' }}>
                                                <small>{item.dt || ""}</small>
                                            </td>
                                            <td>
                                                <div className='main-tableicon'>
                                                    <large className="large-text">{item?.userFullName || ""}</large>
                                                </div>
                                            </td>
                                            <td style={{ color: 'black' }}>
                                                <small>{item?.email}</small>
                                            </td>
                                            <td className='third-col'>
                                                <large className="currency-style">{item?.trades?.total_investment || ''}</large>
                                            </td>
                                            <td className='action-col'>
                                                <large className="action-style">
                                                    <Button variant="danger" onClick={openReleaseModal}>
                                                        Release
                                                    </Button>
                                                </large>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
}

export default TradesTable;
