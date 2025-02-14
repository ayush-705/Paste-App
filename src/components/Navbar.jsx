import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center my-8'>
        <div>
            <NavLink to='/' className='text-xl font-bold my-4'>Paste App</NavLink>
        </div>
        <div className='flex gap-6'>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/pastes'>
                My Pastes
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar