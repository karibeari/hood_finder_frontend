import React from 'react'
import Polygon from './Polygon'
import neighborhoodCoords from '../neighborhoodCoords'

const ClearPolygons = ({ neighborhoods, activeFilter }) => {

  const clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#B9B9B9"
    return neighborhoods.map ( neighborhood => parseInt(mapNeighborhood.id) === neighborhood.id ? <Polygon mapNeighborhood={mapNeighborhood}
    color={color}
    neighborhood={neighborhood}
   
    key={neighborhood.id}/> : null )
    })

    return(
      <div>
      {clearPolygons()}
      </div>
    )
}

export default ClearPolygons
