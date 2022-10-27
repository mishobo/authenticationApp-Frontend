import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: '',
      password: '',
      loading: false,
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin(e) {
    e.preventDefault()
    this.setState({
      loading: true,
    })

    this.form.validateAll()

    const { dispatch, history } = this.props

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          this.setState({
            loading: false,
          })
        })
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { isLoggedIn, message } = this.props

    if (isLoggedIn) {
      return <Redirect to="/profile" />
    }

    return (
      <div className="login">
        <div className="img js-fullheight">
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                  <div className="login-wrap">
                    <Form
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c
                      }}
                    >
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
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
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          required
                        />
                        <span
                          toggle="#password-field"
                          className="fa fa-fw fa-eye field-icon toggle-password"
                        ></span>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control btn btn-primary submit px-3"
                          disabled={this.state.loading}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Sign In</span>
                        </button>
                      </div>
                      {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                      )}
                      <CheckButton
                        style={{ display: 'none' }}
                        ref={(c) => {
                          this.checkBtn = c
                        }}
                      />
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
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth
  const { message } = state.message
  return {
    isLoggedIn,
    message,
  }
}

export default connect(mapStateToProps)(Login)
