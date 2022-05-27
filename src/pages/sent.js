import React from 'react';
import DashboardHeader from 'components/dashboard/dashboard_header';
import Sidebar from 'components/dashboard/sidebar';
import MainSectionsent from './mainsectionsent';
export default function sent() {
    return (
        <div>
            <DashboardHeader />
            <div className="dashboard_page">
                <Sidebar />
                <MainSectionsent /> 
            </div>
        </div>
        
    );
}
