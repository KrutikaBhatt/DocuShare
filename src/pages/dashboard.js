import React from 'react';
import DashboardHeader from 'components/dashboard/dashboard_header';
import Sidebar from 'components/dashboard/sidebar';
import MainSection from 'components/dashboard/maindocuments';
export default function Dashboard() {
    return (
        <div>
            <DashboardHeader />
            <div className="dashboard_page">
                <Sidebar />
                <MainSection /> 
            </div>
        </div>
        
    );
}
