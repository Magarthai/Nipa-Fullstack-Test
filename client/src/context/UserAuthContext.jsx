import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [userData, setUserData] = useState(null);

    const checkToken = async() => {
        const response = await axios.get('http://localhost:5000/api/user/refresh', {
          withCredentials: true 
        });

        if(response.data.message == "success") {
            setUserData(response.data.user);
        }
        console.log(response.data)
      }




  useEffect(() => {
    document.title = 'Health Care Unit';
    if(!userData){
    checkToken();
    }
  }, [userData]);
  


  return (
    <userAuthContext.Provider value={{ checkToken,userData }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
