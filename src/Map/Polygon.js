import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature} from 'react-mapbox-gl';
import neighborhoodCoords from './neighborhoodCoords'
import NeighborhoodInfo from './NeighborhoodInfo'

export default class Polygon extends Component {

  render() {
    const { mapNeighborhood, color, neighborhood, showInfo} = this.props
    return (
        <Layer key={neighborhood.id}
              type="fill"
              paint={{
                'fill-color': `${color}`,
                'fill-opacity': 0.8,
                'fill-outline-color': "#FFF"
              }}
        >
            <Feature
              coordinates={ [mapNeighborhood.coordinates] }
              onClick={ () => showInfo(neighborhood)}
            />
        </Layer>
    )
  }
}
