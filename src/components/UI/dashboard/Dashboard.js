import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSidebar } from '../../../store';
import "./dashboard.css";

function Dashboard() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
        <h1>
          DASHBOARD
        </h1>
      </div>
    </>
  )
}

export default Dashboard;