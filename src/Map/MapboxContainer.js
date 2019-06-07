import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MapMarker from './MapMarker';
import neighborhoodCoords from './neighborhoodCoords'


const Map = ReactMapboxGl({
  accessToken: ""
});

const initialState = {
  population: {display: false},
  over65: {display: false},
  under18: {display: false}
}

export default class MapboxContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }



  displaySchools = () => {
    const schools = this.props.schools || []
    console.log(this.props.schools)
    return schools.map(school => {
      return <MapMarker school={school} />
    })
    // console.log(this.props.schools)
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
    let color = "#000"
    return this.colorPolygon(mapNeighborhood, color)
  })

  toggleFilter = (event) => {
    this.setState({
      ...initialState,
      [event.target.id]: {display: true}
    })
  }

  render() {
    const {population, over65, under18 } = this.state
    return (
      <div>
        <button id="population"onClick={this.toggleFilter}>Population</button>
        <button id="over65" onClick={this.toggleFilter}>Over65</button>
        <button id="under18" onClick={this.toggleFilter}>Under18</button>

        <Map id="fixmap"
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[11]}
          center={[-104.99, 39.74]}
          >
          {this.clearPolygons()}
          {population.display && this.populationPolygons()}
          {over65.display && this.over65Polygons()}
          {under18.display && this.under18Polygons()}
          { this.displaySchools()}
        </Map>
      </div>

    );
  }
}
