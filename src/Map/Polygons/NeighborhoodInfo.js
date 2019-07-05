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
    const { NBRHD_NAME, PCT_65_PLUS, PCT_LESS_18, PCT_TWO_OR_MORE_RACES, PCT_WHITE, PCT_BLACK, PCT_ASIAN, PCT_AMERIND, PCT_HISPANIC, PCT_HAW_PACIS, PCT_OTHER_RACE, POPULATION_2010, zestimate } = this.props.neighborhood

    return(
      <section className="neighborhood-modal" ref={node=> this.node = node}>
        <h1 id="neighborhood-title">{NBRHD_NAME}</h1>
        <div id="neighborhood-piecharts">
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
              ['Asian', PCT_ASIAN,],
              ['Black', PCT_BLACK],
              ['Hispanic', PCT_HISPANIC],
              ['White', PCT_WHITE],
              ['Other Race', PCT_OTHER_RACE + PCT_TWO_OR_MORE_RACES + PCT_HAW_PACIS + PCT_AMERIND]
            ]}
          />
        </div>
        <div id='neighborhood-content'>
          <h2>Population: { POPULATION_2010 } </h2>
          <h2>Median Home Value: ${ zestimate } </h2>
        </div>

      </section>
    )
  }
}
