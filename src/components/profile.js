import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '../css/images/avatar.jpeg'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  const mystyle = {
    width: '400px',
  }

  return (
    <div className="container pt-5">
      <header>
        <h3>User Profile</h3>
      </header>
      <div className="card" style={mystyle}>
        <img className="card-img-top" src={Avatar} alt="" />
        <div class="card-body">
          <h4 class="card-title">Hussein Abdallah Mishobo</h4>
          <p class="card-text">
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p class="card-text">
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p class="card-text">
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </p>
          <p class="card-text">
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p class="card-text">
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{' '}
            ...{' '}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20,
            )}
          </p>
        </div>
      </div>
      <div class="card-body"></div>
    </div>
  )
}

export default Profile
