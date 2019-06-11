import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Login from './Login'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleChange = e => {this.setState({[e.target.name]: e.target.value})}

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleLogin(this.state.username, this.state.password)
  }


  render() {
    return(
      <main>
        <h1> Welcome! </h1>
        <Login handleLogin={this.props.handleLogin}/>

      </main>
    )
  }
}
