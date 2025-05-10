import React from 'react'
import {FaUserGraduate} from 'react-icons/fa6'

const Profile = ({onLogout}) => {
  return (
    <div className='flex items-center justify-between gap-5'>
      <div className='text-medium font-bold flex items-center gap-2 justify-between'>
      <FaUserGraduate className='w-full h-4'/>
Robert
      </div>
      <div>
        <button className='p-1 rounded-xl text-white bg-gray-500 hover:opacity-80 text-medium' onClick={onLogout} >Logout</button>
      </div>
    </div>
  )
}

export default Profile
