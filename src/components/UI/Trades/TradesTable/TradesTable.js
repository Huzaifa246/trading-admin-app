import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Form, Modal } from 'react-bootstrap';
import './TradTable.css';
import { crossImg } from '../../../imagesImport';
import fetchAllTradeOption from '../../../../Services/getAllTradeOption';
import fetchCurrentUserTrade from '../../../../Services/getCurrentUserTrade';
import Loader from '../../../Loader/Loader';
import ReleaseTradeApi from '../../../../Services/ReleaseTradeApi';
import { formatDateTime } from '../../../../Services/DataFormat/DateFormat';


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

    const [showResultModal, setShowResultModal] = useState(false);

    const [releaseError, setReleaseError] = useState(null); // State to hold release error
    const [releaseSuccess, setReleaseSuccess] = useState(false);

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
        return (profitPercentage);
    };
    const confirmRelease = async () => {
        try {
            const userId = dataCurrentUserT[0]?.userId;
            if (!userId) {
                console.error('No user data available.');
                return;
            }

            // Check if profitPercentage is valid and not negative
            if (profitPercentage <= 0) {
                console.error('Invalid profit percentage.');
                return;
            }
            console.log('Sending request with data:', {
                userId,
                profitPercentage,
                selectedOption
            });

            const releaseResponse = await ReleaseTradeApi(userId, profitPercentage, selectedOption);
            setShowConfirmationModal(false);
            if (releaseResponse.success) {
                setReleaseSuccess(true); // Set success flag
                setReleaseError(null); // Clear any previous error
            } else {
                setReleaseSuccess(false); // Clear success flag
                setReleaseError("Error releasing profit"); // Set error message
            }
            return releaseResponse;
        } catch (error) {
            console.error('Error releasing profit:', error);
            setReleaseError("Error releasing profit"); // Set error message
            setReleaseSuccess(false);
        }
        setShowModal(false); // Close the input modal
        setShowResultModal(true); // Open the result modal
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
                const userObjectsArray = currentUserTradeData?.data?.send?.map(item => item?.user) || [];

                // Calculate total investment and total investors
                const totalInv = userObjectsArray.reduce((sum, user) => sum + (user?.trades?.total_investment || 0), 0);
                setTotalInvestment(totalInv);
                setTotalInvestors(userObjectsArray.length);

                // console.log("users", userObjectsArray);
                setDataCurrentUserT(userObjectsArray);
                setIsLoading(false);

            }
        }
        fetchData();
    }, [selectedOption]);

    console.log(dataCurrentUserT, "user data")

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

            <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Release Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {releaseSuccess && (
                        <div className="success-message">
                            Profit released successfully!
                        </div>
                    )}
                    {releaseError && (
                        <div className="error-message">
                            {releaseError}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowResultModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ marginTop: "6rem" }}>

            </div>
            <Card style={{ margin: "0 30px" }}>
                <div className='buttons-container'>
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
                    {releaseError && (
                        <div className="error-message">
                            {releaseError}
                        </div>
                    )}

                    {/* Show success message if releaseSuccess is true */}
                    {releaseSuccess && (
                        <div className="success-message">
                            Profit released successfully!
                        </div>
                    )}
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
                                        <th className='th-trades-class'>Name</th>
                                        <th className='th-trades-class'>Email</th>
                                        <th className='th-trades-class'>Amount</th>
                                        <th className='th-trades-class'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(dataCurrentUserT) && dataCurrentUserT.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>
                                                <Form.Check type="checkbox" id={`checkbox-${index}`} />
                                            </td>
                                            <td className='td-TradTable'>
                                                <large className="large-text">{item?.userFullName || ""}</large>
                                            </td>
                                            <td style={{ color: 'black' }} className='td-TradTable'>
                                                <small>{item?.email}</small>
                                            </td>
                                            <td className='td-TradTable'>
                                                <large className="currency-style">{item?.trades?.total_investment || ''}</large>
                                            </td>
                                            <td className='action-col td-TradTable'>
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
                <Card>
                    <div className='table-heading'>
                        <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Past Investment</span>
                    </div>
                    <Table striped className='main-table'>
                        <thead className='table-heading-style'>
                            <tr>
                                <th className='th-trades-class'>Name</th>
                                <th className='th-trades-class'>Past Investment</th>
                                <th className='th-trades-class'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradeOptions?.map((option, index) => (
                                <tr key={index}>
                                    <td className='td-TradTable'>
                                        <large className="large-text">{option?.name || ""}</large>
                                    </td>
                                    <td style={{ color: 'black' }} className='td-TradTable'>
                                        <small>{option?.pastInvestment}</small>
                                    </td>
                                    <td className='td-TradTable'>
                                        <large className="currency-style">{formatDateTime(option?.createdAt) || ''}</large>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </>
    );
}

export default TradesTable;
