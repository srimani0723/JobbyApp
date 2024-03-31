import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    submitError: false,
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    this.setState({
      submitError: false,
    })
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({
      submitError: true,
      errorMsg,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  usernameInput = event =>
    this.setState({
      username: event.target.value,
    })

  passwordInput = event =>
    this.setState({
      password: event.target.value,
    })

  renderLogin = () => {
    const {errorMsg, submitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginform-container">
        <div className="loginform">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form" onSubmit={this.onSubmit}>
            <label className="label" htmlFor="user">
              USERNAME
            </label>
            <input
              className="input"
              id="user"
              type="text"
              placeholder="Username"
              onChange={this.usernameInput}
            />

            <label className="label" htmlFor="pass">
              PASSWORD
            </label>
            <input
              className="input"
              id="pass"
              type="password"
              placeholder="Password"
              onChange={this.passwordInput}
            />

            <button type="submit" className="login-btn">
              Login
            </button>

            {submitError ? <p className="error">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderLogin()}</div>
  }
}

export default LoginForm
