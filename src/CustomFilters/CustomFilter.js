import React, { Component } from 'react'
import './CustomFilters.css'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import '../Filters.js'

export default class CustomFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      priority: 1,
      range: { min: 1, max: parseInt(props.max) }
    }
  }

  handleChange = () => {
    let { name } = this.props
    name = name.toLowerCase().split(' ').join('_')
    this.props.setCustomFilters(name, this.state)
  }


  render() {
    return(
      <section className="slidecontainer">
        <h2>{ this.props.name }</h2>
        Priority
        <div className="range-slider">
          <InputRange
            name="priority"
            maxValue={ 10 }
            minValue={ 1 }
            value={ this.state.priority }
            onChange={ priority => this.setState({ priority }) }
            onChangeComplete={ () => this.handleChange() }
           />
         </div>
         Range
         <div className="range-slider">
           <InputRange
             name="range"
             maxValue={ parseInt(this.props.max) }
             minValue={ 0 }
             value={ this.state.range }
             onChange={ range => this.setState({ range }) }
             onChangeComplete={ () => this.handleChange() }
            />
          </div>
      </section>

    )
  }
}
