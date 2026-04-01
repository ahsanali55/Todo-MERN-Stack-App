import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";

const NavBar = () => {
  return (
    <nav className="w-full  py-6 px-6">
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <GiHamburgerMenu className=" text-2xl  transition-colors cursor-pointer" />
          <h4 className=" font-bold text-xl">My Tasks</h4>
        </div>
        <IoMdSearch className=" text-2xl transition-colors cursor-pointer" />
      </div>
    </nav>
  );
};

export default NavBar;
