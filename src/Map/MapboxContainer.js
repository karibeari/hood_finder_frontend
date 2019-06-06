import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import neighborhoodCoords from './neighborhoodCoords'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2FyaWZlcmVuY3p5IiwiYSI6ImNqd2t0cjllZjBxOHU0YXBjeHhncHVscWgifQ.f6ckouYcZFsUJwYDDRamyw"
});

const initialState = {
  displayPopulation: false,
  displayOver65: false,
  displayUnder18: false
}

export default class MapboxContainer extends Component {

  constructor() {
    super()
    this.state = { ...initialState }
  }

  colorPolygon = (neighborhood, color) => {
    return <Layer key={neighborhood.id}
                  type="fill"
                  paint={{
                    'fill-color': `${color}`,
                    'fill-opacity': 0.7,
                    'fill-outline-color': "#000"
                  }}>
              <Feature coordinates={ [neighborhood.coordinates] } />
          </Layer>
    }

  populationPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    this.props.neighborhoods.map ( neighborhood => {
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
      }
    })
    return this.colorPolygon(mapNeighborhood, color)
  })

  over65Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    this.props.neighborhoods.map ( neighborhood => {
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
      }
    })
    return this.colorPolygon(mapNeighborhood, color)
  })

  under18Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    this.props.neighborhoods.map ( neighborhood => {
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
      }
    })
    return this.colorPolygon(mapNeighborhood, color)
  })

  clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#C0C3E1"
    return this.colorPolygon(mapNeighborhood, color)
  })

  makePolygons = filter => {
    switch (filter) {
      case ("population"):
        this.populationPolygons()
        break;
      case ("over65"):
        this.over65Polygons()
        break;
      case ("under18"):
        this.under18Polygons()
        break;
      default:
        break;
    }
  }

  toggleDisplayPopulation = () => {

    this.setState({
      ...initialState,
      displayPopulation: !this.state.displayPopulation

    })
  }
  toggleDisplayOver65 = () => {
    this.setState({
      ...initialState,
      displayOver65: !this.state.displayOver65
    })
  }
  toggleDisplayUnder18 = () => {
    this.setState({
      ...initialState,
      displayUnder18: !this.state.displayUnder18
    })
  }

  render() {
    const {displayPopulation, displayOver65, displayUnder18 } = this.state
    return (
      <div>
        <button onClick={this.toggleDisplayPopulation}>Population</button>
        <button onClick={this.toggleDisplayOver65}>Over65</button>
        <button onClick={this.toggleDisplayUnder18}>Under18</button>

        <Map id="fixmap"
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[11]}
          center={[-104.99, 39.74]}
          >
          {this.clearPolygons()}
          {displayPopulation && this.populationPolygons()}
          {displayOver65 && this.over65Polygons()}
          {displayUnder18 && this.under18Polygons()}
        </Map>
      </div>

    );
  }
}
