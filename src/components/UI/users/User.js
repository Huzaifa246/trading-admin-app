import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./user.css";
import { useSidebar } from '../../../store';
import UserTableComp from '../../table/table';
import HeaderComponent from '../../header/header';

function User() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
        <HeaderComponent />
        <UserTableComp />
      </div>
    </>
  )
}

export default User;