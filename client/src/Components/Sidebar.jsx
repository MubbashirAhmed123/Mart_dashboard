import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaThLarge, FaProductHunt } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="bg-gray-300  text-black flex flex-col md:w-64 md:h-screen">
    
    <nav className="mt-4 md:mt-10 flex flex-col gap-5">
        <NavLink
          to="/dashboard"a
          className={({ isActive }) =>
            isActive ? 'py-2.5 px-4 rounded bg-yellow-300 flex items-center justify-between ' : 'py-2.5 px-4 rounded hover:bg-yellow-300 flex justify-between items-center'
          }
        >
          <FaHome className="mr-2" />
           Dashboard
            <MdPlayArrow className='mx-3 '/>
        </NavLink>
        <NavLink
          to="/category"
          className={({ isActive }) =>
            isActive ? 'py-2.5 px-4 rounded bg-yellow-300 flex items-center justify-between' : 'py-2.5 px-4 rounded hover:bg-yellow-300 flex items-center justify-between'
          }
        >
          <FaList className="mr-2" /> Category <MdPlayArrow className='mx-3'/>
        </NavLink>
        <NavLink
          to="/subcategory"
          className={({ isActive }) =>
            isActive ? 'py-2.5 px-4 rounded bg-yellow-300 flex items-center justify-between' : 'py-2.5 px-4 rounded hover:bg-yellow-300 flex items-center justify-between'
          }
        >
          <FaThLarge className="mr-2" /> Subcategory <MdPlayArrow className='mx-3'/>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'py-2.5 px-4 rounded bg-yellow-300 flex items-center justify-between' : 'py-2.5 px-4 rounded hover:bg-yellow-300 flex items-center justify-between'
          }
        >
          <FaProductHunt className="mr-2" /> Products <MdPlayArrow className='mx-3'/>
        </NavLink>
      </nav>


    </div>
  );
};

export default Sidebar;
