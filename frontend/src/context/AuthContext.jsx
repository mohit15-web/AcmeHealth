import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res = await axios.get("/api/auth/verify");
          const user = localStorage.getItem("userInfo");
          setUser(JSON.parse(user));
        }
      } catch (err) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      toast.success("Login successful");
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));

      return true;
    } catch (err) {
      toast.error("Login failed");
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  const signup = async (email, password, patientName) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        { email, password, patientName }
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      toast.success("Signup successful");
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));

      return true;
    } catch (err) {
      toast.error("Signup failed");
      console.error("Signup error:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
