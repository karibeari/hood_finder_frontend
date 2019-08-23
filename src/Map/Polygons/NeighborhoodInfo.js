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
    const { NBRHD_NAME, PCT_65_PLUS, PCT_LESS_18, PCT_TWO_OR_MORE_RACES, PCT_WHITE, PCT_BLACK, PCT_ASIAN, PCT_AMERIND, PCT_HISPANIC, PCT_HAW_PACIS, PCT_OTHER_RACE, POPULATION_2010, MALE, FEMALE, HU_OWNED, HU_RENTED, zestimate } = this.props.neighborhood

    return(
      <section className="neighborhood-modal" ref={node=> this.node = node}>
        <h1 id="neighborhood-title">{NBRHD_NAME}</h1>
        <article className="neighborhood-modal-content">
          <figure id="odd">
            <h2>Age Demographics</h2>
              <PieChart
                data={[
                  ['Over 65', PCT_65_PLUS],
                  ['Under 18', PCT_LESS_18],
                  ['Between 18-65', PCT_65_PLUS-PCT_LESS_18]
                ]}
              />
          </figure>
          <figure id="even">
            <h2>Race Demographics</h2>
              <PieChart
                data={[
                  ['Asian', PCT_ASIAN,],
                  ['Black', PCT_BLACK],
                  ['Hispanic', PCT_HISPANIC],
                  ['White', PCT_WHITE],
                  ['Other Race', PCT_OTHER_RACE + PCT_TWO_OR_MORE_RACES + PCT_HAW_PACIS + PCT_AMERIND]
                ]}
              />
          </figure>
          <figure id="odd">
            <h2>Gender Demographics</h2>
              <PieChart
                data={[
                  ['Male', FEMALE,],
                  ['Female', MALE]
                ]}
              />
          </figure>
          <figure id="even">
            <h2>Renters Vs Owners</h2>
              <PieChart
                data={[
                  ['Housing Units Owned', HU_OWNED,],
                  ['Housing Units Rented', HU_RENTED]
                ]}
              />
          </figure>
          <table>
            <tr>
              <td>Total Neighborood Population</td>
              <td>{ POPULATION_2010 }</td>
            </tr>
            <tr>
              <td>Median Home Value</td>
              <td>{ zestimate }</td>
            </tr>
          </table>
        </article>
      </section>
    )
  }
}
