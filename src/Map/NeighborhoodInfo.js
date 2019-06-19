import React, { Component } from 'react'
import { PieChart } from 'react-chartkick'
import 'chart.js'

export default class NeighborhoodInfo extends Component {

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return
    }
    this.props.toggleInfo()
  }

  render() {
    const { NBRHD_NAME, PCT_65_PLUS, PCT_LESS_18, PCT_TWO_OR_MORE_RACES, PCT_WHITE, PCT_BLACK, PCT_ASIAN, PCT_AMERIND, PCT_HISPANIC, PCT_HAW_PACIS, PCT_OTHER_RACE } = this.props.neighborhood

    return(
      <section className="neighborhood-modal" ref={node=> this.node = node}>
        <h1 id="neighborhood-title">{NBRHD_NAME}</h1>
        <div id="neighborhood-content">
          <PieChart
            className='pie-chart'
            data={[
              ['Over 65', PCT_65_PLUS],
              ['Under 18', PCT_LESS_18],
              ['Between 18-65', PCT_65_PLUS-PCT_LESS_18]
            ]}
          />
          <PieChart
            className='pie-chart'
            data={[
              ['American Indian', PCT_AMERIND],
              ['Asian', PCT_ASIAN,],
              ['Black', PCT_BLACK],
              ['Pacific Islander', PCT_HAW_PACIS],
              ['Hispanic', PCT_HISPANIC],
              ['White', PCT_WHITE],
              ['Other Race', PCT_OTHER_RACE],
              ['Two or More Races', PCT_TWO_OR_MORE_RACES]
            ]}
          />
        </div>
      </section>
    )
  }
}
