import React from 'react';

export default function SidebarRow({ title, Icon }) {
    return (
        <div className="sidebar_row">
            <Icon />
           <h2>{title}</h2>
        </div>
    );
}