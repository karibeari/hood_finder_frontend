import React, { Component } from 'react'
import './Login.css'

export default class NewUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: ''
    }
  }

  showHideClassName = () => this.props.show ? "modal display-block" : "modal display-none";

  handleChange = e => {this.setState({[e.target.name]: e.target.value})}

  handleSubmit = e => {
    e.preventDefault()
    this.props.createNewUser(this.state)
    this.props.hideNewForm()
  }

  render() {
    const { username, password, first_name, last_name } = this.state
    return(
      <div className={this.showHideClassName()}>
        <section className="modal-main">
          <h1>Let's get started!</h1>
          <input type="text" value={first_name} name="first_name" onChange={this.handleChange} placeholder="First Name" />
          <input type="text" value={last_name} name="last_name" onChange={this.handleChange} placeholder="Last Name" />
          <input type="text" value={username} name="username" onChange={this.handleChange} placeholder="Username" />
          <input type="password" value={password} name="password" onChange={this.handleChange} placeholder="Password" />
          <button className="login-button" onClick={this.handleSubmit} > Create New Account </button>
          <button className="login-button" onClick={this.props.hideNewForm} > Cancel </button>
        </section>
      </div>
    )
  }
}
