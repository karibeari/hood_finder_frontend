import React, { Component } from "react";
import { Layer, Feature} from 'react-mapbox-gl';
import Swal from 'sweetalert2'

export default class Polygon extends Component {

  onToggleHover = (cursor: string, { map }: { map: any }) => {map.getCanvas().style.cursor = cursor}

  render() {
    let { mapNeighborhood, color, neighborhood } = this.props

    return (
        <Layer key={neighborhood.id}
              type="fill"
              paint={{
                'fill-color': `${color}`,
                'fill-opacity': 0.8,
                'fill-outline-color': "#FFF"
              }}
              className="polygon"
        >
            <Feature
              coordinates={ [mapNeighborhood.coordinates] }
              onClick={ () => Swal.fire({
                title: neighborhood.NBRHD_NAME,
                html: `<p>Population: ${neighborhood.POPULATION_2010}</p>
                <p>Over Age 65: ${neighborhood.PCT_65_PLUS}%</p>
                <p>Under Age 18: ${neighborhood.PCT_LESS_18}%</p>
                <p>American Indian: ${neighborhood.PCT_AMERIND}%</p>
                <p>Asian: ${neighborhood.PCT_ASIAN}%</p>
                <p>Black: ${neighborhood.PCT_BLACK}%</p>
                <p>Pacific Islander: ${neighborhood.PCT_HAW_PACIS}%</p>
                <p>Hispanic: ${neighborhood.PCT_HISPANIC}%</p>
                <p>White: ${neighborhood.PCT_WHITE}%</p>
                <p>Other: ${neighborhood.PCT_OTHER_RACE}%</p>
                <p>Two or More Races: ${neighborhood.PCT_TWO_OR_MORE_RACES}%</p>
                `
              })}
              onMouseEnter={ () => {
                color = "#FFF"
                console.log(color)
              }}
            />
        </Layer>
    )
  }
}
//

// Make Pie Charts

// FAMILIES: 1194
// FEMALE: 3101
// HOUSING_UNITS: 4163
// HU_OWNED: 1673
// HU_RENTED: 1869
// MALE: 2488
// average_age: null
// median_income: null
// school_score: null
// zestimate: null
