import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MapboxContainer from "./Map/MapboxContainer";
import Header from "./Header/Header";
import CustomFilters from "./CustomFilters/CustomFiltersContainer";
import Login from "./Login/Login";
import _ from 'lodash'
import Swal from 'sweetalert2'

const authenticateURL = "http://localhost:3000/authenticate"
const neighborhoodsURL = "http://localhost:3000/neighborhoods"
const schoolsURL = "http://localhost:3000/schools"
const usersURL = "http://localhost:3000/users"

const urls = [neighborhoodsURL, schoolsURL]

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      neighborhoods: [],
      schools: []
    }
  }

  getData = () => {
    Promise.all(urls.map(url =>
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(resp => resp.json())
    ))
    .then(data => this.setState({neighborhoods: data[0], schools: data[1]}))
    .catch(error => console.log(error.message))
  }

  handleLogin = (login) => {
    fetch(authenticateURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(resp => resp.json())
    .then(({ auth_token }) => auth_token ? this.loginSuccess(auth_token) : this.loginError())
    .catch(error => console.log(error.message))
  }

  createNewUser = (user) => {
    fetch(usersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(this.newUserSuccess(user.first_name))
  }

  newUserSuccess = (name) => {
    Swal.fire({
      type: 'success',
      title: `Welcome ${name}!`
    })
  }

  loginSuccess = token => {
    localStorage.setItem("token", token)
    this.setState({isLoggedIn: true})
    Swal.fire({
      type: 'success',
      title: 'Welcome!'
    })
  }

  loginError = () => Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: "There's something wrong with your username or password.  Please try again.",
  })

  logout = () => {
    localStorage.removeItem('token')
    this.setState({
      isLoggedIn: false,
      neighborhoods: [],
      schools: []
    })}

  componentDidUpdate() {
    if (this.state.isLoggedIn && _.isEmpty(this.state.neighborhoods)) {
      this.getData()
    }
  }

  render(){
    return(
      <div className="App">
        <Router>
          {this.state.isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/login' />}
          <React.Fragment>
            <Route path='/' render={() => <Header logout={this.logout} />} />
            <Route path='/login' render={() => <Login handleLogin={this.handleLogin} createNewUser={this.createNewUser}/>} />
            <Route path='/main' render={() => <MapboxContainer neighborhoods={this.state.neighborhoods} schools={this.state.schools} />} />
            <Route path='/main' component={CustomFilters} />
          </React.Fragment>
        </Router>
      </div >
    )
  }
}

export default App;
