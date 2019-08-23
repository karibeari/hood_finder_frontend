import React, { Component } from 'react'

export default class Checkbox extends Component {
  constructor () {
    super()
    this.state = {
      checked: false,
      range: {
        min: null,
        max: null
      }
    }
  }

  setRange = () => {
    let range = this.props.range.split('-')
    let cleanRange = range.map(value => value.replace(/[,\$\%\over]/g, ''))
    cleanRange = cleanRange.map(value => parseInt(value))
    cleanRange.length === 2 ? this.setState({
      ...this.state,
      range: {
        min: cleanRange[0],
        max: cleanRange[1]
      }
    }) : this.setState({
      ...this.state,
      range: {
        min: cleanRange[0],
        max: this.props.max
      }
    })
  }

  toggleCheck = () => this.setState({ checked: !this.state.checked })

  handleCheckboxChange = e => {
    if (this.state.checked) {
      this.toggleCheck()
      this.props.clearCustomFilters(this.props.name, this.state.range)
    } else {
      this.toggleCheck()
      this.props.setCustomFilters(this.props.name, this.state.range)
    }
  }

  componentDidMount() {
    this.setRange()
  }

  render() {
    return(
      <>
        <input type="checkbox" name={this.props.range} onChange={ this.handleCheckboxChange } />
        <p className="checkbox">{this.props.range}</p>
      </>
    )
  }
}
