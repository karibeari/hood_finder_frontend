import React, { Component } from 'react'
import NewUserForm from './NewUserForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class NewUserButton extends Component {
  constructor() {
    super()
    this.state = { showForm: false }
  }

  showNewForm = () => {
    this.setState({ showForm: true })
  }

  hideNewForm = () => {
    this.setState({ showForm: false })
  }

  render() {
    return(
      <div>
        <NewUserForm show={ this.state.showForm } hideNewForm={ this.hideNewForm } createNewUser={ this.props.createNewUser }/>
        <button className="login-button" onClick={ this.showNewForm }><FontAwesomeIcon icon={faPlus} /> Create New Account </button>
      </div>
    )
  }
}
