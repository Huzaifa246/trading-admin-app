import React from 'react'
import { useSidebar } from '../../../../store';

function Settings() {

    const { isSidebarOpen } = useSidebar();
    return (
        <>
            <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
                <h1>
                    Settings Page
                </h1>
            </div>
        </>
    )
}

export default Settings
