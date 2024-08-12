import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const email = localStorage.getItem('email');
        if (token) {
            setUser({ userName, email });
            Cookies.set('token', token); // Optionally set cookie here if needed
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userName', userData.userName);
        localStorage.setItem('email', userData.email);
        Cookies.set('token', userData.token);
        setUser({
            userName: userData.userName,
            email: userData.email
        });
        window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        Cookies.remove('token');
        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
