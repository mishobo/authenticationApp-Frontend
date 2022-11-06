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
      <div className="card" style={mystyle}>
        <img className="card-img-top" src={Avatar} alt="" />
        <div className="card-body">
          <h4 className="card-title">Hussein Abdallah Mishobo</h4>
          <p className="card-text">
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p className="card-text">
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p className="card-text">
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p className="card-text">
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{' '}
            ...{' '}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20,
            )}
          </p>
          <p className="card-text">
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </p>
        </div>
      </div>
      <div className="card-body"></div>
    </div>
  )
}

export default Profile
