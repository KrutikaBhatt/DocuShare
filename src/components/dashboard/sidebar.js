import React from 'react';
import SidebarRow from './sidebarRow';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarRow title="Inbox" Icon={DraftsIcon}/>
            <SidebarRow title="Sent" Icon={SendIcon}/>
            <SidebarRow title="Important" Icon={LabelImportantIcon}/>
            <SidebarRow title="Deleted" Icon={DeleteIcon}/>
            <hr />
            <SidebarRow title="Inbox" Icon={DraftsIcon}/>
            <SidebarRow title="Sent" Icon={SendIcon}/>
            <SidebarRow title="Important" Icon={LabelImportantIcon}/>
            <SidebarRow title="Deleted" Icon={DeleteIcon}/>
            <SidebarRow title="Important" Icon={LabelImportantIcon}/>
            <SidebarRow title="Deleted" Icon={DeleteIcon}/>
        </div>
    );
}