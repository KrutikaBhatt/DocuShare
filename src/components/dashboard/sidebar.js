import React from 'react';
import SidebarRow from './sidebarRow';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import DeleteIcon from '@material-ui/icons/Delete';
import SnoozeIcon from '@material-ui/icons/Snooze';
import InboxIcon from '@material-ui/icons/Inbox'
import ScheeduleIcon from '@material-ui/icons/Schedule'
import SpamIcon from '@material-ui/icons/HelpOutline'
import NoteIcon from '@material-ui/icons/Note'
export default function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarRow title="Inbox" Icon={InboxIcon}/>
            <a href="/sent"><SidebarRow title="Sent" Icon={SendIcon}/></a>
            <SidebarRow title="Important" Icon={LabelImportantIcon}/>
            <SidebarRow title="Deleted" Icon={DeleteIcon}/>
            <hr />
            <SidebarRow title="Snoozed" Icon={SnoozeIcon}/>
            <SidebarRow title="Drafts" Icon={DraftsIcon}/>
            <SidebarRow title="Scheduled" Icon={ScheeduleIcon}/>
            <SidebarRow title="Spam" Icon={SpamIcon}/>
            <SidebarRow title="Label" Icon={LabelImportantIcon}/>
            <SidebarRow title="Notes" Icon={NoteIcon}/>
        </div>
    );
}