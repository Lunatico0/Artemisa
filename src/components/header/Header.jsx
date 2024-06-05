import React from 'react'
import NavBar from './NavBar'
import { NavLink } from 'react-router-dom'
import CartWidget from './CartWidget'

const Header = (props) => {

  return (
    <header className="header">
      <div className='headerCont'>
        <NavBar />
        <NavLink to="/" className='brand' ><h1 className='logo'>ARTEMISA</h1></NavLink>
        <CartWidget cantidad="3" darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
      </div>
    </header>
  )
}

export default Header
