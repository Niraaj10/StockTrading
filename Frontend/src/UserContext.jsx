import React, { createContext, useState } from "react";
import axios from "axios";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const baseUrl = 'http://localhost:5001/api'

  const login = async (username, password) => {
    setLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/user/login`, { username, password }, { withCredentials: true });
    //   console.log(res)
      setUser(res.data.message.user); 
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
      console.log(res);
      setUser(null); 
    } catch (error) {
      console.error(error.response ? error.response.data.message : error.message);
    }
  };


  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
