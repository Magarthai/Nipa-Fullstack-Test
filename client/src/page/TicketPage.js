import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import Card from '../utils/cardSkeleton.js';
import BarLoaders from '../utils/BarLoader.js';
import '../css/page_css/ticketpage.css';
import HambergerBar from '../utils/HambergerBar.js';
import Swal from 'sweetalert2';
import axios from 'axios'
function AdminPage() {
  const { userData,logout_global } = useUserAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [clicked, setClicked] = useState(false); 
  const API = process.env.REACT_APP_API
  const toggleClicked = () => {
    setClicked(!clicked);
  };
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async() => {
    try{
    console.log('xd') 
    const respone = await axios.get(`${API}/ticket/getTicket`, {
      headers: {
          Authorization: `Bearer ${userData.refreshToken}`,
          role: userData.role
          
      },
      });
    if (respone.data){
    if(respone.data.message == "Ticket fetch successfully"){
      setData(respone.data.ticket)
      setTimeout(() =>{
        setIsLoading(false)
      },1000);
    }

    }
  } catch(err) {
    console.error(err)
  }
  };

  const fetchDataQuery = async(e) => {
    try{
      setIsLoading(true);
    console.log('xd') 
    const info = {
      status: e,
    }
    const headers = {
      Authorization: `Bearer ${userData.refreshToken}`,
      role: userData.role
      
    } 
    console.log(headers)
    const respone = await axios.post(`${API}/ticket/getTicketQuery`, info,
    {
        headers: {
          Authorization: `Bearer ${userData.refreshToken}`,
          role: userData.role
          
      },
      });

    if (respone.data){
    if(respone.data.message == "Ticket fetch successfully"){
      setData(respone.data.ticket)
      setTimeout(() =>{
        setIsLoading(false)
      },1000);
    }

    }
  } catch(err) {
    console.error(err)
  }
  };

  useEffect(() => {
    console.log(data.lenght,"data")
  },[data])

  const barColors = ["#1f77b4", "#ff7f0e"]
  const img_status = (e) => {
    console.log(e);
    if(e === "pending") {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902596571216/Group.png?ex=66255951&is=6612e451&hm=c9350934360d3a5cb03d5bab5826e5697b132f68d69b682d7b28b1154b18082d&";
    }
    else if(e === "accepted"){
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902856749106/Meeting_Time.png?ex=66255951&is=6612e451&hm=0a5b210c2b113d9c2e614aa32283892babf8fc730ffc3be764725f05460410a0&"
    } else if(e === "success") {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597903087308842/Ok.png?ex=66255951&is=6612e451&hm=577726e0f2a2f13cee08eb34845a52b1f62bafa7a42e10ff0a4c44f6fa310c73&"
    } else {
      return "https://cdn.discordapp.com/attachments/445928139021877259/1226597902349111336/Cancel.png?ex=66255951&is=6612e451&hm=68b3f78ea5d25528c45496163533d5a1e38537531fc5852fe41ad5cf8af9f178&"
    }
  };

  const handleSubmit = async(ticket) => {
    try {
    const info = {
      name: ticket.name,
      email: ticket.email,
      topic: ticket.selectTopic,
      time: new Date(ticket.createdAt).toLocaleString(),
      recipient: userData.fname + " " + userData.lname,
      status: "ได้รับเรื่องแล้ว",
      recipientId: userData._id,
      solve:"ตอนนี้ทางเราได้รับเรื่องแล้วถ้าหากปัญหาถูกแก้ไข้ หรือ ไม่สามารถแก้ไข้ได้จะตอบกลับไป ครับ/ค่ะ",
      updateStatus: "accepted"
    }

    const updateStatus = await axios.put(`${API}/ticket/updateStatusTicket/:${ticket._id}`,
     info ,
    {
      headers: {
        Authorization: `Bearer ${userData.refreshToken}`,
        role: userData.role
      }
    }
  );
    if(updateStatus.data)
    {
      console.log(updateStatus.data.message)
      if(updateStatus.data.message == "Already accepted") {
        Swal.fire({
          icon: "error",
          title: "รับเรื่องไม่สําเร็จ",
          text: "มีคนรับเรื่องนี้แล้ว!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: '#263A50',
        })
        return;
    } else {
      console.log(updateStatus.data.message)
    setLoader(true);
    const respone = await axios.post(`${API}/ticket/sendemail`, info,
    {
        headers: {
          Authorization: `Bearer ${userData.refreshToken}`,
          role: userData.role
          
      },
      });
   
    if(respone.data) {
      if(respone.data.RespCode == 200) {
        setLoader(false);
        navigate("/ticketinfo", {state: {data: ticket}});
      }
    }
    }
  }
} catch(err) {
  if(err.response.status === 401) {
    navigate('/')
    logout_global();
    console.log("You are not admin")
    
  }else {
    console.error(err)
    }
}
  }



  useEffect(() => {
    if(userData) {
    fetchData();
    }
  }, [userData]); 

  return (
    <div className="admin-container" >
      
      {loader ? <BarLoaders></BarLoaders> : <div></div>}
      <AdminNavbar clicked={clicked} userData={userData} />
  
      <div className='adminpage-header background-color'></div>
      <div className="leftside">
      <HambergerBar clicked={clicked} toggleClicked={toggleClicked} />
      <div className="filter-container">
        <div className="filter-box">
          <div className="box-status-img" onClick={() => fetchDataQuery("pending")}>
            <div className="box-circle-status-img pending">
            < img src="https://media.discordapp.net/attachments/445928139021877259/1226597902596571216/Group.png?ex=66255951&is=6612e451&hm=c9350934360d3a5cb03d5bab5826e5697b132f68d69b682d7b28b1154b18082d&=&format=webp&quality=lossless" alt="" />
            </div>
            
          </div>
          <div className="box-status-img" onClick={() => fetchDataQuery("accepted")}>
          <div className="box-circle-status-img accepted">
            < img src="https://media.discordapp.net/attachments/445928139021877259/1226597902856749106/Meeting_Time.png?ex=66255951&is=6612e451&hm=0a5b210c2b113d9c2e614aa32283892babf8fc730ffc3be764725f05460410a0&=&format=webp&quality=lossless" alt="" />
            </div>
          </div>
          <div className="box-status-img" onClick={() => fetchDataQuery("success")}>
          <div className="box-circle-status-img success">
            < img src="https://media.discordapp.net/attachments/445928139021877259/1226597903087308842/Ok.png?ex=66255951&is=6612e451&hm=577726e0f2a2f13cee08eb34845a52b1f62bafa7a42e10ff0a4c44f6fa310c73&=&format=webp&quality=lossless" alt="" />
            </div>
          </div>
          <div className="box-status-img" onClick={() => fetchDataQuery("reject")}>
          <div className="box-circle-status-img reject">
            < img src="https://media.discordapp.net/attachments/445928139021877259/1226597902349111336/Cancel.png?ex=66255951&is=6612e451&hm=68b3f78ea5d25528c45496163533d5a1e38537531fc5852fe41ad5cf8af9f178&=&format=webp&quality=lossless" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={loader ? "ticket-container" : "ticket-container blue-screen"}>
        {isLoading ? (
  <Card />
) : (
  data.length > 0 ? (
    data.map((ticket, index) => (
      <div key={index} className='test'>
               <div className="ticket-card" onClick={() => ticket.status !== "pending" && navigate("/ticketinfo", { state: { data: ticket } })} style={ticket.status === "pending" ? {} : { cursor: "pointer" }}>
                  <div className="ticket-header">

                  <h1 className='meduim'>หัวข้อ :&nbsp;{ticket.selectTopic}</h1>
                  <div className="status-img" id={`${ticket.status}`}>
                  <img src={img_status(ticket.status)} alt={ticket.status} />
                </div>
                
                  </div>
                  <div className="ticket-infos">
                  <p className='ticket-status-text'>Staus : {ticket.status}</p>
                  <p>ชื่อผู้แจ้ง :&nbsp;{ticket.name} </p>
                  {ticket.status === "pending" ?
                    <p>เวลา :&nbsp;{new Date(ticket.createdAt).toLocaleString()} </p> :
                    <>
                    <p>ผู้รับเรื่อง : {ticket.recipient_name}</p>
                    <p>อัพเดตเวลา :&nbsp;{new Date(ticket.updatedAt).toLocaleString()}</p>
                    </>
                    
                  }
                  
                  <p>Email :&nbsp;{ticket.email} </p>
                  <p>รายละเอียด</p>
                  <div className={ticket.status !== "pending" ? "ticket-detial-container" : "ticket-detial-container-pending"}>
                    <p className="ticket-detial extralight">{ticket.detail}</p>
                  </div>
                  {ticket.status === "pending" ? (<button onClick={() => handleSubmit(ticket)} className='bold button-ticket-accept'>รับแจ้งปัญหา</button>) : (<div></div>)}
                  <p></p>
                </div>
               </div>
              </div>
    ))
  ) : (
    <div></div>
  )
)}

        
      </div>


      </div>

    </div>
  )
}

export default AdminPage