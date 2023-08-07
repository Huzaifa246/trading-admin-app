import React from 'react';
import TradesTable from './TradesTable/TradesTable';
import { useSidebar } from '../../../store';
import './Trades.css';

function Trades() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'trades-open' : ''}`}>
        <TradesTable />
      </div>
    </>
  )
}

export default Trades
