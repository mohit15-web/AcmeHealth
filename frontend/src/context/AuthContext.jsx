import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    // Track changes in the user state
    useEffect(() => {
      console.log("User State: ", user);  // Track the user state here
    }, [user]); 

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth/verify');
          console.log("response", res)
          const user = localStorage.getItem('userInfo');
          setUser(JSON.parse(user));
        }
      } catch (err) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      console.log(email, password, "login");
      
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log("response token", res)
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return false;
    }
  };

  const signup = async (email, password, patientName) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/signup', { email, password, patientName });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      
      return true;
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      return false;
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
