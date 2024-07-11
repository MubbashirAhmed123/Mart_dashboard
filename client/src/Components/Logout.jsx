import React from 'react'
import { CiWarning } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Logout({ setIsClicked }) {
  const navigate = useNavigate()

  const handleClick = () => {

    localStorage.removeItem('token')
    navigate('/')
    toast.success('log out successfully.')
    setIsClicked(false)
  }

  return (
    <div className='bg-gray-300 w-fit p-2 absolute right-0 top-12 z-10 transition-all ease-in-out '>

      <h1 className='flex justify-center items-center'><CiWarning color='red ' size={25} /> Log Out</h1>
      <p className='text-center'>Are youe sure you want to log out?</p>


      <button className='rounded-2xl border-2 border-gray-400 px-3 py-1 cursor-pointer bg-gray-100 transition ' onClick={() => setIsClicked(false)}>Cancel</button>
      <button className='mx-3 rounded-2xl bg-purple-700 px-3 py-1 text-white hover:bg-purple-600 transition' onClick={handleClick}>Confirm</button>

    </div>
  )
}

export default Logout