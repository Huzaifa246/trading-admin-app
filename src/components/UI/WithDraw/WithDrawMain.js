import React from 'react'
import { useSidebar } from '../../../store'
import WithDraw from './withDraw/WithDraw';

function WithDrawMain() {
    const { isSidebarOpen } = useSidebar();

    return (
        <>
            <div className={`main-table-class ${isSidebarOpen ? 'user-table-open' : ''}`}>
                <WithDraw />
            </div>
        </>
    )
}

export default WithDrawMain
