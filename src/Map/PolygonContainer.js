import React, { Component } from "react";
import Polygon from './Polygon'
import Key from './Key'
import CustomFilterKey from './CustomFilterKey'
import neighborhoodCoords from './neighborhoodCoords'
import { population_filter, over65_filter, under18_filter, custom_filter } from '../Filters'

export default class PolygonContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      buttons: {
        noFilter: {display: true},
        population: {display: false},
        over65: {display: false},
        under18: {display: false}
      }
    }
  }

  toggleFilter = (event) => {
    const buttons = {
      noFilter: {display: false},
      population: {display: false},
      over65: {display: false},
      under18: {display: false}
    }
    buttons[event.target.id].display = true
    this.setState({ buttons })
  }

  makeKey = (filter) => <Key filter={filter}/>

  colorPolygon = (mapNeighborhood, color, neighborhood) =>  <Polygon mapNeighborhood={mapNeighborhood} color={color} neighborhood={neighborhood} showInfo={this.showInfo} key={neighborhood.id}/>

  customFilterPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = custom_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.match_score <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.match_score <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.match_score <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.match_score <= limits[3]):
            color = colors[3]
            break;
          case (neighborhood.match_score <= limits[4]):
            color = colors[4]
            break;
          case (neighborhood.match_score <= limits[5]):
            color = colors[5]
            break;
          case (neighborhood.match_score <= limits[6]):
            color = colors[6]
            break;
          case (neighborhood.match_score <= limits[7]):
            color = colors[7]
            break;
          case (neighborhood.match_score <= limits[8]):
            color = colors[8]
            break;
          case (neighborhood.match_score > limits[8]):
            color = colors[9]
            break;
          default:
            color = "#FFF"
            break;
        }
        // console.log(neighborhood.match_score, color)
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
  })

  populationPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = population_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.POPULATION_2010 <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.POPULATION_2010 <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.POPULATION_2010 <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.POPULATION_2010 > limits[2]):
            color = colors[3]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
  })

  over65Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = over65_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_65_PLUS <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.PCT_65_PLUS <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.PCT_65_PLUS > limits[1]):
            color = colors[2]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
  })

  under18Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = under18_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_LESS_18 <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.PCT_LESS_18 <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.PCT_LESS_18 <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.PCT_LESS_18 > limits[2]):
            color = colors[3]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
  })

  clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#B9B9B9"
    return this.props.neighborhoods.map ( neighborhood => parseInt(mapNeighborhood.id) === neighborhood.id ? this.colorPolygon(mapNeighborhood, color, neighborhood) : null )
    })

  render() {
    const { noFilter, population, over65, under18 } = this.state.buttons
    return (
      <div id="polygon-container">
        <div id="button-container">
          <button id="noFilter" className="filter-button" onClick={this.toggleFilter}>Clear Map Filters</button>
          <button id="population" className="filter-button" onClick={this.toggleFilter}>{"Population"}</button>
          <button id="over65" className="filter-button" onClick={this.toggleFilter}>Over65</button>
          <button id="under18" className="filter-button" onClick={this.toggleFilter}>Under18</button>
        </div>
          { noFilter.display && this.clearPolygons() }
          { population.display && this.populationPolygons() }
          { over65.display && this.over65Polygons() }
          { under18.display && this.under18Polygons() }
          { this.props.customFilterView.display && this.customFilterPolygons() }
        <div id="key-container">
          { population.display && this.makeKey(population_filter) }
          { over65.display && this.makeKey(over65_filter) }
          { under18.display && this.makeKey(under18_filter) }
          { this.props.customFilterView.display && <CustomFilterKey /> }
        </div>
      </div>
    )
  }
}
