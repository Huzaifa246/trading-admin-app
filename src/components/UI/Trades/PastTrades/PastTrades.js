import React from 'react';
import './pastTrad.css';
import { useSidebar } from '../../../../store';
import PastTable from './PastTable/PastTable';

function PastTrades() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'past-trades-open' : ''}`}>
        <div style={{ marginTop: "6rem" }}>
        </div>
        <PastTable />
      </div>
    </>
  )
}

export default PastTrades;
