import React, { createContext, useState, useEffect, useContext } from 'react';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [shortlistedProperties, setShortlistedProperties] = useState(() => {
    const saved = localStorage.getItem('nv_shortlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nv_token') !== null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nv_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('nv_shortlist', JSON.stringify(shortlistedProperties));
  }, [shortlistedProperties]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('nv_token', data.token);
      localStorage.setItem('nv_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('nv_token', data.token);
      localStorage.setItem('nv_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('nv_token');
    localStorage.removeItem('nv_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (name, avatarFile) => {
    try {
      const token = localStorage.getItem('nv_token');
      let avatarUrl = user.avatar;

      // First upload the image if provided
      if (avatarFile) {
        const formData = new FormData();
        formData.append('image', avatarFile);
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        avatarUrl = uploadData.imageUrl;
      }

      // Then update profile
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, avatar: avatarUrl })
      });
      if (!res.ok) throw new Error('Profile update failed');
      const data = await res.json();
      
      localStorage.setItem('nv_user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const uploadDocument = async (title, file) => {
    try {
      const token = localStorage.getItem('nv_token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('document', file);
      
      const res = await fetch('http://localhost:5000/api/vault', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Document upload failed');
      const doc = await res.json();
      return { success: true, document: doc };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('nv_token');
      const res = await fetch('http://localhost:5000/api/vault', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch documents');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem('nv_token');
      const res = await fetch('http://localhost:5000/api/user/password', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password change failed');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const submitKyc = async (nidNumber, frontFile, backFile) => {
    try {
      const token = localStorage.getItem('nv_token');
      const formData = new FormData();
      formData.append('nidNumber', nidNumber);
      if (frontFile) formData.append('nidFront', frontFile);
      if (backFile) formData.append('nidBack', backFile);

      const res = await fetch('http://localhost:5000/api/user/kyc', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'KYC submission failed');
      
      // Update local user state
      const updatedUser = { ...user, kycStatus: data.kycStatus };
      localStorage.setItem('nv_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const toggleShortlist = (property) => {
    setShortlistedProperties((prev) => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isShortlisted = (id) => {
    return shortlistedProperties.some(p => p.id === id);
  };

  return (
    <ClientContext.Provider value={{
      shortlistedProperties,
      toggleShortlist,
      isShortlisted,
      isAuthenticated,
      user,
      login,
      register,
      logout,
      updateProfile,
      uploadDocument,
      fetchDocuments,
      changePassword,
      submitKyc
    }}>
      {children}
    </ClientContext.Provider>
  );
};
