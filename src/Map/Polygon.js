import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature} from 'react-mapbox-gl';
import neighborhoodCoords from './neighborhoodCoords'
import NeighborhoodInfo from './NeighborhoodInfo'

// const initialState = {
//   population: {display: false},
//   over65: {display: false},
//   under18: {display: false},
// }

export default class Polygon extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     ...initialState,
  //     neighborhood: null}
  // }


  render() {
    const { mapNeighborhood, color, neighborhood, showInfo} = this.props
    return (
      <div>
        <Layer key={neighborhood.id}
              type="fill"
              paint={{
                'fill-color': `${color}`,
                'fill-opacity': 0.7,
                'fill-outline-color': `${color}`
              }}
        >
            <Feature
              coordinates={ [mapNeighborhood.coordinates] }
              onClick={ () => showInfo(neighborhood)}
            />

        </Layer>
      {console.log('working', color)}
      </div>

    );
  }
}
