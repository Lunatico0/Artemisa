import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import categorias from "../../data/category.json"

const NavBar = () => {
  return (
    <nav className='nav'>
      <ul className='navMenu'>
        <li className='navItem'>
          <NavLink to="/" activeClassName="active" className='navLink' >Inicio</NavLink>
        </li>
        {
          categorias.map((categoria) => {
            return (
              <li className='navItem' key={categoria.id}>
                <NavLink to={`/category/${categoria.id}`} activeClassName="active" className='navLink' >{categoria.nombre}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default NavBar
