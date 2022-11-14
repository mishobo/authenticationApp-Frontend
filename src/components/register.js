import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { register } from '../actions/auth'

const Register = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setSuccessful(false)
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true)
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  const mystyle = {
    borderStyle: 'solid',
  }

  return (
    <div className="container pt-5">
      <div className="card card-container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-floating mb-3 mt-3">
                    <input
                      type="text"
                      className="form-control sign-up"
                      style={mystyle}
                      id="username"
                      placeholder="Enter username"
                      name="username"
                    />
                    <label for="username">username</label>
                  </div>
                  <div className="form-floating mb-3 mt-3">
                    <input
                      type="text"
                      className="form-control sign-up"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                    />
                    <label for="email">Email</label>
                  </div>
                  <div className="form-floating mb-3 mt-3">
                    <input
                      id="password"
                      type="password"
                      className="form-control sign-up"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={onChangePassword}
                      required
                    />
                    <label for="password">password</label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? 'alert alert-success' : 'alert alert-danger'
                    }
                    role="alert"
                  >
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
  )
}

export default Register
