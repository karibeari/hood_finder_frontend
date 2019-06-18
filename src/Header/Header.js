import React from 'react'
import './Header.css'
import LogoutButton from "./LogoutButton";

const Header = (props) => {
  return(
    <header className="App-header">
      <h1 id="title">HOOD HUNTER</h1>
      { props.isLoggedIn ? <LogoutButton logout={ props.logout } /> : null }
    </header>
  )
}

export default Header
