import React from 'react'
// import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { currentUser, logout } = useAuth()

  function handleLogout(){
    logout()
  }

  return (
    <div className='header'>
      <div className='header__container'>
        <Link to='/my-notes'>My Notes</Link>
        <Link to='/'>Community Notes</Link>
        {currentUser ? <button variant="link" onClick={handleLogout}>Log out</button> : ""}
      </div>
    </div>
  )
}
