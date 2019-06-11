import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MapboxContainer from "./Map/MapboxContainer";
import Header from "./Header/Header";
import CustomFilters from "./CustomFilters/CustomFiltersContainer";
import Login from "./Login";
import Home from "./Home";

const authenticateURL = "http://localhost:3000/authenticate"
const neighborhoodsURL = "http://localhost:3000/neighborhoods"
const schoolsURL = "http://localhost:3000/schools"


const urls = [neighborhoodsURL, schoolsURL]

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      neighborhoods: [],
      elementary: [],
      middle: [],
      high: []
    }
  }

  componentDidMount() {
    Promise.all(urls.map(url =>
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(resp => resp.json())
    ))
    .then(data => this.setState({neighborhoods: data[0], schools: data[1]}))
  }



  handleLogin = (username, password) => {
    fetch(authenticateURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(resp => resp.json())
    .then(({auth_token}) => localStorage.setItem("token", auth_token))
    .catch(console.log)
  }

  render(){
    return(
      <div className="App">
        <Router>
          <React.Fragment>
            <Route path='/' component={Header} />
            <Route path='/login' component={Home} />
            <Route path='/main' render={() => <MapboxContainer neighborhoods={this.state.neighborhoods} schools={this.state.schools} />} />
            <Route path='/main' component={CustomFilters} />
          </React.Fragment>
        </Router>
      </div >
    )
  }
}

export default App;
