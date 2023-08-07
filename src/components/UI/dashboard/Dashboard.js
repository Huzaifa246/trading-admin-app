import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../../header/header';
import TableComp from './../../table/table';

function Dashboard() {
  return (
    <>
      {/* <SidebarProvider> */}
        <Header />
        <TableComp />
      {/* </SidebarProvider> */}
    </>
  )
}

export default Dashboard;