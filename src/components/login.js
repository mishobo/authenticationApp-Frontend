import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { login } from '../actions/auth'
import Wallpaper from '../css/images/wallpaperflare.jpg'

const Login = (props) => {
  let navigate = useNavigate()
  const form = useRef()
  const checkBtn = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    form.current.validateAll()
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate('/profile')
          window.location.reload()
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" />
  }

  const mystyle = {
    backgroundImage: `url(${Wallpaper})`,
    height: '100vh',
  }

  return (
    <div style={mystyle}>
      <div className="img js-fullheight">
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap">
                  <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        id="password-field"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="form-control btn btn-primary submit px-3"
                        disabled={loading}
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                      </button>
                    </div>

                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login
