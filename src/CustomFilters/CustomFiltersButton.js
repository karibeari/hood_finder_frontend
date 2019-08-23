import React from 'react'
import './CustomFilters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const CustomFiltersButton = props => {

  const handleClick = () => {
    props.toggleCustomFilterMenu()
  }

  return(
    <button id="filter-button" onClick={ handleClick }><FontAwesomeIcon icon={props.customFilterMenuView ? faAngleDoubleRight : faAngleDoubleLeft} /></button>
  )
}

export default CustomFiltersButton
