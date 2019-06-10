import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature} from 'react-mapbox-gl';
import Polygon from './Polygon'
import neighborhoodCoords from './neighborhoodCoords'

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

  colorPolygon = (mapNeighborhood, color, neighborhood) =>  <Polygon mapNeighborhood={mapNeighborhood} color={color} neighborhood={neighborhood} showInfo={this.showInfo} key={neighborhood.id}/>

  populationPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.POPULATION_2010 <= 5000):
            color = "#edf8fb"
            break;
          case (neighborhood.POPULATION_2010 <= 10000):
            color = "#b3cde3"
            break;
          case (neighborhood.POPULATION_2010 <= 15000):
            color = "#8c96c6"
            break;
          case (neighborhood.POPULATION_2010 > 15000):
            color = "#88419d"
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
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_65_PLUS <= 10):
            color = "#b2e2e2"
            break;
          case (neighborhood.PCT_65_PLUS <= 20):
            color = "#66c2a4"
            break;
          case (neighborhood.PCT_65_PLUS > 20):
            color = "#238b45"
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
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_LESS_18 <= 10):
            color = "#f0f9e8"
            break;
          case (neighborhood.PCT_LESS_18 <= 20):
            color = "#bae4bc"
            break;
          case (neighborhood.PCT_LESS_18 <= 30):
            color = "#7bccc4"
            break;
          case (neighborhood.PCT_LESS_18 > 30):
            color = "#2b8cbe"
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
      <div>
      <button id="noFilter" className="filter-button" onClick={this.toggleFilter}>Clear Filters</button>
      <button id="population" className="filter-button" onClick={this.toggleFilter}>Population</button>
      <button id="over65" className="filter-button" onClick={this.toggleFilter}>Over65</button>
      <button id="under18" className="filter-button" onClick={this.toggleFilter}>Under18</button>
      { noFilter.display && this.clearPolygons() }
      { population.display && this.populationPolygons() }
      { over65.display && this.over65Polygons() }
      { under18.display && this.under18Polygons() }
      </div>
    )
  }
}
