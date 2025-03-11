import React from 'react'
import { NavLink } from 'react-router-dom'
const Logo = () => {
  return (
    <NavLink to="/">
    <div className="relative text-[20px] xl:text-4xl font-extrabold flex items-center tracking-wide ">
      <span className="text-bg5 drop-shadow-lg">H</span>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 animate-spin">
      <circle cx="12" cy="12" r="10" stroke="#FFC312" strokeWidth="2" />
      <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
      </svg>
      <span className="text-white drop-shadow-lg">BET</span>
    </div>
    </NavLink>
  )
}

export default Logo
