import React, { Component } from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import NewUserButton from './NewUserButton'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {this.setState({[e.target.name]: e.target.value})}

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleLogin(this.state)
  }

  render() {
    const { username, password } = this.state
    return(
      <section className="login-form">
        <h1>Welcome!</h1>
        <h2>Please log in or create a new account.</h2>
        <input type="text" value={username} name="username" onChange={this.handleChange} placeholder="Username" />
        <input type="password" value={password} name="password" onChange={this.handleChange} placeholder="Password" />
        <button type="submit" value="Login" className="login-button" onClick={this.handleSubmit}><FontAwesomeIcon icon={faSignInAlt} /> Sign In </button>
        <NewUserButton createNewUser={this.props.createNewUser}/>
      </section>
    )
  }
}
