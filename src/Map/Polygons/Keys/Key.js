import React from 'react'

const Key = (props) => {
  const {title, colors, ranges} = props.activeFilter

  const keyValues = () => {
    return colors.map((color, index) =>
    <p key={index}>
      <span className="key-box" style={{background: `${color}`}}></span>
      : {ranges[index]}
    </p> )
  }

  return (

    <div id="key">
      <h1> {title} </h1>
      <div> {keyValues()} </div>
    </div>
  )
}

export default Key
