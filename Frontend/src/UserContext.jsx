import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const baseUrl = 'http://localhost:5001/api'

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/user/login`, { username, password }, { withCredentials: true });
      setUser(data.user); 
      navigate('/')
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
