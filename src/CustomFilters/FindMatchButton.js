import React from 'react'
import './CustomFilters.css'

const FindMatchButton = props => {

  const handleClick = () => {
    props.getNeighborhoodMatches()
    props.showCustomFilterView()
  }

  return(
    <button className="app-button" id="match-button" onClick={ handleClick }>Find Matching Neighborhood</button>
  )
}

export default FindMatchButton
