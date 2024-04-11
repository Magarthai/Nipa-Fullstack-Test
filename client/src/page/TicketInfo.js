import React, { useEffect, useState } from 'react';
import AdminNavbar from '../utils/AdminNavbar.js';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import '../css/page_css/ticketinfo.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HambergerBar from '../utils/HambergerBar.js';
import axios from 'axios';
import BarLoaders from '../utils/BarLoader.js';
function AdminPage() {
  const { userData ,logout_global } = useUserAuth();
  const location = useLocation();
  const [statusInfo, setStatusInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [solve, setSolve] = useState("");
  const { data } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false); 
  const API = process.env.REACT_APP_API;
  useEffect(() => {
    console.log(data)
    if (!data) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่มีข้อมูล',
        confirmButtonColor: '#263A50',
        customClass: {
          confirmButton: 'custom-confirm-button',
        }
      }).then(() => {
        navigate('/ticket');
      }); 
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
   
  }, [data]);

useEffect(() => {
  console.log(solve)
},[solve])
  const handleSubmit = async(status) => {
    try {
    let statuText = ""
    if(status === 'success') {
      statuText = "แก้ไข้ปัญหาแล้ว"
    } else {
      statuText = "ไม่สามารถแก้ไข้ปัญหาได้"
    }
    const info = {
      name: data.name,
      email: data.email,
      topic: data.selectTopic,
      time: new Date(data.createdAt).toLocaleString(),
      status: statuText,
      recipientId: userData._id,
      updateStatus: status,
      solve: solve,
      recipient: userData.fname + " " + userData.lname,
    }
    console.log(info)
    const updateStatus = await axios.put(`${API}/ticket/closeTicket/:${data._id}`,
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
        Swal.fire({
          icon: "success",
          title: "ทํารายการสําเร็จ",
          text: "ทํารายการ Ticket นี้เสร็จสิ้น!",
          confirmButtonText: "ตกลง",
          confirmButtonColor: '#263A50',
        }).then((result) => {
          if (result.isConfirmed) {
              navigate('/ticket');
          } else {
            navigate('/ticket');
          }
        });
      }
    }
    }
  }
}catch (err) {
  if(err.response.status === 401) {
    navigate('/')
    logout_global();
    console.log("You are not admin")
    
  } else {
  console.error(err)
  }
}

  }
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <div className="admin-container">
      {loader ? <BarLoaders></BarLoaders> : <div></div>}
      <HambergerBar clicked={clicked} toggleClicked={toggleClicked} />
      <AdminNavbar clicked={clicked} userData={userData} />
      <div className='adminpage-header background-color'></div>
      <div className="leftside">
        <div className="ticket-info-container">
          <div className="ticket-info">
            <div className="ticket-info-img-container">
              {data && <h1 style={{ marginBottom: -20 }}>{data.selectTopic}</h1>}
            </div>
            <div className="img-wrapper-container">
            
              {isLoading ? (
                <div style={{width:"100%",display:"flex",justifyContent:"center", margin:0, padding:0}}>
        <div style={{width:"80%",display:"block",justifyContent:"center", margin:0, padding:0}}>
        <SkeletonTheme baseColor="#b6b6b6" highlightColor="#e0e0e0">
                  <Skeleton width="100%" height="300px" style={{borderRadius:20, marginTop:20, marginBottom:20}} />
                  </SkeletonTheme>
                </div>
                </div>
              ) : (
                <TransformWrapper>
                  <TransformComponent>
                    <div className="ticket-info-img-container">
                      {data.img && <img className='ticketinfo-img'  src={data.img} alt="img" />}
                    </div>
                  </TransformComponent>
                </TransformWrapper>
              )}
            </div>
            <div className="ticket-info-text">
            {data && <p>ผู้แจ้ง : {data.name}</p>}
            {data &&<p>อีเมล : {data.email}</p>}
              {data &&<p>แจ้งวันที่ : {new Date(data.createdAt).toLocaleString()}</p>}
              <div className="ticketinfo-detail extralight">
              {data &&<p>{data.detail}</p>}
              </div>
              <h1 id='solve'>รายละเอียดการแก้ปัญหา</h1>
              {data && (data.status === "pending" || data.status === "accepted") ? (
                <textarea onChange={(e) => setSolve(e.target.value)} className='solvedetail extralight' name="solve detail"></textarea>
              ) : (
                <div className="solvedetail"><p>{data && data.solve}</p></div>
              )}

              {data && userData && (data.status === "pending" || data.status === "accepted" && data.recipient === userData._id) ? (
                <div className="ticket-info-button">
                  <button className='bold' id='success' onClick={() => handleSubmit("success")}>SUCCESS</button>
                  <button className='bold' id='reject' onClick={() => handleSubmit("reject")}>REJECT</button>
                </div>
              ) : (
                <div style={{ margin: 20 }}></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage;
