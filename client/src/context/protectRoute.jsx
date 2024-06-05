import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import axios from "axios";
import Swal from 'sweetalert2';

function ProtectRoute({ children }) {
    const navigate = useNavigate();
    const {userData} = useUserAuth();
    useEffect(() => {
        console.log("check data", userData)
        if (!userData.fname) {
            // checkToken();
        }
    }, [userData]); 
    const API = process.env.REACT_APP_API
    const checkToken = async () => {
        try {
            const response = await axios.get(`${API}/refresh`)
            console.log(response.data)
            if(!userData) 
            if(response.data.user) {
                console.log("success");
            } else {
                navigate('/');
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error while fetching token:", error);
            navigate('/');
        }
    };

    return children;
}

export default ProtectRoute;
