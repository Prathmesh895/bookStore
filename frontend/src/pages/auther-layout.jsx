// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Author from './author';

const Layout = () => {
    return (
        <div className="flex lg:flex-row flex-col space-y-5  m-5  lg:space-x-5 font-sans">
            <div className='lg:w-[18%]'><Author /></div>
            <div className="flex-grow  bg-white rounded border shadow lg:p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
