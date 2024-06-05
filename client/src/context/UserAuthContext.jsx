import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [userData, setUserData] = useState("");
    const API = process.env.REACT_APP_API
    const checkToken = async() => {
      try{
        const response = await axios.get(`${API}/refresh`, {
          withCredentials: true 
        });
        if(response.data.message == "success") {
          console.log(response.data.user,"testz")
            setUserData(response.data.user);
        }
        console.log(response.data)
      } catch(err){
        console.error(err)
      }
      }

      const logout_global = async() => {
        setUserData("");
        try{
          const logout = await axios.get(`${API}/logout`, {
            withCredentials: true 
        });
      } catch(err) {
        console.log(err)
      }
       
      };

      

  useEffect(() => {
    console.log(userData,"global")
  },[userData])

  useEffect(() => {
    document.title = 'Nipa Cloud';
    if(!userData){
    checkToken();
    }
  }, [userData]);
  


  return (
    <userAuthContext.Provider value={{ checkToken,userData,logout_global }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
