import React from 'react'
import './Header.css'
import LogoutButton from "./LogoutButton";

const Header = (props) => {
  return(
    <header className="App-header">
      <h1 id="title">Title</h1>
      <LogoutButton logout={props.logout} />
    </header>
  )
}

export default Header
