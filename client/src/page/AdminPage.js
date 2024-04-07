import React, { useEffect, useState } from 'react';
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext';
import '../css/page_css/adminpage.css'
function AdminPage() {
  const { userData } = useUserAuth();
  const [statusInfo, setStatusInfo] = useState({})

  const fetchStatusInfo = () => {
    const info = {
      pending: 10,
      accepted: 20,
      success: 30,
      reject: 10
    }

    setStatusInfo(info)
  }
  useEffect(() => {
    fetchStatusInfo();
  })
  return (
    <div className="admin-container">
      <AdminNavbar userData={userData}></AdminNavbar>
      <div className='adminpage-header background-color'></div>
      <div className="leftside">
      <div className="summary-status-container">
        <div className="summary-status-card">
          <div className="info">
            <h1 className='light'>Pending</h1>
            {statusInfo && <span className='extralight'>{statusInfo.pending}&nbsp;รายการ</span>}
          </div>
          <div className="status-img pending">
            <img src="https://media.discordapp.net/attachments/445928139021877259/1226597902596571216/Group.png?ex=66255951&is=6612e451&hm=c9350934360d3a5cb03d5bab5826e5697b132f68d69b682d7b28b1154b18082d&=&format=webp&quality=lossless" alt="pending" />
          </div>
        </div>
        <div className="summary-status-card">
        <div className="info">
            <h1 className='light'>Accepted</h1>
            {statusInfo && <span className='extralight'>{statusInfo.accepted}&nbsp;รายการ</span>}
          </div>
          <div className="status-img accept">
            <img src="https://media.discordapp.net/attachments/445928139021877259/1226597902856749106/Meeting_Time.png?ex=66255951&is=6612e451&hm=0a5b210c2b113d9c2e614aa32283892babf8fc730ffc3be764725f05460410a0&=&format=webp&quality=lossless" alt="accepted" />
          </div>
          
        </div>
        <div className="summary-status-card">
        <div className="info">
            <h1 className='light'>Success</h1>
            {statusInfo && <span className='extralight'>{statusInfo.success}&nbsp;รายการ</span>}
          </div>
          <div className="status-img success">
            <img src="https://media.discordapp.net/attachments/445928139021877259/1226597903087308842/Ok.png?ex=66255951&is=6612e451&hm=577726e0f2a2f13cee08eb34845a52b1f62bafa7a42e10ff0a4c44f6fa310c73&=&format=webp&quality=lossless" alt="success" />
          </div>
        </div>
        <div className="summary-status-card">
        <div className="info">
            <h1 className='light'>Rejected</h1>
            {statusInfo && <span className='extralight'>{statusInfo.reject}&nbsp;รายการ</span>}
          </div>
          <div className="status-img reject">
            <img src="https://media.discordapp.net/attachments/445928139021877259/1226597902349111336/Cancel.png?ex=66255951&is=6612e451&hm=68b3f78ea5d25528c45496163533d5a1e38537531fc5852fe41ad5cf8af9f178&=&format=webp&quality=lossless" alt="reject" />
          </div>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default AdminPage