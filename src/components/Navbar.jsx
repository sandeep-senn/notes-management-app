import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar.jsx'
import Profile from './cards/Profile.jsx'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { signOut } = useClerk()
  const { user } = useUser()

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
  }

  const onClearSearch = () => {
    setSearchQuery("")
  }

  const onLogout = async () => {
    await signOut()
    navigate('/sign-in')
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>
        <span className='text-gray-400'>Good</span>
        <span className='text-black'>Notes</span>
      </h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className='flex items-center gap-3'>
        {user && (
          <>
            <span className='text-gray-700 font-medium'>Hello, {user.firstName || user.fullName || "User"}</span>
            <UserButton />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
