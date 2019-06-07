import React, { Component } from 'react'
import { Marker } from 'react-mapbox-gl'
import './Map.css'

export default class MapMarker extends Component {
  constructor () {
    super()
    this.state={}
  }
// const { id, name, url, latitude, longitude, level, current_rank, last_year_rank } = this.props.school


  render() {
    const { id, name, url, latitude, longitude, level, current_rank, last_year_rank } = this.props.school
    return(
    <div>
      {console.log('working', this.props.school)}
      </div>
    )
  }
}

// <Marker
//   coordinates={[latitude, longitude]}
//   anchor="bottom">
//   <img className="school-marker" src="https://cdn3.iconfinder.com/data/icons/map-markers-1/512/education-512.png"/>
// </Marker>
