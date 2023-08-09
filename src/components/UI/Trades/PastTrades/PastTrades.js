import React from 'react';
import './pastTrad.css';
import { useSidebar } from '../../../../store';

function PastTrades() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'past-trades-open' : ''}`}>
      <div style={{ marginTop: "6rem" }}>

</div>
        <h1>
            Past Data
        </h1>
      </div>
    </>
  )
}

export default PastTrades;
