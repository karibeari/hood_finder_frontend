import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature} from 'react-mapbox-gl';
import Polygon from './Polygon'
import Key from './Key'
import neighborhoodCoords from './neighborhoodCoords'
import { population_filter, over65_filter, under18_filter } from './Filters'

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
    const { colors, ranges, limits } = under18_filter

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
          <button id="noFilter" className="filter-button" onClick={this.toggleFilter}>Clear Filters</button>
          <button id="population" className="filter-button" onClick={this.toggleFilter}>{"Population"}</button>
          <button id="over65" className="filter-button" onClick={this.toggleFilter}>Over65</button>
          <button id="under18" className="filter-button" onClick={this.toggleFilter}>Under18</button>
        </div>
        { noFilter.display && this.clearPolygons() }
        { population.display && this.populationPolygons() }
        { over65.display && this.over65Polygons() }
        { under18.display && this.under18Polygons() }
        <div id="key-container">
          { population.display && this.makeKey(population_filter) }
          { over65.display && this.makeKey(over65_filter) }
          { under18.display && this.makeKey(under18_filter) }
        </div>
      </div>
    )
  }
}
