import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";

const NavBar = () => {
  return (
    <nav className='w-full max-w-[400px] py-4  mx-auto  bg-white'>
        <div className='w-full flex justify-between items-center bg-white '>
       <div className='flex space-x-16 items-center bg-white'>
        <GiHamburgerMenu className='bg-white text-gray-300'/>
        <h4 className='bg-white text-gray-300 font-semibold'>To Do List</h4>
       </div>
        <IoMdSearch className='bg-white font-extrabold text-gray-300'/>
        </div>
      
    </nav>
  )
}

export default NavBar
