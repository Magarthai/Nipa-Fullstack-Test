import React from 'react';
import '../css/component_css/adminnavbar.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import { useUserAuth } from '../context/UserAuthContext';
const AdminNavbar = ({ userData,clicked }) => {
  const normal_profile = "https://cdn.discordapp.com/attachments/445928139021877259/1226572102023249981/Profile_1.png?ex=66254149&is=6612cc49&hm=9011b51c7fbd8cdc9261af8451eecd56f74e1133f18788965b0c229d276d7d95&";
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
      const logout = await axios.get(`${API}/user/logout`, {
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
            <img className='nipa-logo-navbar' src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="nipa logo" />
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
              <img src="https://cdn.discordapp.com/attachments/445928139021877259/1226575388310900927/Control_Panel.png?ex=66254459&is=6612cf59&hm=1e820415fd7c19ed16c7585fa6dfb9f9cb268b21e887c979cff9e06df191291e&" alt="dashboard" />
              <p>Dashboard</p>
            </a>
            <a href='/ticket' className="light navbar-dashboard" id="nav-2" onMouseEnter={() => hoverHandle("nav-2")} onMouseLeave={() => hoverHandle("nav-22")}>
              <img src="https://media.discordapp.net/attachments/445928139021877259/1226575387979677726/Charity_Box.png?ex=66254459&is=6612cf59&hm=63e4956b9bfbc721d3f5b7d3600252e42ac0359601278af6d1b658a5780d12fe&=&format=webp&quality=lossless" alt="ticket" />
              <p>Ticket</p>
            </a>
            <a href='/ticketHistory' className="light navbar-dashboard" id="nav-3" onMouseEnter={() => hoverHandle("nav-3")} onMouseLeave={() => hoverHandle("nav-32")}>
              <img src="https://media.discordapp.net/attachments/445928139021877259/1226575388675932230/Admin_Settings_Male.png?ex=66254459&is=6612cf59&hm=fac01dd7acf69fbb8019cd9e2ba197fe020ecf9c0309f6aae20672126279cbf0&=&format=webp&quality=lossless" alt="admin manager" />
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
