import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


export default function UserPrivateRoutes() {
  const { currentUser } = useAuth()
  return currentUser ?  <Navigate to="/" /> : <Outlet />;
}
