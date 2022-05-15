import React, { useState,useEffect} from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/AddBox";
import AppIcon from  "@material-ui/icons/Apps";
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Form  from 'react-bootstrap/Form';
import Logo from 'components/logo';
import UploadDocImage from 'assets/images/add_doc.png';
import axios from "axios"
import create_new from './create_new';
import { CenterFocusWeakTwoTone } from "@material-ui/icons";


export default function DashboardHeader() {
    const [New_doc,setNew] = useState(false);

    return (
        <>
        {New_doc && (
            <div className="create_new_document">
                <div style={{display:'flex',border:'1px solid lightgray'}}>
                    <div style={{ margin: 'auto',color: 'black',border:'gray' }}>Create New Document</div>
                    <button
                    style={{
                        backgroundColor: '#357edd',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '8px',
                        width:'40px',
                    }}
                    onClick={() => setNew(false)}
                    >X</button>
                </div>
                <div className="form_description">
                <div className="form__inline">
                        <div className="form__label">Sender : </div>
                        <div className="form__label">  Krutika Bhatt</div>
                    </div>
                    <hr/>
                    <Form.Group controlId="formName" className="form__inline">
                        <Form.Label className="form__label">Recepients: </Form.Label>
                        <Form.Control type="text" placeholder="Enter receivers" required/>
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="formName" className="form__inline">
                        <Form.Label className="form__label">Title: </Form.Label>
                        <Form.Control type="text" placeholder="title" required/>
                    </Form.Group>
                    <hr/>
                    <div style={{display:'block',textAlign:'center',cursor:'pointer'}}>
                        <img src={UploadDocImage} height="100px"/>
                        <h4>Upload File</h4>
                    </div>
                </div>
            </div>
            
        )}
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
                <AddIcon className="header_icon add_icon"  onClick={() => setNew(true)}/>
                <AppIcon className="header_icon"/>
                <NotificationsIcon className="header_icon"/>
                <img src="https://i.postimg.cc/PJJ8WHSW/avatars.png" alt="Krutika Bhatt" className="avatar_icon"/>
                <ArrowDropDownIcon className="header_icon" />
            </div>
            
        </div>
        </>
    );
}