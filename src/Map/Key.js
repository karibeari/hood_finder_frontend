import React from 'react'

const Key = ({filter}) => {
  const {title, colors, ranges} = filter

  const keyValues = () => {
    return colors.map((color, index) => <p><span className="key-box" style={{background: `${color}`}}></span>: {ranges[index]}</p> )
  }
  return (

    <div id="key">
      <h1> {filter.title} </h1>
      <p> {keyValues()} </p>
    </div>
  )

}

export default Key
