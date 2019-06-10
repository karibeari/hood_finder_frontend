import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ScaleControl, ZoomControl } from 'react-mapbox-gl';
import MapMarker from './MapMarker';
import neighborhoodCoords from './neighborhoodCoords'
import NeighborhoodInfo from './NeighborhoodInfo'
import Polygon from './Polygon'

const Map = ReactMapboxGl({
  accessToken: ""
});

export default class MapboxContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      buttons: {
        noFilter: {display: true},
        population: {display: false},
        over65: {display: false},
        under18: {display: false}
      },
      neighborhood: null
  }
}

  // displaySchools = () => {
  //   const schools = this.props.schools || []
  //   return schools.map(school => {
  //     return <MapMarker school={school} key={school.id}/>
  //   })
  // }

  showInfo = (neighborhood) => {this.setState({ neighborhood })}
  hideInfo = () => {this.setState({ neighborhood: null })}

  onToggleHover = (cursor: string, { map }: { map: any }) => {map.getCanvas().style.cursor = cursor}

  // colorPolygon = (mapNeighborhood, color, neighborhood) => {
  //   return <Layer key={neighborhood.id}
  //                 type="fill"
  //                 paint={{
  //                   'fill-color': `${color}`,
  //                   'fill-opacity': 0.7,
  //                   'fill-outline-color': "#000"
  //                 }}
  //         >
  //             <Feature
  //               coordinates={ [mapNeighborhood.coordinates] }
  //               onClick={ () => this.showInfo(neighborhood)}
  //               onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
  //               onMouseLeave={this.onToggleHover.bind(this, '')}/>
  //         </Layer>
  //
  //       }

  colorPolygon = (mapNeighborhood, color, neighborhood) =>  <Polygon mapNeighborhood={mapNeighborhood} color={color} neighborhood={neighborhood} showInfo={this.showInfo} key={neighborhood.id}/>

  populationPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.POPULATION_2010 <= 5000):
            color = "#edf8fb"
            break;
          case (neighborhood.POPULATION_2010 <= 10000):
            color = "#b3cde3"
            break;
          case (neighborhood.POPULATION_2010 <= 15000):
            color = "#8c96c6"
            break;
          case (neighborhood.POPULATION_2010 > 15000):
            color = "#88419d"
            break;
          default:
            color = "#FFF"
            break;
        }
        this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
    // return this.colorPolygon(mapNeighborhood, color)
  })

  over65Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_65_PLUS <= 10):
            color = "#b2e2e2"
            break;
          case (neighborhood.PCT_65_PLUS <= 20):
            color = "#66c2a4"
            break;
          case (neighborhood.PCT_65_PLUS > 20):
            color = "#238b45"
            break;
          default:
            color = "#FFF"
            break;
        }
        this.colorPolygon(mapNeighborhood, color, neighborhood)
      }
    })
  })

  under18Polygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = ""
    return this.props.neighborhoods.map ( neighborhood => {
      if (parseInt(mapNeighborhood.id) === neighborhood.id) {
        switch (true) {
          case (neighborhood.PCT_LESS_18 <= 10):
            color = "#f0f9e8"
            break;
          case (neighborhood.PCT_LESS_18 <= 20):
            color = "#bae4bc"
            break;
          case (neighborhood.PCT_LESS_18 <= 30):
            color = "#7bccc4"
            break;
          case (neighborhood.PCT_LESS_18 > 30):
            color = "#2b8cbe"
            break;
          default:
            color = "#FFF"
            break;
        }
        // console.log(mapNeighborhood, color, neighborhood)
        this.colorPolygon(mapNeighborhood, color, neighborhood)
      }


    })

  })

  clearPolygons = () => neighborhoodCoords.map( mapNeighborhood => {
    let color = "#000"
    return this.props.neighborhoods.map ( neighborhood => parseInt(mapNeighborhood.id) === neighborhood.id ? this.colorPolygon(mapNeighborhood, color, neighborhood) : null )
    })

  // toggleFilter = (event) => {
  //   const buttons = {
  //     population: {display: false},
  //     over65: {display: false},
  //     under18: {display: false}
  //   }
  //   buttons[event.target.id].display = true
  //   this.setState({ buttons })
  // }

  render() {
    const {buttons, neighborhood } = this.state
    return (
      <div>
        <button id="noFilter" onClick={this.toggleFilter}>Display Neighborhoods</button>
        <button id="population" onClick={this.toggleFilter}>Population</button>
        <button id="over65" onClick={this.toggleFilter}>Over65</button>
        <button id="under18" onClick={this.toggleFilter}>Under18</button>
        <Map
          style={"mapbox://styles/mapbox/streets-v8"}
          zoom={[11]}
          center={[-104.99, 39.74]}
          >
          <ScaleControl />
          <ZoomControl />
          {console.log(this.state === initialState)}
          {console.log(this.state )}
          {console.log(initialState)}
          { buttons.noFilter.display && this.clearPolygons() }
          { buttons.population.display && this.populationPolygons() }
          { buttons.over65.display && this.over65Polygons() }
          { buttons.under18.display && this.under18Polygons() }
          { neighborhood !== null && <NeighborhoodInfo neighborhood={this.state.neighborhood} hideAlert={this.hideInfo}/> }
        </Map>
      </div>

    );
  }
}
