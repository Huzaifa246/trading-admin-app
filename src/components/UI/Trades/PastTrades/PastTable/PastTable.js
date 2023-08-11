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

    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [pageNumber, setPageNumber] = useState(1); // Initialize with the starting page
    const [totalPages, setTotalPages] = useState(1);

    const filteredPastUsers = pastUserTradeData.filter(user =>
        user?.fullName && user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    };
    //fetching options from api
    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            // console.log(decryptedData.data)
        }
        fetchData();
    }, []);


    const handleOptionClick = async (optionName) => {
        setSelectedOption(optionName);
        setPageNumber(1);
        setIsButtonActive(true);
        setIsLoading(true);

        const response = await fetchPastUserTrade(optionName, 1);
        const pastUserTradeData = response?.data?.investmentFound?.map(item => item?.userDetails) || [];
        console.log(pastUserTradeData)
        setPastUserTradeData(pastUserTradeData);

        setIsLoading(false);
    };

useEffect(() => {
    async function fetchData() {
        let startDate = null;
        let endDate = null;
        if (selectedRange.startDate) {
            startDate = selectedRange.startDate.toISOString().split('T')[0];
        }

        if (selectedRange.endDate) {
            endDate = selectedRange.endDate.toISOString().split('T')[0];
        }

        const response = await fetchPastUserTrade(selectedOption, pageNumber, startDate, endDate);
        const pastUserTradeData = response?.data?.investmentFound?.map(item => item?.userDetails) || [];
        setPastUserTradeData(pastUserTradeData);
    }

    fetchData();
}, [selectedOption, pageNumber, selectedRange]);

    
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
                {isLoading ? (
                    <Loader />
                ) : filteredPastUsers.length === 0 ? (
                    <div className="no-data-message">No data found, Select Date Range.</div>
                ) : (
                    <Table striped className='main-table'>
                        <thead className='table-heading-style'>
                            <tr>
                                <th className='th-trades-class'>Date</th>
                                <th className='th-trades-class'>Name</th>
                                <th className='th-trades-class'>Email</th>
                                <th className='th-trades-class'>Past Investment</th>
                                <th className='th-trades-class'>Profit Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredPastUsers) && filteredPastUsers.map((item, index) => (
                                item ? (
                                    <tr key={index}>
                                        <td className='td-TradTable'>
                                            <large className="currency-style">{formatDateTime(item?.created_at) || ''}</large>
                                        </td>
                                        <td className='td-TradTable'>
                                            <large className="large-text">{item?.fullName || ""}</large>
                                        </td>
                                        <td className='td-TradTable'>
                                            <large className="large-text">{item?.email || ""}</large>
                                        </td>
                                        <td style={{ color: 'black' }} className='td-TradTable'>
                                            <small>
                                                {item.trades.reduce(
                                                    (totalInvestment, trade) => totalInvestment + trade.total_investment,
                                                    0
                                                )}
                                            </small>
                                        </td>
                                        <td style={{ color: 'black' }} className='td-TradTable'>
                                            <small>{item?.profit.toFixed(3)}</small>
                                        </td>
                                    </tr>
                                ) : null
                            ))}

                        </tbody>
                    </Table>
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
