import React from 'react'
// import { Auth } from 'firebase/auth'
import { Button } from "react-bootstrap"

import { useAuth } from '../../context/AuthContext'
export default function Header() {
  const { logout } = useAuth()

  function handleLogout(){
    logout()
  }

  return (
    <div className='header'>
      <div className='header__container'>
        <h2>Comunity Page</h2>
        <h2>My Page</h2>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>

      </div>
    </div>
  )
}
