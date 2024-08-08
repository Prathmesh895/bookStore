import React from 'react'
import { CgMenuRightAlt } from "react-icons/cg";
import { Link } from 'react-router-dom';
function navbar() {

    const navMenu=[
        {title:'Home',link:"/"},
        {title:'BooksStore',link:"/books"},
        {title:'Dashboard',link:"/author"},
        {title:'Singup',link:"/signUp"},
        {title:'Login',link:"/login"},
    ]
    return (
        <>
            <nav className='border-b shadow flex justify-between items-center lg:px-10 fixed top-0 w-full p-1 bg-white z-50'>
                <div>
                    <Link to='/'><img src="/logo.png" alt="logo" className='lg:h-[70px] h-[60px] ' /></Link>
                </div>
                <ul className='lg:flex space-x-5 hidden font-semibold '>
                    {navMenu.map((navItem,index)=>(
                       <Link to={navItem.link} key={index}><li className='hover:text-violet-700 cursor-pointer'>{navItem.title}</li></Link>
                    ))}
                </ul>
                <div className='pr-4 lg:hidden'>
                    < CgMenuRightAlt size={35} />
                </div>
            </nav>
        </>
    )
}

export default navbar