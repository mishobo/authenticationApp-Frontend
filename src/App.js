import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { clearMessage } from './actions/message'
import 'bootstrap/dist/css/bootstrap.min.css'
import { logout } from './actions/auth'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import BoardUser from './components/board-user'
import BoardModerator from './components/board-moderator'
import BoardAdmin from './components/board-admin'
import './css/style.css'
import Dropdown from './components/Dropdown'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Avatar from './css/images/avatar.jpeg'

const App = () => {
  let navigate = useNavigate()
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [open, setOpen] = React.useState(false)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  let location = useLocation()

  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      dispatch(clearMessage()) // clear message when changing location
    }
  }, [dispatch, location])

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    } else {
      setShowModeratorBoard(false)
      setShowAdminBoard(false)
    }
  }, [currentUser])

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleMenu1 = () => {
    navigate('/profile')
    setOpen(false)
  }
  const handleMenu2 = () => {
    logOut()
    setOpen(false)
    navigate('/login')
  }
  const handleMenu3 = () => {
    navigate('/register')
    setOpen(false)
  }

  const userIcon = {
    width: '15px',
  }

  return (
    <div>
      {currentUser ? (
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link to={'/'} className="navbar-brand">
              logo
            </Link>

            <div className="navbar-nav ml-auto">
              <div>
                <Dropdown
                  open={open}
                  trigger={
                    <button
                      onClick={handleOpen}
                      className="user-button 
                     btn btn-primary"
                    >
                      {currentUser.username}
                      <span className="badge">
                        <img
                          src={Avatar}
                          alt="Logo"
                          style={userIcon}
                          className="rounded-pill"
                        />
                      </span>
                    </button>
                  }
                  menu={[
                    <button onClick={handleMenu1}>My Profile</button>,
                    <button onClick={handleMenu2}>Logout</button>,
                    <button onClick={handleMenu3}>Sign up</button>,
                  ]}
                />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ''
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
    </div>
  )
}

export default App
