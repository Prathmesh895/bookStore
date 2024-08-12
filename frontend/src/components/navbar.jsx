import React, { useContext, useState } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { SlClose } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { AuthContext } from '../authContext';


function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [showNav, setShowNav] = useState(false);

    // show nav for mobile view
    const handleOnShowNav = () => {
        setShowNav(!showNav);
    }

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
            <div className={`lg:pr-4 lg:hidden `}>
                <CgMenuRightAlt size={35} onClick={handleOnShowNav} />
                {
                    showNav &&
                    <div className={`${showNav ? "top-0 left-0 p-0 m-0 h-screen bg-gray-50 w-[95%] opacity-100 absolute " : " "}`}>
                        <div className='float-end p-5'>
                            <SlClose size={35} onClick={handleOnShowNav} />
                        </div>

                        <ul className=' font-semibold space-x-4  mx-5'>
                            {user ? (
                                <>
                                    <Link to='/author'>
                                        <li className='mx-4 text-center'  onClick={handleOnShowNav} >Dashboard</li>
                                    </Link>
                                    <li className='mx-4 my-2 text-center'   >{user.userName}</li>
                                    <li className='mx-4 my-2 text-center'   >{user.email}</li>
                                    <li  onClick={handleOnShowNav}   className='bg-violet-600  p-1 text-white w-[90%] text-center rounded-lg'>
                                        <button onClick={logout} >Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <Link to='/signup'  onClick={handleOnShowNav} >
                                        <li className='bg-violet-600 py-2.5  text-white w-[90%] mt-20 text-center rounded-lg'>Signup</li>
                                    </Link>
                                    <Link to='/login'  onClick={handleOnShowNav} >
                                        <li className='bg-violet-600 py-2.5  text-white w-[90%] text-center rounded-lg'>Login</li>
                                    </Link>
                                </>
                            )}
                            {navMenu.map((navItem, index) => (
                                <Link to={navItem.link} key={index}  onClick={handleOnShowNav} >
                                    <li className='hover:text-violet-700 cursor-pointer '>{navItem.title}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
