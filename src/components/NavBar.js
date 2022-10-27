import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { clearMessage } from '../actions/message'
import { history } from '../helpers/history'
import EventBus from '../common/EventBus'
import { logout } from '../actions/auth'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    }

    history.listen((location) => {
      props.dispatch(clearMessage()) // clear message when changing location
    })
  }

  componentDidMount() {
    const user = this.props.user

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      })
    }
    EventBus.on('logout', () => {
      this.logOut()
    })
  }

  componentWillUnmount() {
    EventBus.remove('logout')
  }

  logOut() {
    this.props.dispatch(logout())
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    })
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state

    return (
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
              <a href="/login" className="nav-link" onClick={this.logOut}>
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
    )
  }
}

export default NavBar
