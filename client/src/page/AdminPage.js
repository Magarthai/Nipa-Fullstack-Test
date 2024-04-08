import React, { useEffect, useState } from 'react';
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext';
import '../css/page_css/adminpage.css';
import { AreaChart, Area, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts'
function AdminPage() {
  const { userData } = useUserAuth();
  const [statusInfo, setStatusInfo] = useState({});

  const fetchStatusInfo = () => {
    const info = {
      pending: 10,
      accepted: 20,
      success: 30,
      reject: 10
    };
    setStatusInfo(info);
  };

  const data = [
    { date: 'วันที่ 1', value: 67 },
    { date: 'วันที่ 2', value: 23 },
    { date: 'วันที่ 3', value: 88 },
    { date: 'วันที่ 4', value: 41 },
    { date: 'วันที่ 5', value: 12 },
    { date: 'วันที่ 6', value: 95 },
    { date: 'วันที่ 7', value: 32 },
    { date: 'วันที่ 8', value: 77 },
    { date: 'วันที่ 9', value: 5 },
    { date: 'วันที่ 10', value: 56 },
    { date: 'วันที่ 11', value: 89 },
    { date: 'วันที่ 12', value: 73 },
    { date: 'วันที่ 13', value: 40 },
    { date: 'วันที่ 14', value: 83 },
    { date: 'วันที่ 15', value: 27 },
    { date: 'วันที่ 16', value: 59 },
    { date: 'วันที่ 17', value: 92 },
    { date: 'วันที่ 18', value: 14 },
    { date: 'วันที่ 19', value: 76 },
    { date: 'วันที่ 20', value: 99 },
    { date: 'วันที่ 21', value: 38 },
    { date: 'วันที่ 22', value: 10 },
    { date: 'วันที่ 23', value: 81 },
    { date: 'วันที่ 24', value: 50 },
    { date: 'วันที่ 25', value: 33 },
    { date: 'วันที่ 26', value: 69 },
    { date: 'วันที่ 27', value: 48 },
    { date: 'วันที่ 28', value: 17 },
    { date: 'วันที่ 29', value: 72 },
    { date: 'วันที่ 30', value: 64 }
  ]

  const data4 = [
    { name: 'Success', value: 100, fill: '#1f77b4' },
    { name: 'Reject', value: 50, fill: '#ff7f0e' },
  ];

  const barColors = ["#1f77b4", "#ff7f0e"]
  useEffect(() => {
    fetchStatusInfo();
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="admin-container">
      <AdminNavbar userData={userData} />
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
        <div>
          <div className="dashboard-container">
            <div className="line-graph">
              <h1 className='light'>กราฟจํานวน Ticket ในเดือนนี้</h1>
              <ResponsiveContainer width="100%" height={300} style={{ padding: "0 1%" }} className={"test"}>
                <AreaChart width={500} height={300} data={data}>
                  <defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="30%" stopColor='#0d78b6' stopOpacity={0.4}></stop>
                      <stop offset="85%" stopColor='#8ed2e7' stopOpacity={0}></stop>
                    </linearGradient>
                  </defs>

                  <Tooltip />
                  <Area type="monotone" dataKey="value" fill='url(#colorview)' />
                  <YAxis type="number" tick={{ fontSize: 10 }} />
                  <XAxis type="category" dataKey="date" tick={{ fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bar-chart">
              <ResponsiveContainer width="100%" height="100%" style={{ padding: "15px"}}>
                <BarChart
                  width={500}
                  height={300}
                  data={data4}
  
                  layout="vertical"
                >
                  <defs>
                    <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1D976C" stopOpacity={1} />
                      <stop offset="100%" stopColor="#93F9B9" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="rejectGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b31217" stopOpacity={1} />
                      <stop offset="100%" stopColor="#e52d27" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} domain={[1, 5]} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {
                      data4.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Success' ? 'url(#successGradient)' : 'url(#rejectGradient)'} />
                      ))
                    }
                  </Bar>
                </BarChart>


              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminPage