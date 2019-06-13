import React from 'react'
import './CustomFilters.css'

const FindMatchButton = props => {

  const handleClick = () => {
    props.customNeighborhoods()
    props.showCustomFilterView()
  }

  return(
    <button onClick={ handleClick }>Find Matching Neighborhood</button>
  )
}

export default FindMatchButton