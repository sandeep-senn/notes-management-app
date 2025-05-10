import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar.jsx'
import Profile from './cards/Profile.jsx'

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState("")

    
    const handleSearch = ()=>{}
    
    const onClearSearch = ()=>{
        setSearchQuery("")
    }
    
    const navigate = useNavigate()

    const onLogout = ()=>{
        navigate('/login')
    }

  return (
    <>
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>
        <span className='text-gray-400'>Good</span>
        <span className='text-black' >Notes</span>
        </h2>
        <SearchBar value={searchQuery} onChange={({target}) => setSearchQuery(target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch}/>
        <Profile onLogout={onLogout} />
    </div>
    </>
  )
}

export default Navbar
