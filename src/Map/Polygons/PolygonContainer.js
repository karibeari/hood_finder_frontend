import React, { Component } from "react";
import Polygon from './Polygon'
import Key from './Keys/Key'
import CustomFilterKey from './Keys/CustomFilterKey'
import FilterButton from './FilterButton'
import ClearPolygons from './ClearPolygons'
import FilterPolygons from './FilterPolygons'
import neighborhoodCoords from '../neighborhoodCoords'
import { filters, population_filter, over65_filter, under18_filter, zestimate_filter, custom_filter } from '../../Filters'

export default class PolygonContainer extends Component {

  colorPolygon = (mapNeighborhood, color, neighborhood) =>  <Polygon mapNeighborhood={mapNeighborhood} color={color} neighborhood={neighborhood} showInfo={this.showInfo} key={neighborhood.id}/>

  customFilterPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = custom_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.match_score <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.match_score <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.match_score <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.match_score <= limits[3]):
            color = colors[3]
            break;
          case (neighborhood.match_score <= limits[4]):
            color = colors[4]
            break;
          case (neighborhood.match_score <= limits[5]):
            color = colors[5]
            break;
          case (neighborhood.match_score <= limits[6]):
            color = colors[6]
            break;
          case (neighborhood.match_score <= limits[7]):
            color = colors[7]
            break;
          case (neighborhood.match_score <= limits[8]):
            color = colors[8]
            break;
          case (neighborhood.match_score > limits[8]):
            color = colors[9]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      } else {return null}
    })
  })

  populationPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = population_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.POPULATION_2010 <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.POPULATION_2010 <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.POPULATION_2010 <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.POPULATION_2010 > limits[2]):
            color = colors[3]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      } else {return null}
    })
  })

  zestimatePolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = zestimate_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.zestimate <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.zestimate <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.zestimate <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.zestimate <= limits[3]):
            color = colors[3]
            break;
          case (neighborhood.zestimate > limits[3]):
            color = colors[4]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      } else {return null}
    })
  })

  over65Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = over65_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_65_PLUS <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.PCT_65_PLUS <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.PCT_65_PLUS > limits[1]):
            color = colors[2]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      } else {return null}
    })
  })

  under18Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits } = under18_filter
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_LESS_18 <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood.PCT_LESS_18 <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood.PCT_LESS_18 <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood.PCT_LESS_18 > limits[2]):
            color = colors[3]
            break;
          default:
            color = "#FFF"
            break;
        }
        return this.colorPolygon(mapNeighborhood, color, neighborhood)
      } else {return null}
    })
  })

  clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#B9B9B9"
    return this.props.neighborhoods.map ( neighborhood => parseInt(mapNeighborhood.id) === neighborhood.id ? this.colorPolygon(mapNeighborhood, color, neighborhood) : null )
    })

  createButtons = () => filters.map( filter => <FilterButton key={ filter.id } filter={ filter} setActiveFilter={ this.props.setActiveFilter }/>)

  shouldComponentUpdate(nextProps) {
    return this.props.activeFilter !== nextProps.activeFilter
  }

  render() {
    const { neighborhoods, activeFilter } = this.props
    return (
      <div id="polygon-container">
        <div id="button-container">
          {this.createButtons()}
        </div>
        { activeFilter.id === 'noFilter' && <ClearPolygons neighborhoods={  neighborhoods } activeFilter={ activeFilter }/> }
        { activeFilter.id !== 'noFilter' && activeFilter.id !== 'custom' && <FilterPolygons neighborhoods={  neighborhoods } activeFilter={ activeFilter }/> }
        <div id="key-container">
          { activeFilter.id !== 'noFilter' && <Key activeFilter={  activeFilter }/> }
        </div>
      </div>
    )
  }
}

// { population.display && this.populationPolygons() }
// { over65.display && this.over65Polygons() }
// { under18.display && this.under18Polygons() }
// { zestimate.display && this.zestimatePolygons() }
// { this.props.customFilterView.display && this.customFilterPolygons() }


// { this.props.customFilterView.display && <CustomFilterKey /> }
