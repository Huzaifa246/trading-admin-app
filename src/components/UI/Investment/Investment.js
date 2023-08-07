import React from 'react'
import InvestmentTable from './InvestmentTable/InvestmentTable';
import { useSidebar } from '../../../store';
import './invest.css';

function Investment() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'invest-open' : ''}`}>
        <InvestmentTable />
      </div>
    </>
  )
}

export default Investment
