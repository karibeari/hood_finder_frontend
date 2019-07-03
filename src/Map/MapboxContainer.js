import React, { Component } from "react";
import ReactMapboxGl, {  ZoomControl } from 'react-mapbox-gl';
// import MapMarker from './MapMarker';
import './Map.css'
import PolygonContainer from './Polygons/PolygonContainer'
import CustomFiltersButton from '../CustomFilters/CustomFiltersButton'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2FyaWZlcmVuY3p5IiwiYSI6ImNqd2t0cjllZjBxOHU0YXBjeHhncHVscWgifQ.f6ckouYcZFsUJwYDDRamyw"
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


  shouldComponentUpdate(nextProps) {
    return this.props.CustomFilterMenuView !== nextProps.customFilterMenuView
  }

  render() {
    // const { neighborhood } = this.state
    return (
      <div className={ this.props.customFilterMenuView ? "mapbox-container-small" : "mapbox-container"}>
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[11]}
          center={[-104.920999, 39.727388]}
          >
          <CustomFiltersButton
            className="filter-menu-parent"
            toggleCustomFilterMenu={ this.props.toggleCustomFilterMenu }
            customFilterMenuView={ this.props.customFilterMenuView }
          />
          <ZoomControl />
          <PolygonContainer
            neighborhoods={ this.props.neighborhoods }
            customFilterView={ this.props.customFilterView }
            setActiveFilter={ this.props.setActiveFilter }
            activeFilter={ this.props.activeFilter }
            />
        </Map>
      </div>
    )
  }
}
