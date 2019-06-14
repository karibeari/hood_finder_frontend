import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MapboxContainer from "./Map/MapboxContainer";
import Header from "./Header/Header";
import CustomFiltersContainer from "./CustomFilters/CustomFiltersContainer";
// import Login from "./Login/Login";
// import _ from 'lodash'
// import Swal from 'sweetalert2'

// const authenticateURL = "http://localhost:3000/authenticate"
const neighborhoodsURL = "http://localhost:3000/neighborhoods"
const schoolsURL = "http://localhost:3000/schools"
// const usersURL = "http://localhost:3000/users"

const urls = [neighborhoodsURL, schoolsURL]

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      name: '',
      userId: null,
      customFilters: {
        population: {
          priority: 1,
          range: { min: 1, max: 20000 }
        },
        percent_over_65: {
          priority: 2,
          range: { min: 1, max: 100 }
        },
        percent_under_18: {
          priority: 3,
          range: { min: 1, max: 100 }
        }
      },
      favorites: [],
      neighborhoods: [],
      schools: [],
      customFilterView: {display: false}
    }
  }

  setPriority = (filters) => {
    let customFilters = {}
    filters.map((filter, index) => {
      const newFilter = {[filter.id]: {...this.state.customFilters[filter.id], priority: index+1 }}
      Object.assign(customFilters, newFilter)
    })
    this.setState({ customFilters })
  }

  customNeighborhoods = () => {

    let neighborhoods = this.state.neighborhoods.map((neighborhood, index) => {
      let match_score = 0

      let { range, priority } = this.state.customFilters.population
      let { min, max } = range
      if (neighborhood.POPULATION_2010 > min && neighborhood.POPULATION_2010 < max) {
        match_score = priority * 10
        console.log(neighborhood.NBRHD_NAME, match_score)
      }
      priority = this.state.customFilters.percent_under_18.priority
      min = this.state.customFilters.percent_under_18.range.min
      max = this.state.customFilters.percent_under_18.range.max
      if (neighborhood.PCT_LESS_18 > min && neighborhood.PCT_LESS_18 < max) {
        match_score = match_score += (priority * 10)
        console.log(neighborhood.NBRHD_NAME, match_score)
      }
      priority = this.state.customFilters.percent_over_65.priority
      min = this.state.customFilters.percent_over_65.range.min
      max = this.state.customFilters.percent_over_65.range.max
      if (neighborhood.PCT_OVER_65 > min && neighborhood.PCT_OVER_65 < max) {
        match_score = match_score += (priority * 10)
        console.log(neighborhood.NBRHD_NAME, match_score)
      }
      this.state.neighborhoods[index].match_score = match_score/3
      return neighborhood
    })
    this.setState({ neighborhoods })
  }

  // matchNeighborhoodPercentUnder18 = () => {
  //   const { range, priority } = this.state.customFilters.percent_under_18
  //   const { min, max } = range
  //
  //   let neighborhoods = this.state.neighborhoods.map((neighborhood, index) => {
  //     let match_score = 0
  //     if (neighborhood.PCT_LESS_18 > min && neighborhood.PCT_LESS_18) {
  //       match_score = priority * 10
  //     }
  //     this.state.neighborhoods[index].match_score = match_score
  //     return neighborhood
  //   })
  //   this.setState({ neighborhoods })
  // }
  //
  // matchNeighborhoodPercentOver65 = () => {
  //   const { range, priority } = this.state.customFilters.percent_over65
  //   const { min, max } = range
  //
  //   let neighborhoods = this.state.neighborhoods.map((neighborhood, index) => {
  //     let match_score = 0
  //     if (neighborhood.PCT_OVER_65 > min && neighborhood.PCT_OVER_65) {
  //       match_score = priority * 10
  //     }
  //     this.state.neighborhoods[index].match_score = match_score
  //     return neighborhood
  //   })
  //   this.setState({ neighborhoods })
  // }



  // getData = () => {
  //   Promise.all(urls.map(url =>
  //     fetch(url, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     .then(resp => resp.json())
  //   ))
  //   .then(data => this.setState({neighborhoods: data[0], schools: data[1]}))
  //   .catch(error => console.log(error.message))
  // }

  componentDidMount() {
    Promise.all(urls.map(url =>
      fetch(url)
      .then(resp => resp.json())
    ))
    .then(data => this.setState({neighborhoods: data[0], schools: data[1]}))
  }

  setCustomFilters = (name, filters) => {
    this.setState({ customFilters: { ...this.state.customFilters, [name]: filters } })
  }

  showCustomFilterView = () => {this.setState({ customFilterView:
    {display: true}
  })}

  render(){
    return(
      <div className="App">
        <Header logout={ this.logout } />
        <MapboxContainer neighborhoods={ this.state.neighborhoods} schools={ this.state.schools } customFilterView={ this.state.customFilterView } />
        <CustomFiltersContainer setCustomFilters={ this.setCustomFilters } customFilters={ this.state.customFilters } showCustomFilterView={ this.showCustomFilterView } customNeighborhoods={ this.customNeighborhoods } setPriority={ this.setPriority }/>
      </div >
    )
  }

}


//
//   handleLogin = (login) => {
//     fetch(authenticateURL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(login)
//     })
//     .then(resp => resp.json())
//     .then(({ auth_token, user}) => auth_token ? this.loginSuccess(auth_token, user.first_name) : this.loginError())
//     .catch(error => console.log(error.message))
//   }
//
//   createNewUser = (user) => {
//     fetch(usersURL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(user)
//     })
//     .then(resp => resp.json())
//     .then(this.newUserSuccess(user.first_name))
//   }
//
//   newUserSuccess = (name) => {
//     Swal.fire({
//       type: 'success',
//       title: `Welcome ${name}!`
//     })
//   }
//
//   loginSuccess = (token, name) => {
//     localStorage.setItem("token", token)
//     this.setState({
//       isLoggedIn: true,
//       name: name
//     })
//     Swal.fire({
//       type: 'success',
//       title: `Welcome ${name}!`
//     })
//   }
//
//   loginError = () => Swal.fire({
//     type: 'error',
//     title: 'Oops...',
//     text: "There's something wrong with your username or password.  Please try again.",
//   })
//
//   logout = () => {
//     localStorage.removeItem('token')
//     this.setState({
//       isLoggedIn: false,
//       neighborhoods: [],
//       schools: []
//     })}
//
//   componentDidUpdate() {
//     if (this.state.isLoggedIn && _.isEmpty(this.state.neighborhoods)) {
//       this.getData()
//     }
//   }
//

//
//   render(){
//     return(
//       <div className="App">
//         <Router>
//           {this.state.isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/login' /> }
//           <React.Fragment>
//             <Route path='/' render={() => <Header logout={ this.logout } /> } />
//             <Route path='/login' render={() => <Login handleLogin={ this.handleLogin } createNewUser={ this.createNewUser }/> } />
//             <Route path='/main' render={() => <MapboxContainer neighborhoods={ this.state.neighborhoods} schools={ this.state.schools } /> } />
//             <Route path='/main' render={() => <CustomFiltersContainer setCustomFilters={ this.setCustomFilters } /> } />
//           </React.Fragment>
//         </Router>
//       </div >
//     )
//   }
// }




export default App;
