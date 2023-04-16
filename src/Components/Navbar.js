// import React from 'react'
import React, { useState, useEffect } from "react";
import "../Stylesheets/Navbar.scss";
// import { store } from '../store/Store';
// import Logo from '../assets/Logo.png';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap-daterangepicker/daterangepicker.css';
import "bootstrap/dist/css/bootstrap.css";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Navbar(props) {
  const [Logout, setLogout] = useState(false);
  const [username, setUsername] = useState();
  const [Role, setRole] = useState("");

  useEffect(()=>{
    const div=localStorage.getItem("logindetails")
    if(div){
     const dict=JSON.parse(div)
     console.log(dict.session.token)
     if(dict.session.token !=null){
      //  setLoggedin(true)
       console.log(dict.data.email)
       setUsername(dict.data.email)
       setRole(dict.data.role)
     }
    }
  },[])

  return (
    <div className={`navbar_warpper ${props.Mobilebar ? "activate" : ""}`}>
      <div className="navbar_warpper_inner">
        <div className="Headers">
          <i className="Searchicon">
            <SearchIcon></SearchIcon>
          </i>
          <input
            type={"text"}
            name={"Search"}
            placeholder="Search..."
            onChange={(e) => {
              // props.setSearchval(e.target.value);
              props.handleSearch(e.target.value)
            }}
          ></input>
        </div>
        {/* <div className={`Headers ${props.Mobilebar ? "" : "activate"}`}><img src={Logo} width={30} height={30}></img>A2D</div> */}
      </div>
      <div className="NotifcationCenter">
        <div>
          <span>
            <GroupIcon></GroupIcon>
          </span>
          <span>
            <SettingsIcon></SettingsIcon>
          </span>
          <span>
            <NotificationsNoneIcon></NotificationsNoneIcon>
          </span>
        </div>
      </div>
      <div
        className="login_section"
        onClick={(e) => {
          setLogout(!Logout);
        }}
      >
        {username}
        <i>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </i>
        <i className="Profileicon">
          <AccountCircleIcon></AccountCircleIcon>
        </i>
        <div
          className={`Logout ${Logout ? "active" : ""}`}
          onClick={(e) => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <p>User: {Role == 1 ? "Admin" : "Trainer"}</p>
          <p>UserName: {username}</p>
          <button className="logoutButton">Logout</button>
        </div>
      </div>
    </div>
  );
}
