import React from 'react'

const FilterButton = ({filter, setActiveFilter }) => {

  return(
    <button id={ filter.id } className="filter-button" onClick={ () => setActiveFilter(filter) }>{ filter.title }</button>
  )
}

export default FilterButton
