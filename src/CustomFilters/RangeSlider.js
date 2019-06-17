import React, { Component } from 'react'
import './CustomFilters.css'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import '../Filters.js'

export default class RangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: { min: 0, max: parseInt(props.max) }
    }
  }

  handleChange = () => {
    let { name } = this.props
    name = name.toLowerCase().split(' ').join('_')
    this.props.setCustomFilters(name, this.state.range)
  }


  render() {
    return(
      <section className="slidecontainer">
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
