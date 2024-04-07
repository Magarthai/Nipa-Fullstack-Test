import React, { useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import axios from "axios";
import Swal from 'sweetalert2';
function ProtectRoute({ children }) {
    const today = new Date();
    const REACT_APP_API = process.env.REACT_APP_API
    today.setHours(0, 0, 0, 0);
    const { checkToken, userData } = useUserAuth();
    const navigate = useNavigate();
    
  
  
    useEffect(() => {
      console.log(userData);
    }, [userData]);
  
    if (!userData) {
      return <Navigate to="/" />;
    }
  
    return children;
  }
  
export default ProtectRoute;
