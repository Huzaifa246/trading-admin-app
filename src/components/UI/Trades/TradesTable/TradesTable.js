import './TradTable.css';
import React,
{
    useState, useEffect,
    Table, Card, Button,
    Form, Modal, FontAwesomeIcon,
    faSearch
}
    from "../../../../Services/Imports/ImportsItems"
import { crossImg } from '../../../imagesImport';
import fetchAllTradeOption from '../../../../Services/getAllTradeOption';
import fetchCurrentUserTrade from '../../../../Services/getCurrentUserTrade';
import Loader from '../../../Loader/Loader';
import ReleaseTradeApi from '../../../../Services/ReleaseTradeApi';
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { Calendar } from "react-feather";
import { formatDateTime } from '../../../../Services/DataFormat/DateFormat';

const TradesTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [profitPercentage, setProfitPercentage] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showALLConfirmation, setShowALLConfirmation] = useState(false);

    const [tradeOptions, setTradeOptions] = useState([]);
    const [dataCurrentUserT, setDataCurrentUserT] = useState([]);
    const [selectedOption, setSelectedOption] = useState("silver");
    const [investmentTypeId, setInvestmentTypeId] = useState("64cbebbd087e64a53520e594");
    const [isButtonActive, setIsButtonActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalInvestors, setTotalInvestors] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemsToRelease, setItemsToRelease] = useState([]);

    const [showResultModal, setShowResultModal] = useState(false);
    const [showProfitModal, setShowProfitModal] = useState(false);
    const [profitForAll, setProfitForAll] = useState(0);
    const [allResultModal, setAllResultModal] = useState(false);

    const [releaseError, setReleaseError] = useState(null); // State to hold release error
    const [releaseSuccess, setReleaseSuccess] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [pageNumber, setPageNumber] = useState(1); // Initialize with the starting page
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: null,
        key: "selection",
    });
    const [showCalendar, setShowCalendar] = useState(false);

    const handleCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (ranges) => {
        setSelectedRange(ranges.selection);
        setShowCalendar(false);
    };
    useEffect(() => {
        if (releaseSuccess) {
            const timeoutId = setTimeout(() => {
                window.location.reload();
            }, 4000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [releaseSuccess]);
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : [...Array(dataCurrentUserT.length).keys()]);
    };

    const openProfitModal = () => {
        setShowProfitModal(true);
    };

    const closeProfitModal = () => {
        setShowProfitModal(false);
    };

    const handleProfitSubmitALL = () => {
        setShowProfitModal(false);
        setShowALLConfirmation(true); // Show the confirmation modal for releasing all
    };

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
    const confirmRelease = async (totalInvestment, invesAt) => {
        try {
            const userId = dataCurrentUserT[selectedItems]?._id?.user;
            const totalInvestment = dataCurrentUserT[selectedItems]?.totalInvestment;
            const invesAt = dataCurrentUserT[selectedItems]?._id?.invesAt;


            if (!userId) {
                console.error('No user Id data available.');
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
                investmentTypeId,
                totalInvestment,
                invesAt
            });

            const releaseResponse = await ReleaseTradeApi(userId, profitPercentage, investmentTypeId, totalInvestment, invesAt);
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
    const handleCheckboxChange = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(itemIndex => itemIndex !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
        // Also update the selectAll state based on the selectedItems
        setSelectAll(selectedItems.length === dataCurrentUserT.length);
    };

    //fetching options from api
    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            console.log(decryptedData, "opt")
        }
        fetchData();
    }, []);
    const handleOptionClick = async (option) => {
        setSelectedOption(option.name);
        setInvestmentTypeId(option._id);
        setPageNumber(pageNumber);
        setIsButtonActive(true);
        setIsLoading(true);
        const response = await fetchCurrentUserTrade(option.name, pageNumber);
        if (response?.data?.investmentFound) {
            const currentUserTradeData = response?.data?.investmentFound || '';
            setDataCurrentUserT(currentUserTradeData);
            setIsLoading(false);
        } else {
            setDataCurrentUserT([]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        async function fetchData() {
            let startDate = '';
            let endDate = '';

            if (selectedRange.startDate) {
                startDate = selectedRange.startDate.toISOString().split('T')[0];
            }

            if (selectedRange.endDate) {
                endDate = selectedRange.endDate.toISOString().split('T')[0];
            }
            setIsLoading(true);
            const currentUserTradeData = await fetchCurrentUserTrade(selectedOption, pageNumber, searchQuery, startDate, endDate);
            const userObjectsArray = currentUserTradeData?.data?.investmentFound || [];

            let totalInv = 0;
            for (const userId in userObjectsArray) {
                totalInv += userObjectsArray[userId].totalInvestment || 0;
            }
            setTotalInvestment(totalInv);
            setTotalInvestors(Object.keys(userObjectsArray).length);

            // console.log("users", userObjectsArray);
            setDataCurrentUserT(userObjectsArray);
            setIsLoading(false);
        }
        fetchData();
    }, [selectedOption, pageNumber, selectedRange, searchQuery]);

    const releaseAll = () => {
        openProfitModal();
    };
    const confirmReleaseALL = async () => {
        try {
            setShowALLConfirmation(false);
            const releases = [];

            for (const selectedIndex of selectedItems) {
                const selectedItem = dataCurrentUserT[selectedIndex];

                // Calculate the new total investment amount with profit percentage
                const newTotalInvestment = selectedItem?.data?.investmentFound?.total_investment * (1 + profitForAll / 100);

                const totalInvestment = selectedItem?.totalInvestment;

                const date = selectedItem?._id?.invesAt;

                // Call the ReleaseTradeApi function with updated total investment amount
                const releaseResponse = await ReleaseTradeApi(selectedItem?._id?.user, profitForAll, investmentTypeId, totalInvestment, date);
                releases.push(releaseResponse);
            }

            setItemsToRelease(releases); // Store the selected items to be released
            setAllResultModal(true);
        } catch (error) {
            console.error('Error releasing profits:', error);
            setReleaseError("Error releasing profits");
        }
    };

    // console.log(dataCurrentUserT, "user data")

    return (
        <>
            {/* ALL PROFIT */}
            <Modal show={showProfitModal} onHide={closeProfitModal}>
                <Modal.Header>
                    <Modal.Title>Enter Profit For ALL Percentage</Modal.Title>
                    <img src={crossImg} alt="" className='cross-style' onClick={closeProfitModal} />
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="profitPercentage">
                        <Form.Label>Profit Percentage</Form.Label>
                        <Form.Control
                            type="number"
                            value={profitForAll}
                            onChange={(e) => setProfitForAll(e.target.value)}
                            min={0}
                            step={1}
                            onkeypress={(event) => {
                                if (event.charcode < 48) {
                                    event.preventdefault();
                                }
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeProfitModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleProfitSubmitALL}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Release ALL Modal */}
            <Modal show={showALLConfirmation} onHide={cancelRelease}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Release ALL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to release all of following users' profits?</p>
                    {/* <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
                        {selectedItems.map(index => (
                            <li key={index}>{dataCurrentUserT[index]?.userFullName || ""}</li>
                        ))}
                    </ul> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelRelease}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmReleaseALL}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* -- */}
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
                            min={0}
                            step={1}
                            onkeypress={(event) => {
                                if (event.charcode < 48) {
                                    event.preventdefault();
                                }
                            }}
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

            {/* ALL Result Modal */}
            <Modal show={allResultModal} onHide={() => { setAllResultModal(false); window.location.reload(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Release Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {releaseError && (
                        <div className="error-message">
                            {releaseError}
                        </div>
                    )}
                    {itemsToRelease.length > 0 && itemsToRelease.every(release => release.success) && (
                        <div className="success-message">
                            All profits released successfully!
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { setAllResultModal(false); window.location.reload(); }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Single Result Modal */}
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
            <Card className='trade-option-card'>
                <div className='buttons-container'>
                    {tradeOptions?.map((option, index) => (
                        <Button
                            key={index}
                            className={`btn-trades-style ${selectedOption === option.name && isButtonActive ? 'active' : ''}`}
                            variant={selectedOption === option.name ? 'primary' : 'outline-primary'}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.name.toUpperCase()}
                        </Button>
                    ))}
                </div>
            </Card>
            <div className="trades-table-class">
                <Card>
                    <div className='table-heading'>
                        <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Traders List</span>
                        <div className='main-total-style'>
                            <div className='total-card'>Total Investors: {totalInvestors}</div>
                            <div className='total-card'>Total Amount: ${totalInvestment?.toFixed(2)}</div>
                        </div>
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
                            <div
                                className="btn btn-link p-0 date-range-picker-button position-relative d-flex justify-content-end calender-icon-style"
                                onClick={handleCalendarClick}
                            >
                                <Calendar />
                            </div>
                            {showCalendar && (
                                <div
                                    className="position-absolute date-range-picker-overlay p-1 mt-5"
                                    style={{ zIndex: "9999", right: "0" }}
                                >
                                    <DateRange
                                        editableDateInputs={true}
                                        ranges={[selectedRange]}
                                        minDate={addDays(new Date(), -30)}
                                        maxDate={addDays(new Date(), 30)}
                                        onChange={handleDateChange}
                                        moveRangeOnFirstSelection={false}
                                        direction="vertical"
                                    // showDateDisplay={false} // Add this prop to hide date display
                                    // showSelectionPreview={false} // Add this prop to hide selection preview
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='Rel-All-style'>
                        {dataCurrentUserT.length > 0 && selectedItems.length > 1 && (
                            <Button
                                variant="primary"
                                onClick={releaseAll}
                            >
                                Release All
                            </Button>
                        )}
                    </div>
                    {releaseError && (
                        <div className="error-message">
                            <b> {releaseError} </b>
                        </div>
                    )}

                    {/* Show success message if releaseSuccess is true */}
                    {releaseSuccess && (
                        <div className="success-message">
                            <b> Profit released successfully! </b>
                        </div>
                    )}
                    <div className='table-border-style'>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            (dataCurrentUserT.length === 0) ? (
                                <div className="no-data-message"> "No data found!!!"</div>
                            ) : (
                                <Table striped className='main-table'>
                                    <thead className='table-heading-style'>
                                        <tr>
                                            <th style={{ textAlign: "center", display: 'block' }}>
                                                {Array.isArray(dataCurrentUserT) && dataCurrentUserT?.map((item, index) => (
                                                    <Form.Check
                                                        type="checkbox"
                                                        id="checkbox-select-all"
                                                        checked={selectAll}
                                                        onChange={toggleSelectAll}
                                                        key={index}
                                                    />
                                                ))}
                                            </th>
                                            <th className='th-trades-class'>Date</th>
                                            <th className='th-trades-class'>Name</th>
                                            <th className='th-trades-class'>Email</th>
                                            <th className='th-trades-class'>Amount</th>
                                            <th className='th-trades-class'>Deleted Account</th>
                                            <th className='th-trades-action'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {Array.isArray(dataCurrentUserT) && dataCurrentUserT.map((item, index) => (
                                        <tr key={index}> */}
                                        {/* {Array.isArray(dataCurrentUserT) && dataCurrentUserT.map((itemsArray, outerIndex) => (
                                            Array.isArray(itemsArray.userDetails) && itemsArray.userDetails.map((userDetail, innerIndex) => ( */}
                                        {/* <tr key={`${outerIndex}-${innerIndex}`}> */}
                                        {Array.isArray(dataCurrentUserT) && dataCurrentUserT.length > 0 && dataCurrentUserT?.map((userDetail, index) => (
                                            // Check if name and email properties are present before rendering
                                            userDetail?.name && userDetail?.email ? (
                                                <tr key={index}>
                                                    <td style={{ textAlign: "center" }}>
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={`checkbox-${index}`}
                                                            checked={selectedItems.includes(index)}
                                                            onChange={() => handleCheckboxChange(index)}
                                                        />
                                                    </td>
                                                    <td style={{ color: 'black' }} className='td-TradTable'>
                                                        <small>{formatDateTime(userDetail?._id?.invesAt) || ''}</small>
                                                    </td>
                                                    <td className='td-TradTable'>
                                                        <large className="large-text">{userDetail?.name || ""}</large>
                                                    </td>
                                                    <td style={{ color: 'black' }} className='td-TradTable'>
                                                        <small>{userDetail?.email}</small>
                                                    </td>
                                                    <td className='td-TradTable'>
                                                        <large className="currency-style">{userDetail?.totalInvestment || ''}</large>
                                                    </td>
                                                    <td className='td-TradTable'>
                                                        <span className={`badge badge-style ${userDetail?.account_deleted ? 'bg-danger' : 'bg-success'}`}>
                                                            {userDetail?.account_deleted ? 'True' : 'False'}
                                                        </span>
                                                    </td>
                                                    <td className='action-col td-TradTable'>
                                                        <large className="action-style">
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => openReleaseModal(index)}
                                                                disabled={selectAll || !selectedItems.includes(index) || selectedItems.length > 1}
                                                            >
                                                                Release
                                                            </Button>
                                                        </large>
                                                    </td>
                                                </tr>
                                            ) : null // Skip rendering if name or email is missing
                                        ))}

                                    </tbody>
                                </Table>
                            )
                        )}
                    </div>
                    <div className="pagination-container">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                                key={index}
                                variant={index + 1 === pageNumber ? 'primary' : 'secondary'}
                                onClick={() => setPageNumber(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </Card>

            </div>
        </>
    );
}

export default TradesTable;
