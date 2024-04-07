import React from 'react'
import '../css/component_css/adminnavbar.css'
const AdminNavbar = ({userData}) => {
    const normal_profile = "https://cdn.discordapp.com/attachments/445928139021877259/1226572102023249981/Profile_1.png?ex=66254149&is=6612cc49&hm=9011b51c7fbd8cdc9261af8451eecd56f74e1133f18788965b0c229d276d7d95&"
  return (
    <div className="navbar-container">
        <div className="navbar">
            <div className="top">
                <div className='navbar-center'>
                <img className='nipa-logo-navbar' src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="nipa logo" />
                </div>
                <div className="navbar-profile navbar-center">
                <img className='profile-img' src={userData.img == undefined ? "https://cdn.discordapp.com/attachments/445928139021877259/1226572102023249981/Profile_1.png?ex=66254149&is=6612cc49&hm=9011b51c7fbd8cdc9261af8451eecd56f74e1133f18788965b0c229d276d7d95&" : ""} alt="" />
                    {userData && <p>{userData.fname} {userData.lname}</p>}
                </div>
                <div className="navbar-center"><div className="navbar-line"></div></div>
                
                <div className="light navbar-dashboard">
                    <img src="https://cdn.discordapp.com/attachments/445928139021877259/1226575388310900927/Control_Panel.png?ex=66254459&is=6612cf59&hm=1e820415fd7c19ed16c7585fa6dfb9f9cb268b21e887c979cff9e06df191291e&" alt="dashboard" />
                    <p>Dashboard</p>
                </div>
                <div className="light navbar-dashboard">
                    <img src="https://media.discordapp.net/attachments/445928139021877259/1226575387979677726/Charity_Box.png?ex=66254459&is=6612cf59&hm=63e4956b9bfbc721d3f5b7d3600252e42ac0359601278af6d1b658a5780d12fe&=&format=webp&quality=lossless" alt="ticket" />
                    <p>Ticket</p>
                </div>
                <div className="light navbar-dashboard">
                    <img src="https://media.discordapp.net/attachments/445928139021877259/1226575388675932230/Admin_Settings_Male.png?ex=66254459&is=6612cf59&hm=fac01dd7acf69fbb8019cd9e2ba197fe020ecf9c0309f6aae20672126279cbf0&=&format=webp&quality=lossless" alt="admin manager" />
                    <p>Admin Manager</p>
                </div>
                
            </div>
            <div className="bottom">
                <button>LOGOUT</button>
            </div>
        </div>
    </div>
  )
}

export default AdminNavbar