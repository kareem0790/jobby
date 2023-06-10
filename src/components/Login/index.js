import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    notLoggedIn: false,
    errorMsg: '',
  }

  successLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
    this.setState({notLoggedIn: false})
  }

  failureLogin = errorMsg => {
    this.setState({notLoggedIn: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginApiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    }
    this.failureLogin(data.error_msg)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  userinputForm = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="Username" className="user-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="user-input"
          id="Username"
          placeholder="USERNAME"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  userpasswordForm = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="Password" className="user-label">
          PASSWORD
        </label>
        <input
          id="Password"
          type="password"
          value={password}
          placeholder="PASSWORD"
          className="user-input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {notLoggedIn, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <div className="login-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.userinputForm()}
            {this.userpasswordForm()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {notLoggedIn ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
