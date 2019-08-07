import React, { Component } from "react";
import Key from './Keys/Key'
import FilterButton from './FilterButton'
import ClearPolygons from './ClearPolygons'
import FilterPolygons from './FilterPolygons'
import neighborhoodCoords from '../neighborhoodCoords'
import { filters } from '../../Filters'

export default class PolygonContainer extends Component {

  clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#B9B9B9"
    return this.props.neighborhoods.map ( neighborhood => parseInt(mapNeighborhood.id) === neighborhood.id ? this.colorPolygon(mapNeighborhood, color, neighborhood) : null )
    })

  createButtons = () => filters.map( filter => <FilterButton key={ filter.id } filter={ filter} setActiveFilter={ this.props.setActiveFilter }/>)

  shouldComponentUpdate(nextProps) {
    const { activeFilter, neighborhoods } = this.props
    return activeFilter !== nextProps.activeFilter || neighborhoods !== nextProps.neighorhoods
  }

  render() {
    const { neighborhoods, activeFilter } = this.props
    return (
      <div id="polygon-container">
        <div id="button-container">
          {this.createButtons()}
        </div>
        { activeFilter.id === 'noFilter' && <ClearPolygons neighborhoods={  neighborhoods } activeFilter={ activeFilter }/> }
        { activeFilter.id !== 'noFilter' &&  <FilterPolygons neighborhoods={  neighborhoods } activeFilter={ activeFilter }/> }
        <div id="key-container">
          { activeFilter.id !== 'noFilter' && <Key activeFilter={  activeFilter }/> }
        </div>
      </div>
    )
  }
}
