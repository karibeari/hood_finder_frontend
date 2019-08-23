import React from 'react'
import { custom_filter } from '../Filters'
import './CustomFilters.css'

const FindMatchButton = props => {

  const handleClick = () => {
    props.getNeighborhoodMatches()
    props.setActiveFilter(custom_filter)
  }

  return(
    <button className="app-button" id="match-button" onClick={ handleClick }>Find Matching Neighborhood</button>
  )
}

export default FindMatchButton
