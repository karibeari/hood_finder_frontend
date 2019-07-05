import React from 'react'
import Polygon from './Polygon'
import neighborhoodCoords from '../neighborhoodCoords'

const FilterPolygons = ({ neighborhoods, activeFilter }) => {


//fix case statements to be more dynamic for all limits for each filter
  const filterPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    const { colors, limits, dataName } = activeFilter
    let color = ""
    return neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood[dataName] <= limits[0]):
            color = colors[0]
            break;
          case (neighborhood[dataName] <= limits[1]):
            color = colors[1]
            break;
          case (neighborhood[dataName] <= limits[2]):
            color = colors[2]
            break;
          case (neighborhood[dataName] > limits[2]):
            color = colors[3]
            break;
          default:
            color = "#FFF"
            break;
        }
        return <Polygon mapNeighborhood={mapNeighborhood} color={color} neighborhood={neighborhood}  key={neighborhood.id}/>
      } else {return null}
    })
  })

    return(
      <div>
      { filterPolygons() }
      </div>
    )
}

export default FilterPolygons
