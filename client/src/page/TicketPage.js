import React, { useEffect, useState } from 'react';
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import '../css/page_css/ticketpage.css';
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

  let data = [
    {
      _id:"66129ea510cb3d209a31545f",
      name:"MagarThai",
      email:"magargame@gmail.com",
      detail:"fiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpo",
      selectTopic:"ปัญหาเซิฟเวอร์",
      status: "pending",
      img:"https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/ticket_images%2Ftransection_issue.png-1712496293119?alt=media&token=9bf5d695-4e57-40ca-b29c-2874b9df2f07",
      createdAt:"2024-04-07T13:24:53.630+00:00",
      updatedAt:"2024-04-07T13:24:53.630+00:00"
    },
    {
      _id:"66129ea510cb3d209a31545f",
      name:"MagarThai",
      email:"magargame@gmail.com",
      detail:"fiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpo",
      selectTopic:"ปัญหาเซิฟเวอร์",
      status: "pending",
      img:"https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/ticket_images%2Ftransection_issue.png-1712496293119?alt=media&token=9bf5d695-4e57-40ca-b29c-2874b9df2f07",
      createdAt:"2024-04-07T13:24:53.630+00:00",
      updatedAt:"2024-04-07T13:24:53.630+00:00"
    },
    {
      _id:"66129ea510cb3d209a31545f",
      name:"MagarThai",
      email:"magargame@gmail.com",
      detail:"fiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpo",
      selectTopic:"ปัญหาเซิฟเวอร์",
      status: "success",
      img:"https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/ticket_images%2Ftransection_issue.png-1712496293119?alt=media&token=9bf5d695-4e57-40ca-b29c-2874b9df2f07",
      createdAt:"2024-04-07T13:24:53.630+00:00",
      updatedAt:"2024-04-07T13:24:53.630+00:00"
    },
    {
      _id:"66129ea510cb3d209a31545f",
      name:"MagarThai",
      email:"magargame@gmail.com",
      detail:"fiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpo",
      selectTopic:"ปัญหาเซิฟเวอร์",
      status: "pending",
      img:"https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/ticket_images%2Ftransection_issue.png-1712496293119?alt=media&token=9bf5d695-4e57-40ca-b29c-2874b9df2f07",
      createdAt:"2024-04-07T13:24:53.630+00:00",
      updatedAt:"2024-04-07T13:24:53.630+00:00"
    },
    {
      _id:"66129ea510cb3d209a31545f",
      name:"MagarThai",
      email:"magargame@gmail.com",
      detail:"fiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpofiogpqwjwgqpwgjqopwgjqopwgjqopqwgjkopqwgjopqwgjopwgqpogqwjqwgpo",
      selectTopic:"ปัญหาเซิฟเวอร์",
      status: "reject",
      img:"https://firebasestorage.googleapis.com/v0/b/nipa-test-5fe81.appspot.com/o/ticket_images%2Ftransection_issue.png-1712496293119?alt=media&token=9bf5d695-4e57-40ca-b29c-2874b9df2f07",
      createdAt:"2024-05-07T13:24:53.630+00:00",
      updatedAt:"2024-05-07T13:24:53.630+00:00"
    },
  ]

  data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const img_status = (e) => {
    console.log(e);
    if(e === "pending") {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902596571216/Group.png?ex=66255951&is=6612e451&hm=c9350934360d3a5cb03d5bab5826e5697b132f68d69b682d7b28b1154b18082d&";
    }
    else if(e === "accept"){
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902856749106/Meeting_Time.png?ex=66255951&is=6612e451&hm=0a5b210c2b113d9c2e614aa32283892babf8fc730ffc3be764725f05460410a0&"
    } else if(e === "success") {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597903087308842/Ok.png?ex=66255951&is=6612e451&hm=577726e0f2a2f13cee08eb34845a52b1f62bafa7a42e10ff0a4c44f6fa310c73&"
    } else {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902349111336/Cancel.png?ex=66255951&is=6612e451&hm=68b3f78ea5d25528c45496163533d5a1e38537531fc5852fe41ad5cf8af9f178&"
    }
  };
  

  const barColors = ["#1f77b4", "#ff7f0e"]
  useEffect(() => {
    fetchStatusInfo();
  }, []); 

  return (
    <div className="admin-container">
      <AdminNavbar userData={userData} />
      <div className='adminpage-header background-color'></div>
      <div className="leftside">
      <div className="ticket-container">
        
        {data ? 
          data.map((ticket, index) => {
            return (
              <div key={index} className='test'>
               <div className="ticket-card" style={ticket.status === "pending" ? {} : { cursor: "pointer" }}>
                  <div className="ticket-header">

                  <h1 className='meduim'>หัวข้อ :&nbsp;{ticket.selectTopic}</h1>
                  <div className="status-img" id={`${ticket.status}`}>
                  <img src={img_status(ticket.status)} alt={ticket.status} />
                </div>
                
                  </div>
                  <div className="ticket-info">
                  <p className='ticket-status-text'>Staus : {ticket.status}</p>
                  <p>ชื่อผู้แจ้ง :&nbsp;{ticket.name} </p>
                  {ticket.status === "pending" ?
                    <p>เวลา :&nbsp;{new Date(ticket.createdAt).toLocaleString()} </p> :
                    <p>อัพเดตเวลา :&nbsp;{new Date(ticket.updatedAt).toLocaleString()}</p>
                  }
                  <p>Email :&nbsp;{ticket.email} </p>
                  <p>รายละเอียด</p>
                  <div className={ticket.status !== "pending" ? "ticket-detial-container" : "ticket-detial-container-pending"}>
                    <p className="ticket-detial extralight">{ticket.detail}</p>
                  </div>
                  {ticket.status === "pending" ? (<button className='bold button-ticket-accept'>รับแจ้งปัญหา</button>) : (<div></div>)}
                  <p></p>
                </div>
               </div>
              </div>
            );
          }) 
          : 
          <div></div>
        }
      </div>


      </div>

    </div>
  )
}

export default AdminPage