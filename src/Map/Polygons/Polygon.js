import React, { Component } from "react";
import { Layer, Feature} from 'react-mapbox-gl';
import NeighborhoodInfo from './NeighborhoodInfo'

let opacity = 0.7

export default class Polygon extends Component {
  constructor () {
    super ()
    this.state = {
      hover: false,
      showInfo: false
    }
  }

  onHover = () => { this.setState({...this.state, hover: !this.state.hover }) }

  toggleInfo = () => { this.setState({...this.state, showInfo: !this.state.showInfo })
    this.props.setMapNeighborhood(this.props.neighborhood)}

  render() {
    let { mapNeighborhood, color, neighborhood } = this.props

    return (
      <>
        <Layer key={neighborhood.id}
              type="fill"
              paint={{
                'fill-color': `${color}`,
                'fill-opacity': opacity,
                'fill-outline-color': "#FFF"
              }}
              className="polygon"
        >
          <Feature
            coordinates={ [mapNeighborhood.coordinates] }
            style={{'cursor':'pointer'}}
            onClick={ () => this.toggleInfo() }
            onMouseEnter={ () => {
              opacity = 1
              this.onHover()
            }}
            onMouseLeave={ () => {
              opacity = 0.7
              this.onHover()
            }}
          />
        </Layer>

      </>
    )
  }
}

  // { this.state.showInfo && <NeighborhoodInfo toggleInfo={ this.toggleInfo } neighborhood={neighborhood}/> }
