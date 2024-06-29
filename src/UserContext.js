// src/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: localStorage.getItem('name') || '',
        mail: localStorage.getItem('mail') || '',
        pass: localStorage.getItem('pass') || ''
    });

    const saveUser = (name, mail, pass) => {
        localStorage.setItem('name', name);
        localStorage.setItem('mail', mail);
        localStorage.setItem('pass', pass);
        setUser({ name, mail, pass });
    };

    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    );
};
