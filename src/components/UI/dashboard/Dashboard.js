import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../../header/header';
import TableComp from './../../table/table';
import { SidebarProvider } from '../../../store';

function Dashboard() {
  return (
    <>
      <SidebarProvider>
        <Header />
        <TableComp />
      </SidebarProvider>
    </>
  )
}

export default Dashboard;