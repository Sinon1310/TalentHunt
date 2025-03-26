import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setAdminUser(userData);
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};