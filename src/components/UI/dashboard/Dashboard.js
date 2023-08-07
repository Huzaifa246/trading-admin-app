import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../../header/header';
import TableComp from './../../table/table';
import { useSidebar } from '../../../store';
import "./dashboard.css";

function Dashboard() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      {/* <SidebarProvider> */}
      <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
        <Header />
        <TableComp />
      </div>
      {/* </SidebarProvider> */}
    </>
  )
}

export default Dashboard;