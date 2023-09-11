import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import React,
{
    useState, useEffect,
    Table, Card, FontAwesomeIcon, Button,
    faSearch
}
    from "../../../../../Services/Imports/ImportsItems"
import "./PastTable.css"
import Pagination from 'react-bootstrap/Pagination';
import fetchAllTradeOption from './../../../../../Services/getAllTradeOption';
import { Calendar } from "react-feather";
import fetchPastUserTrade from "../../../../../Services/getPastUserTrade";
import Loader from '../../../../Loader/Loader';
import { formatDateTime } from './../../../../../Services/DataFormat/DateFormat';

function PastTable() {
    const [tradeOptions, setTradeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("silver");
    const [pastUserTradeData, setPastUserTradeData] = useState([]);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [totalInvestors, setTotalInvestors] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [pageNumber, setPageNumber] = useState(1); // Initialize with the starting page
    const [totalPages, setTotalPages] = useState(1);
    const [apiResponse, setApiResponse] = useState(null); // Add this state variable

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
    //fetching options from api
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            setIsLoading(false);
            // console.log(decryptedData.data)
        }
        fetchData();
    }, []);


    const handleOptionClick = async (optionName) => {
        setSelectedOption(optionName);
        setPageNumber(pageNumber);
        setIsButtonActive(true);
        setIsLoading(true);

        const response = await fetchPastUserTrade(optionName, pageNumber);
        // console.log(response, "opt res")
        if (response?.data?.investmentFound) {
            const pastUserTradeData = response.data.investmentFound || '';
            // console.log(pastUserTradeData, "option")
            setPastUserTradeData(pastUserTradeData);
        }
        else {
            setPastUserTradeData([]);
        }

        setIsLoading(false);
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

            const response = await fetchPastUserTrade(selectedOption, pageNumber, searchQuery, startDate, endDate);
            //Calculating investors and investments
            const userObjectsArray = response?.data?.investmentFound || [];
            let totalInv = 0;
            for (const userId in userObjectsArray) {
                totalInv += userObjectsArray[userId].totalInvestment || 0;
            }
            setTotalInvestment(totalInv);
            setTotalInvestors(Object.keys(userObjectsArray).length);
            //------------- 
            console.log(response, "res")
            if (response?.data?.investmentFound && Array.isArray(response.data.investmentFound)) {
                const pastUserTradeData = response.data.investmentFound;
                setPastUserTradeData(pastUserTradeData);
                console.log(pastUserTradeData);
            } else {
                setPastUserTradeData([]); // Set to an empty array or handle differently
            }
        }

        fetchData();
    }, [selectedOption, pageNumber, selectedRange, searchQuery]);
    return (
        <>
            <Card className='trade-option-card'>
                <div className='buttons-container'>
                    {tradeOptions?.map((option, index) => (
                        <Button
                            key={index}
                            className={`btn-trades-style ${selectedOption === option.name && isButtonActive ? 'active' : ''}`}
                            variant={selectedOption === option.name ? 'primary' : 'outline-primary'}
                            onClick={() => handleOptionClick(option.name)}
                        >
                            {option.name.toUpperCase()}
                        </Button>
                    ))}
                </div>
            </Card>
            <Card>
                <div className='table-TT-Past'>
                    <span style={{ textAlign: 'left', marginBottom: '0' }} className='market-heading'>Past Investment</span>
                    <div className='main-total-past-style'>
                        <div className='total-card-past'>Total Investors: {totalInvestors}</div>
                        <div className='total-card-past'>Total Amount: ${totalInvestment.toFixed(2)}</div>
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
                                />
                            </div>
                        )}
                    </div>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    (pastUserTradeData.length === 0) ? (
                        <div className="no-data-message">No data found!!!</div>
                    ) : (
                        <Table striped className='main-table'>
                            <thead className='table-heading-style'>
                                <tr>
                                    <th className='th-trades-class'>Date</th>
                                    <th className='th-trades-class'>Name</th>
                                    <th className='th-trades-class'>Email</th>
                                    <th className='th-trades-class'>Past Investment</th>
                                    <th className='th-trades-class'>Deleted Account</th>
                                    <th className='th-trades-class'>Profit Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {Array.isArray(filteredPastUsers) && filteredPastUsers.map((item, index) => ( */}
                                {/* {Array.isArray(pastUserTradeData) && pastUserTradeData.map((itemsArray, outerIndex) => (
                                    Array.isArray(itemsArray) && itemsArray.map((userDetail, innerIndex) => ( */}
                                {Array.isArray(pastUserTradeData) && pastUserTradeData.map((userDetail, index) => (
                                    userDetail.name && userDetail.email ? (
                                        <tr key={index}>
                                            <td className='td-TradTable'>
                                                <large className="currency-style">{formatDateTime(userDetail?._id?.invesAt) || ''}</large>
                                            </td>
                                            <td className='td-TradTable'>
                                                <large className="large-text">{userDetail?.name || ""}</large>
                                            </td>
                                            <td className='td-TradTable'>
                                                <large className="large-text">{userDetail?.email || ""}</large>
                                            </td>
                                            <td style={{ color: 'black' }} className='td-TradTable'>
                                                <small>
                                                    {userDetail?.totalInvestment || ""}
                                                </small>
                                            </td>
                                            <td>
                                                <span className={`badge badge-style ${userDetail?.account_deleted ? 'bg-danger' : 'bg-success'}`}>
                                                    {userDetail?.account_deleted ? 'True' : 'False'}
                                                </span>
                                            </td>
                                            <td style={{ color: 'black' }} className='td-TradTable'>
                                                <small>{userDetail?.totalProfit.toFixed(3) || ""}</small>
                                            </td>
                                        </tr>
                                    ) : null // Skip rendering if name or email is missing
                                ))}

                            </tbody>
                        </Table>
                    )
                )}
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
        </>
    )
}

export default PastTable
