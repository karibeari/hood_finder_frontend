import React, { Component } from 'react'

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
    this.props.handleLogin(this.state.username, this.state.password)
  }


  render() {
    const { username, password } = this.state
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={username} name="username" onChange={this.handleChange} placeholder="Username" />
        <input type="password" value={password} name="password" onChange={this.handleChange} placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    )
  }
}
