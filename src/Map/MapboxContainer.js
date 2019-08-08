import React, { Component } from "react";
import ReactMapboxGl, {  ZoomControl } from 'react-mapbox-gl';
// import MapMarker from './MapMarker';
import './Map.css'
import PolygonContainer from './Polygons/PolygonContainer'
import CustomFiltersButton from '../CustomFilters/CustomFiltersButton'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY
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
    const { customFilterMenuView, toggleCustomFilterMenu, neighborhoods, setActiveFilter, activeFilter } = this.props
    return (
      <div className={ customFilterMenuView ? "mapbox-container-small" : "mapbox-container"}>
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          zoom={[11]}
          center={[-104.920999, 39.727388]}
          >
          <CustomFiltersButton
            className="filter-menu-parent"
            toggleCustomFilterMenu={ toggleCustomFilterMenu }
            customFilterMenuView={ customFilterMenuView }
          />
          <ZoomControl />
          <PolygonContainer
            neighborhoods={ neighborhoods }
            setActiveFilter={ setActiveFilter }
            activeFilter={ activeFilter }
            />
        </Map>
      </div>
    )
  }
}
