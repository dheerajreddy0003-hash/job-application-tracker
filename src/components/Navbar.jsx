import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <div className="nav container">
      <div>
        <Link to="/">JobAppTracker</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-application">Add Application</Link>
        <Link to="/applications">Applications</Link>
        {user ? (
          <>
            <span style={{marginLeft:12}} className="small">{user.email}</span>
            <button onClick={logout} style={{marginLeft:12}} className="button">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  )
}
