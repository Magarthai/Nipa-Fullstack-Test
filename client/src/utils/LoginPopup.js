import React from 'react'
import '../css/page_css/loginPopup.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
const LoginPopup = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API = process.env.REACT_APP_API

  const navigate = useNavigate()
  const login = async () => {
  try {
    
    const login_info = {
      email: email,
      password: password
    };
    console.log(login_info);
    const response = await axios.post('http://localhost:5000/api/user/login', login_info, {
      withCredentials: true 
    });

    if (response.data == "User logged in successfully") {
      Swal.fire({
        icon: "success",
        title: "ล็อคอินสําเร็จ",
        text: "ยินดีต้อนรับเข้าสู่เว็ปไซต์ Nipa Cloud!",
        confirmButtonText: "ตกลง",
        confirmButtonColor: '#263A50',
      }).then((result) => {
        if (result.isConfirmed) {
            navigate('/homepage');
        } else {
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ล็อคอินสําเร็จ",
        text: "ยินดีต้อนรับเข้าสู่เว็ปไซต์ Nipa Cloud!",
        confirmButtonText: "ตกลง",
        confirmButtonColor: 'red',
      })
    }
    
  } catch (err) {
    console.error(err);
  }
};


  if (!open) return null
  return (
    <div onClick={() => onClose()} className='loginpopup-container'>
      <div onClick={(e) => {e.stopPropagation()}} className="login-container">
        <div className="login-header ">
          <div className='circle-container' onClick={() => onClose()}>
            <div className="circle-exit button-color bold">X</div>
          </div>
          <img className='nipa-logo' src="https://cdn.discordapp.com/attachments/445928139021877259/1226426762737745950/R_1.png?ex=6624b9ee&is=661244ee&hm=beb4109323bcf822143a95053ccbee2a07a0dd8e55d4ba716a3d1c3cd8fb848c&" alt="nipa logo" />
         <h1 className='font-primary'>เข้าสู่ระบบ Admin</h1>
        </div>
        <div className="login-input font-primary">
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='example@gmail.com' />
        </div>

        <div className="login-input font-primary">
        <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='nipacloud1234' />
        </div>
        

        <div onClick={() => login()} className="button-login bold button-color">ล็อคอิน</div>

      </div>
    </div>
  )
}

export default LoginPopup