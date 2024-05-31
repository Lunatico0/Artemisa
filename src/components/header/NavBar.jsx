import React from 'react';
import { NavLink } from 'react-router-dom';
import categorias from "../../data/category.json";

const NavBar = () => {
  return (
    <nav className='nav'>
      <ul className='navMenu'>
        <li className='navItem'>
          <NavLink to="/" className={({ isActive }) => isActive ? "active navLink" : "navLink"}>Inicio</NavLink>
        </li>
        {
          categorias.map((categoria) => {
            return (
              <li className='navItem' key={categoria.id}>
                <NavLink to={`/category/${categoria.id}`} className={({ isActive }) => isActive ? "active navLink" : "navLink"}>{categoria.nombre}</NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default NavBar;
