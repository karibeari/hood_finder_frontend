import React from 'react';
import './App.css';
import MapboxContainer from "./Map/MapboxContainer";

const neighborhoodsURL = "http://localhost:3000/neighborhoods"
const schoolsURL = "http://localhost:3000/schools"
// const SchoolURLElem = "https://api.schooldigger.com/v1.2/schools?st=CO&q=denver&level=Elementary&perPage=50&appID=3f700f20&appKey=1ec519663d4b1f333a238bf82291eec6"
// const SchoolURLMiddle = "https://api.schooldigger.com/v1.2/schools?st=CO&q=denver&level=Middle&perPage=50&appID=3f700f20&appKey=1ec519663d4b1f333a238bf82291eec6"
// const SchoolURLHigh = "https://api.schooldigger.com/v1.2/schools?st=CO&q=denver&level=High&perPage=50&appID=3f700f20&appKey=1ec519663d4b1f333a238bf82291eec6"

const urls = [neighborhoodsURL, schoolsURL]

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      neighborhoods: [],
      elementary: [],
      middle: [],
      high: []
    }
  }

  componentDidMount() {
    Promise.all(urls.map(url =>
      fetch(url)
        .then(resp => resp.json())
    ))
    .then(data => this.setState({neighborhoods: data[0], schools: data[1]}))
  }
    // fetch(URLbase)
    // .then(resp => resp.json())
    // .then(neighborhoods => this.setState({ neighborhoods }))




  render(){
    return(
      <div className="App">
        <MapboxContainer neighborhoods={this.state.neighborhoods} schools={this.state.schools}/>
      </div >
    )
  }

}

export default App;
