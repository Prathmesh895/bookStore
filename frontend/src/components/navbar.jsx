import React, { useContext } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authContext';


function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const navMenu = [
        { title: 'Home', link: '/' },
        { title: 'BooksStore', link: '/books' },
    ];

    return (
        <nav className='border-b shadow flex justify-between items-center lg:px-10 fixed top-0 w-full p-1 bg-white z-50'>
            <div>
                <Link to='/'>
                    <img src="/logo.png" alt="logo" className='lg:h-[70px] h-[60px]' />
                </Link>
            </div>
            <ul className='lg:flex items-center space-x-5 hidden font-semibold'>
                {navMenu.map((navItem, index) => (
                    <Link to={navItem.link} key={index}>
                        <li className='hover:text-violet-700 cursor-pointer'>{navItem.title}</li>
                    </Link>
                ))}
                {user ? (
                    <>
                        <Link to='/author'>
                            <li className='hover:text-violet-700 cursor-pointer'>Dashboard</li>
                        </Link>
                        <li>{user.userName}</li>
                        <li>{user.email}</li>
                        <li className='border px-2 rounded'>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <Link to='/signup'>
                            <li className='hover:text-violet-700 cursor-pointer'>Signup</li>
                        </Link>
                        <Link to='/login'>
                            <li className='hover:text-violet-700 cursor-pointer'>Login</li>
                        </Link>
                    </>
                )}
            </ul>
            <div className='pr-4 lg:hidden'>
                <CgMenuRightAlt size={35} />
            </div>
        </nav>
    );
}

export default Navbar;
