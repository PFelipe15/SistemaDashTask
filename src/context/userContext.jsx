import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <UserContext.Provider value={{ userName, setUserName, isAdmin, setIsAdmin, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

