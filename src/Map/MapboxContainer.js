import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapMarker from './MapMarker';

import NeighborhoodInfo from './NeighborhoodInfo'
import PolygonContainer from './PolygonContainer'



export default class MapboxContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      buttons: {
        noFilter: {display: true},
        population: {display: false},
        over65: {display: false},
        under18: {display: false}
      },
      neighborhood: null
  }
}

  // displaySchools = () => {
  //   const schools = this.props.schools || []
  //   return schools.map(school => {
  //     return <MapMarker school={school} key={school.id}/>
  //   })
  // }

  showInfo = (neighborhood) => {this.setState({ neighborhood })}
  hideInfo = () => {this.setState({ neighborhood: null })}

  onToggleHover = (cursor: string, { map }: { map: any }) => {map.getCanvas().style.cursor = cursor}




  render() {
    const {buttons, neighborhood } = this.state
    return (
      <div id="mapbox-container">
        <Map
          style={"mapbox://styles/mapbox/streets-v8"}
          zoom={[11]}
          center={[-104.920999, 39.727388]}
          >
          <ScaleControl />
          <ZoomControl />
          <PolygonContainer neighborhoods={this.props.neighborhoods}/>
          { neighborhood !== null && <NeighborhoodInfo neighborhood={this.state.neighborhood} hideAlert={this.hideInfo}/> }
        </Map>
      </div>
    )
  }
}
