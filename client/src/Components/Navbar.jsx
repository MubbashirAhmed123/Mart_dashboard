import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import Logout from './Logout'
import { MdTableChart } from 'react-icons/md'

function Navbar() {
  const[isClicked,setIsClicked]=useState(false)
  const token=localStorage.getItem('token')

  return (
    <>
    {isClicked && token && <Logout setIsClicked={setIsClicked}/>}
    <nav className=' flex justify-between items-center h-14 bg-purple-600 '>
        <div className='text-white'>
        <h1 className='text-xl font-bold mx-5 flex items-center gap-3'> <MdTableChart/> TableSprint</h1>
        </div>
        <div>
            <BiUserCircle size={25} color='white' className='mr-4 cursor-pointer' onClick={()=>setIsClicked(!isClicked)} />
        </div>

    </nav>
    </>
  )
}

export default Navbar