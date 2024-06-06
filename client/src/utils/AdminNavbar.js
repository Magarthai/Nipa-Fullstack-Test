import React from 'react';
import '../css/component_css/adminnavbar.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import { useUserAuth } from '../context/UserAuthContext';
import profile from '../img/Profile_1.png'
import nipalogo from '../img/R_1.png'
import nipalogo2 from '../img/Logo-EPc-2_-_Copy.png'
import Dashboard from '../img/Control_Panel.png'
import Ticket from '../img/Charity_Box.png'
import History from '../img/Admin_Settings_Male.png'
const AdminNavbar = ({ userData,clicked }) => {
  const normal_profile = profile;
  const navigate = useNavigate()
  const { logout_global } = useUserAuth();
  const hoverHandle = (e) => {
    const x = document.getElementsByClassName('hover-list')[0]; // Select the first element with class 'hover-list'
    console.log(e)
    if (e === "nav-1") {
      x.classList.add('hover1');
    } else if (e === "nav-12") {
      x.classList.remove('hover1');
    } else if (e === "nav-2") {
      x.classList.add('hover2');
    } else if (e === "nav-22") {
      x.classList.remove('hover2');
    } else if (e === "nav-3") {
      x.classList.add('hover3');
    } else if (e === "nav-32") {
      x.classList.remove('hover3');
    }
  };
  const API = process.env.REACT_APP_API;
  const logout = async() => {
    try{
      const logout = await axios.get(`${API}/logout`, {
        withCredentials: true 
    });
    logout_global();

    if(logout.data == "success") {
      Swal.fire({
        icon: "success",
        title: "ล็อคเอ้าสําเร็จ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: '#263A50',
      }).then((result) => {
        if (result.isConfirmed) {
            navigate('/');
        } else {
          navigate('/');
        }
      });
    } else if (logout.data == "not found token") {
      Swal.fire({
        icon: "error",
        title: "ไม่พบ Token",
        confirmButtonText: "ตกลง",
        confirmButtonColor: '#263A50',
      }).then((result) => {
        if (result.isConfirmed) {
            navigate('/');
        } else {
          navigate('/');
        }
      });
    }
    } catch(e){
      console.error(e);
    }
  };

  return (
    <div className={ clicked ? "navbar-container-clicked" :"navbar-container"}>
      <div className="navbar">
        <div className="top">
          <div className='navbar-center'>
            <img className='nipa-logo-navbar' src={nipalogo} alt="nipa logo" />
          </div>
          <div className="navbar-profile navbar-center">
            <img className='profile-img' src={userData.img === undefined ? normal_profile : ""} alt="" />
            {userData && <p>{userData.fname} {userData.lname}</p>}
          </div>
          <div className="navbar-center">
            <div className="navbar-line"></div>
          </div>
          <div className="navbar-list">
            <div className="hover-list"></div>
            <a href='/homepage' className="light navbar-dashboard" id="nav-1" onMouseEnter={() => hoverHandle("nav-1")} onMouseLeave={() => hoverHandle("nav-12")}>
              <img src={Dashboard} alt="dashboard" />
              <p>Dashboard</p>
            </a>
            <a href='/ticket' className="light navbar-dashboard" id="nav-2" onMouseEnter={() => hoverHandle("nav-2")} onMouseLeave={() => hoverHandle("nav-22")}>
              <img src={Ticket} alt="ticket" />
              <p>Ticket</p>
            </a>
            <a href='/ticketHistory' className="light navbar-dashboard" id="nav-3" onMouseEnter={() => hoverHandle("nav-3")} onMouseLeave={() => hoverHandle("nav-32")}>
              <img src={History} alt="admin manager" />
              <p>History</p>
            </a>
          </div>
        </div>
        <div className="bottom">
          <button className='bold logout-button' style={{cursor:"pointer"}} onClick={() => logout()}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
