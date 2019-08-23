import React from 'react'
import './UserPrefs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const UserPrefsButton = props => {

  const handleClick = () => {
    props.toggleCustomFilterMenu()
  }

  return(
    <button id="filter-button" onClick={ handleClick }><FontAwesomeIcon icon={props.userPrefsMenu ? faAngleDoubleRight : faAngleDoubleLeft} /></button>
  )
}

export default UserPrefsButton
