import React from 'react'
import './CustomFilters.css'
import '../Filters.js'
import Checkbox from './Checkbox'

const CheckboxContainer = (props) =>  {

  const displayCheckboxes = () => {
    return props.filter.ranges.map(range => {
       return <Checkbox
                name={props.name}
                range={ range }
                max={ props.max }
                key={ range }
                setCustomFilters={ props.setCustomFilters }
                clearCustomFilters={ props.clearCustomFilters }
              />})
  }

  return(
    <div className="checkbox-container">
      {displayCheckboxes()}
    </div>
  )
}

export default CheckboxContainer
