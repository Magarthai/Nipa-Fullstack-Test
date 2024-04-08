import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [userData, setUserData] = useState("");

    const checkToken = async() => {
        const response = await axios.get('http://localhost:5000/api/user/refresh', {
          withCredentials: true 
        });

        if(response.data.message == "success") {
            setUserData(response.data.user);
        }
        console.log(response.data)
      }

      const logout_global = async() => {
        setUserData("");
      };



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
