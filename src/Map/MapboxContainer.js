import React, { Component } from "react";
import ReactMapboxGl, {  ZoomControl } from 'react-mapbox-gl';
// import MapMarker from './MapMarker';
import './Map.css'
import PolygonContainer from './PolygonContainer'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2Fy.f6ckouYcZFsUJwYDDRamyw"
})

export default class MapboxContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      neighborhood: null
    }
  }

  // displaySchools = () => {
  //   const schools = this.props.schools || []
  //   return schools.map(school => {
  //     return <MapMarker school={school} key={school.id}/>
  //   })
  // }


  render() {
    const { neighborhood } = this.state
    return (
      <div id="mapbox-container">
        <Map
          style={"mapbox://styles/mapbox/streets-v8"}
          zoom={[11]}
          center={[-104.920999, 39.727388]}
          >
          {this.displaySchools}
          <ZoomControl />
          <PolygonContainer neighborhoods={ this.props.neighborhoods } customFilterView={ this.props.customFilterView }/>
        </Map>
      </div>
    )
  }
}
