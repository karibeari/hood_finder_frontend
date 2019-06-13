import React from 'react'
import _ from 'lodash'
import { custom_filter } from '../Filters'

const CustomFilterKey = () => {
  let { title, colors } = custom_filter

  // colors = _.reverse(colors)

  const colorValues = () => {
    return colors.map((color, index) => <p key={index}><span className="color-value" style={{background: `${color}`}}></span></p> )
  }
  return (

    <div id="key">
      <h1> {title} </h1>
      <div id="color-chips"> {colorValues()} </div>
    </div>
  )

}

export default CustomFilterKey
