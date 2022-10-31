import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
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

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

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

  return (
    <div>
      {currentUser ? (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {currentUser ? (
            <Link to={'/'} className="navbar-brand">
              Mishobo
            </Link>
          ) : (
            <Link to={'/'} className="navbar-brand"></Link>
          )}

          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={'/mod'} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={'/mod'} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={'/admin'} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/profile'} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto"></div>
          )}
        </nav>
      ) : (
        ''
      )}
      {/* <Route exact path={['/home', '/home']} component={Home} /> */}
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
