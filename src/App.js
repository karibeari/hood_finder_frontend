import React from 'react';
import './App.css';
import MapboxContainer from "./Map/MapboxContainer";

const URLbase = "http://localhost:3000/neighborhoods"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      neighborhoods: []
    }
  }

  componentDidMount() {
    fetch(URLbase)
    .then(resp => resp.json())
    .then(neighborhoods => this.setState({ neighborhoods }))
  }

  render(){
    return(
      <div className="App">
        <MapboxContainer neighborhoods={this.state.neighborhoods}/>
      </div >
    )
  }

}

export default App;
