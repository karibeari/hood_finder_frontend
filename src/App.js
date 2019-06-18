import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MapboxContainer from "./Map/MapboxContainer";
import Header from "./Header/Header";
import CustomFiltersContainer from "./CustomFilters/CustomFiltersContainer";
// import Login from "./Login/Login";
import _ from 'lodash'
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
          ranges: []
        },
        percent_over_65: {
          priority: 2,
          ranges: []
        },
        percent_under_18: {
          priority: 3,
          ranges: []
        },
        median_home_value: {
          priority: 4,
          ranges: []
        }
      },
      favorites: [],
      neighborhoods: [],
      schools: [],
      customFilterView: {display: false},
      customFilterMenuView: {display: false}
    }
  }

  potentialScore = num => {
    let result = 0
    while (num > 0) {
      result = result + num
      num -=1
    }
    return result
  }

  setPriority = (filters) => {
    let customFilters = {}
    filters.map((filter, index) => {
      const newFilter = {[filter.id]: {...this.state.customFilters[filter.id], priority: index + 1 }}
      Object.assign(customFilters, newFilter)
    })
    this.setState({ customFilters })
  }

  getNeighborhoodMatches = () => {
    let num_of_filters = _.keys(this.state.customFilters).length
    let potential_score = this.potentialScore(num_of_filters)
    let neighborhoods = this.state.neighborhoods.map((neighborhood, index) => {
      let match_score = 0

      let { ranges, priority } = this.state.customFilters.population
      ranges.map(range => {
        let { min, max } = range
        if (neighborhood.POPULATION_2010 >= min && neighborhood.POPULATION_2010 <= max) {
          match_score = num_of_filters + 1 - priority
        }
      })

      priority = this.state.customFilters.percent_under_18.priority
      ranges = this.state.customFilters.percent_under_18.ranges
      ranges.map(range => {
        let { min, max } = range
        if (Math.round(neighborhood.PCT_LESS_18) >= min && Math.round(neighborhood.PCT_LESS_18) <= max) {
          match_score += num_of_filters + 1 - priority
        }
      })

      priority = this.state.customFilters.percent_over_65.priority
      ranges = this.state.customFilters.percent_over_65.ranges
      ranges.map(range => {
        let { min, max } = range
        if (Math.round(neighborhood.PCT_65_PLUS) >= min && Math.round(neighborhood.PCT_65_PLUS) <= max) {
          match_score += num_of_filters + 1 - priority
        }
      })

      priority = this.state.customFilters.median_home_value.priority
      ranges = this.state.customFilters.median_home_value.ranges
      ranges.map(range => {
        let { min, max } = range
        if (neighborhood.zestimate >= min && neighborhood.zestimate <= max) {
          match_score += num_of_filters + 1 - priority
        }
      })

      match_score = match_score/potential_score * 100
      neighborhood.match_score = match_score
      return neighborhood
    })
    this.setState({ neighborhoods })
  }


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

//sets state with user adjusted filters
  setCustomFilters = (name, range) => {
    const ranges = [...this.state.customFilters[name].ranges, range]
    const filters = { ...this.state.customFilters[name], ranges: ranges }
    const customFilters = { ...this.state.customFilters, [name]: filters }
    this.setState({ customFilters })
  }

  showCustomFilterView = () => { this.setState({ customFilterView:
    {display: true}
  })}

  toggleCustomFilterMenu = () => { this.setState({ customFilterMenuView:
    {display: !this.state.customFilterMenuView.display }
  })}


  render(){
    return(
      <div className="App">
        <Header logout={ this.logout } isLoggedIn={ this.state.isLoggedIn }/>
        <MapboxContainer
          neighborhoods={ this.state.neighborhoods}
          schools={ this.state.schools }
          customFilterView={ this.state.customFilterView }
          toggleCustomFilterMenu={ this.toggleCustomFilterMenu }
          customFilterMenuView={ this.state.customFilterMenuView.display }/>
        {this.state.customFilterMenuView.display ? <CustomFiltersContainer
          setCustomFilters={ this.setCustomFilters }
          customFilters={ this.state.customFilters }
          showCustomFilterView={ this.showCustomFilterView }
          getNeighborhoodMatches={ this.getNeighborhoodMatches }
          setPriority={ this.setPriority }/> : null
        }

      </div >
    )
  }
  // <CustomFiltersContainer
  //   setCustomFilters={ this.setCustomFilters }
  //   customFilters={ this.state.customFilters }
  //   showCustomFilterView={ this.showCustomFilterView }
  //   getNeighborhoodMatches={ this.getNeighborhoodMatches }
  //   setPriority={ this.setPriority }/>


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
