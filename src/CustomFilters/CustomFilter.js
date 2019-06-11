import React, { Component } from 'react'
import './CustomFilters.css'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export default class CustomFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      priority: 1,
      range: {min: 1, max: 10}
    }
  }

  render() {
    return(
      <form className="slidecontainer">
        <h2>{this.props.name}</h2>
        Priority
        <div className="range-slider">
          <InputRange
            maxValue={10}
            minValue={1}
            value={this.state.priority}
            onChange={priority => this.setState({ priority })}
           />
         </div>
         Range
         <div className="range-slider">
           <InputRange
             maxValue={20000}
             minValue={1}
             value={this.state.range}
             onChange={range => this.setState({ range })}
            />
          </div>
      </form>

    )
  }
}

// <input type="range" min={1} max={100} className="slider" value={this.state.priority} onChange={this.handleChange} name="priority"/>
