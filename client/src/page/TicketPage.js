import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../utils/AdminNavbar.js";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import Card from "../utils/cardSkeleton.js";
import BarLoaders from "../utils/BarLoader.js";
import "../css/page_css/ticketpage.css";
import HambergerBar from "../utils/HambergerBar.js";
import Swal from "sweetalert2";
import axios from "axios";
import Cancel from "../img/Cancel.png";
import Group from "../img/Group.png";
import Meeting_Time from "../img/Meeting_Time.png";
import Ok from "../img/Ok.png";
function AdminPage() {
  const { userData, logout_global } = useUserAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [clicked, setClicked] = useState(false);
  const API = process.env.REACT_APP_API;
  const toggleClicked = () => {
    setClicked(!clicked);
  };
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      console.log("xd");
      const respone = await axios.get(`${API}/tickets`, {
        headers: {
          Authorization: `Bearer ${userData.refreshToken}`,
          role: userData.role,
        },
      });
      if (respone.data) {
        if (respone.data.message == "Ticket fetch successfully") {
          setData(respone.data.ticket);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDataQuery = async (status) => {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${userData.refreshToken}`,
        role: userData.role,
      };
      console.log(headers);
      const respone = await axios.get(`${API}/tickets/status/${status}`);

      if (respone.data) {
        if (respone.data.message == "Ticket fetch successfully") {
          setData(respone.data.ticket);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(data.lenght, "data");
  }, [data]);

  const barColors = ["#1f77b4", "#ff7f0e"];
  const img_status = (e) => {
    console.log(e);
    if (e === "pending") {
      return Group;
    } else if (e === "accepted") {
      return Meeting_Time;
    } else if (e === "success") {
      return Ok;
    } else {
      return Cancel;
    }
  };

  const handleSubmit = async (ticket) => {
    try {
      const info = {
        name: ticket.name,
        email: ticket.email,
        topic: ticket.selectTopic,
        time: new Date(ticket.createdAt).toLocaleString(),
        recipient: userData.fname + " " + userData.lname,
        status: "ได้รับเรื่องแล้ว",
        recipientId: userData.id,
        solve:
          "ตอนนี้ทางเราได้รับเรื่องแล้วถ้าหากปัญหาถูกแก้ไข้ หรือ ไม่สามารถแก้ไข้ได้จะตอบกลับไป ครับ/ค่ะ",
        updateStatus: "accepted",
      };

      const updateStatus = await axios.put(
        `${API}/tickets/${ticket.id}`,
        info,
        {
          headers: {
            Authorization: `Bearer ${userData.refreshToken}`,
            role: userData.role,
          },
        }
      );
      if (updateStatus.data) {
        console.log(updateStatus.data.message);
        if (updateStatus.data.message == "Already accepted") {
          Swal.fire({
            icon: "error",
            title: "รับเรื่องไม่สําเร็จ",
            text: "มีคนรับเรื่องนี้แล้ว!",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#263A50",
          });
          return;
        } else {
          console.log(updateStatus.data.message);
          setLoader(true);
          const respone = await axios.post(`${API}/tickets/sendemail`, info, {
            headers: {
              Authorization: `Bearer ${userData.refreshToken}`,
              role: userData.role,
            },
          });

          if (respone.data) {
            if (respone.data.RespCode == 200) {
              setLoader(false);
              navigate("/ticketinfo", { state: { data: ticket } });
            }
          }
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
        logout_global();
        console.log("You are not admin");
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, [userData]);

  return (
    <div className="admin-container">
      {loader ? <BarLoaders></BarLoaders> : <div></div>}
      <AdminNavbar clicked={clicked} userData={userData} />

      <div className="adminpage-header background-color"></div>
      <div className="leftside">
        <HambergerBar clicked={clicked} toggleClicked={toggleClicked} />
        <div className="filter-container">
          <div className="filter-box">
            <div
              className="box-status-img"
              onClick={() => fetchDataQuery("pending")}
            >
              <div className="box-circle-status-img pending">
                <img src={Group} alt="" />
              </div>
            </div>
            <div
              className="box-status-img"
              onClick={() => fetchDataQuery("accepted")}
            >
              <div className="box-circle-status-img accepted">
                <img src={Meeting_Time} alt="" />
              </div>
            </div>
            <div
              className="box-status-img"
              onClick={() => fetchDataQuery("success")}
            >
              <div className="box-circle-status-img success">
                <img src={Ok} alt="" />
              </div>
            </div>
            <div
              className="box-status-img"
              onClick={() => fetchDataQuery("reject")}
            >
              <div className="box-circle-status-img reject">
                <img src={Cancel} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            loader ? "ticket-container" : "ticket-container blue-screen"
          }
        >
          {isLoading ? (
            <Card />
          ) : data.length > 0 ? (
            data.map((ticket, index) => (
              <div key={index} className="test">
                <div
                  className="ticket-card"
                  onClick={() =>
                    ticket.status !== "pending" &&
                    navigate("/ticketinfo", { state: { data: ticket } })
                  }
                  style={
                    ticket.status === "pending" ? {} : { cursor: "pointer" }
                  }
                >
                  <div className="ticket-header">
                    <h1 className="meduim">
                      หัวข้อ :&nbsp;{ticket.selectTopic}
                    </h1>
                    <div className="status-img" id={`${ticket.status}`}>
                      <img
                        src={img_status(ticket.status)}
                        alt={ticket.status}
                      />
                    </div>
                  </div>
                  <div className="ticket-infos">
                    <p className="ticket-status-text">
                      Staus : {ticket.status}
                    </p>
                    <p>ชื่อผู้แจ้ง :&nbsp;{ticket.name} </p>
                    {ticket.status === "pending" ? (
                      <p>
                        เวลา :&nbsp;
                        {new Date(ticket.createdAt).toLocaleString()}{" "}
                      </p>
                    ) : (
                      <>
                        <p>ผู้รับเรื่อง : {ticket.recipient_name}</p>
                        <p>
                          อัพเดตเวลา :&nbsp;
                          {new Date(ticket.updatedAt).toLocaleString()}
                        </p>
                      </>
                    )}

                    <p>Email :&nbsp;{ticket.email} </p>
                    <p>รายละเอียด</p>
                    <div
                      className={
                        ticket.status !== "pending"
                          ? "ticket-detial-container"
                          : "ticket-detial-container-pending"
                      }
                    >
                      <p className="ticket-detial extralight">
                        {ticket.detail}
                      </p>
                    </div>
                    {ticket.status === "pending" ? (
                      <button
                        onClick={() => handleSubmit(ticket)}
                        className="bold button-ticket-accept"
                      >
                        รับแจ้งปัญหา
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <p></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
