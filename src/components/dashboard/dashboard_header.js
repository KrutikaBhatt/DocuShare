import React from 'react';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/AddBox";
import AppIcon from  "@material-ui/icons/Apps";
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Logo from 'components/logo';

export default function DashboardHeader() {
    return (
        <div className="header">
            <div className="header_left">
                <MenuIcon className="header_icon"/>
                <Logo/>
            </div>
            <div className="header_input">
                <input type="text" placeholder="Search documents" className="input_box"/>
                <SearchIcon className="header_inputbutton"/>
            </div>
            <div className="header_icons">
                <AddIcon className="header_icon add_icon"/>
                <AppIcon className="header_icon"/>
                <NotificationsIcon className="header_icon"/>
                <img src="https://i.postimg.cc/PJJ8WHSW/avatars.png" alt="Krutika Bhatt" className="avatar_icon"/>
                <ArrowDropDownIcon className="header_icon" />
            </div>
            
        </div>
    );
}