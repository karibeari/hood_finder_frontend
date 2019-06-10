import React, { Component } from 'react'
import { Marker } from 'react-mapbox-gl'
import './Map.css'

export default class MapMarker extends Component {
  constructor () {
    super()
    this.state={}
  }


  render() {
    const { latitude, longitude } = this.props.school
    return(
      <Marker
        coordinates={[`${longitude}`, `${latitude}`]}
        anchor="bottom">
        <img className="school-marker" src="https://cdn3.iconfinder.com/data/icons/map-markers-1/512/education-512.png" alt=""/>
      </Marker>
    )
  }
}
