import React, { useEffect, useState } from 'react';
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext';
import axios from 'axios'
import '../css/page_css/adminpage.css';
import GraphSkeleton from '../utils/graphSkeleton.js';
import CountSkeleton from '../utils/CountSkeleton.js';
import HambergerBar from '../utils/HambergerBar.js';
import { AreaChart, Area, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts'

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUserAuth();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [statusInfo, setStatusInfo] = useState({});
  const [clicked, setClicked] = useState(false); 
  const API = process.env.REACT_APP_API

  useEffect(() => {
    fetchStatusInfo();
  }, []); 

  const fetchStatusInfo = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/getStatusCount`);
      if (response.data) {
        setStatusInfo(response.data);
      }
      const response2 = await axios.get(`${API}/dashboard/getMonthTicket`);
      if (response2.data) {
        setData(response2.data);
      }
      const response3 = await axios.get(`${API}/dashboard/getSuccessErrorCount`);
      if (response3.data) {
        setData2(response3.data);
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <div className="admin-container">
      <HambergerBar clicked={clicked} toggleClicked={toggleClicked} />
      <AdminNavbar clicked={clicked} userData={userData} />
      <div className='adminpage-header background-color'></div>
      <div className="leftside">
        {isLoading ? <CountSkeleton></CountSkeleton> : (
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
              <div className="status-img accepted">
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
        )}
        {isLoading ? <GraphSkeleton></GraphSkeleton> : (
        <div>
          <div className="dashboard-container">
            <div className="line-graph">
              <h1 className='light'>กราฟจํานวน Ticket ในเดือนนี้</h1>
              <ResponsiveContainer width="100%" height={300} style={{ padding: "0 1%" }}>
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
              <ResponsiveContainer width="100%" height="100%" style={{ padding: "15px" }}>
                <BarChart
                  width={500}
                  height={300}
                  data={data2}

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
                      data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Success' ? 'url(#successGradient)' : 'url(#rejectGradient)'} />
                      ))
                    }
                  </Bar>
                </BarChart>


              </ResponsiveContainer>
            </div>
          </div>
        </div>
        )}
      </div>

    </div>
  )
}

export default AdminPage