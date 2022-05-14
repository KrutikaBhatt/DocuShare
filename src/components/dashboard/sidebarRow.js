import React from 'react';

export default function SidebarRow({ selected, title, Icon }) {
    return (
        <div className={`sidebar_row ${selected && "selected"}`}>
            <Icon className="sidebarRow_icon"/>
           <h2 className="sidebarRow_title">{title}</h2>
        </div>
    );
}