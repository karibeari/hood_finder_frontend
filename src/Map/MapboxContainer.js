import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import neighborhoodCoords from './neighborhoodCoords'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2FyaWZlcmVuY3p5IiwiYSI6ImNqd2t0cjllZjBxOHU0YXBjeHhncHVscWgifQ.f6ckouYcZFsUJwYDDRamyw"
});


export default class MapboxContainer extends Component {

  colorPolygon = (neighborhood, color) => {
    return <Layer key={neighborhood.id}
                  type="fill"
                  paint={{
                    'fill-color': `${color}`,
                    'fill-opacity': 0.7,
                    'fill-outline-color': "#FFF"
                  }}>
      <Feature coordinates={ [neighborhood.coordinates] } />
    </Layer>
    }


  makePolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.POPULATION_2010 < 5000):
            color = "#edf8fb"
            break;
          case (neighborhood.POPULATION_2010 < 10000):
            color = "#b3cde3"
            break;
          case (neighborhood.POPULATION_2010 < 15000):
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

  render() {
    return (
      <Map id="fixmap"
        style="mapbox://styles/mapbox/streets-v8"
        zoom={[11]}
        center={[-104.99, 39.74]}
        >
        {this.makePolygons()}
      </Map>

    );
  }
}
