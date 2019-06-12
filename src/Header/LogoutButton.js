import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const LogoutButton = (props) => {
  return(
    <button onClick={props.logout} id="logout-button"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button>
  )
}

export default LogoutButton
