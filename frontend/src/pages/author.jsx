import React, { useContext } from 'react';
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiBooks } from "react-icons/pi";
import { MdPublishedWithChanges } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { AuthContext } from '../authContext';

function Author() {
    const { user } = useContext(AuthContext);
    const UserName = user?.userName || localStorage.getItem('userName');
    return (
        <>
            <aside className='bg-white  rounded border shadow '>
                <div className='flex flex-col justify-center items-center border-b p-5 font-mono'>
                    <img src="/pic_profile.svg" alt="profile pic" className='w-20 h-20 ' />
                    <p >{UserName}</p>
                </div>
                <div className='mt-5 font-semibold p-5'>
                    <ul>
                        <li className='flex items-center space-x-4 p-3 hover:bg-violet-600 hover:rounded hover:text-white cursor-pointer'>
                            <Link to="/author/all-books" className="flex items-center space-x-4 w-full">
                                <PiBooks />
                                <p>All Books</p>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 p-3 hover:bg-violet-600 hover:rounded hover:text-white cursor-pointer'>
                            <Link to="/author/add-book" className="flex items-center space-x-4 w-full">
                                <RiStickyNoteAddLine />
                                <p>Add New Books</p>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 p-3 hover:bg-violet-600 hover:rounded hover:text-white cursor-pointer'>
                            <Link to="/author/published-books" className="flex items-center space-x-4 w-full">
                                <MdPublishedWithChanges />
                                <p>Published Books</p>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 p-3 hover:bg-violet-600 hover:rounded hover:text-white cursor-pointer'>
                            <Link to="/author/draft-books" className="flex items-center space-x-4 w-full">
                                <RiDraftLine />
                                <p>Draft Books</p>
                            </Link>
                        </li>
                        <li className='flex items-center space-x-4 p-3 hover:bg-violet-600 hover:rounded hover:text-white cursor-pointer'>
                            <Link to="/author/settings" className="flex items-center space-x-4 w-full">
                                <IoSettingsOutline />
                                <p>Settings</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Author;
