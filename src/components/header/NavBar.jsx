import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const NavBar = () => {

  let [categorias, setCategorias] = useState([])

  useEffect(() => {
    const categoriasRef = collection(db, "categoria")
    getDocs(categoriasRef)
      .then(res => {
        setCategorias(res.docs.map((doc) => { return { ...doc.data() } }));
      });
  }, [])

  return (
    <nav className='nav'>
      <ul className='navMenu'>
        <li className='navItem'>
          <NavLink to="/" className={({ isActive }) => isActive ? "active navLink" : "navLink"}>Inicio</NavLink>
        </li>
        {
          categorias.map((categoria) => {
            return (
              <li className='navItem' key={categoria.categoriaId}>
                <NavLink to={`/category/${categoria.categoriaId}`} className={({ isActive }) => isActive ? "active navLink" : "navLink"}>
                  {categoria.categoriaNombre}
                </NavLink>
                {
                  categoria.subcategorias && categoria.subcategorias.length > 0 && (
                    <ul className='subMenu'>{
                      categoria.subcategorias.map((subcategoria) => (
                        <li className='subNavItem' key={subcategoria.subcategoriaId}>
                          <NavLink to={`/category/${subcategoria.subcategoriaId}`} className={({ isActive }) => isActive ? "active subNavLink" : "subNavLink"}>
                            {subcategoria.subcategoriaNombre}
                          </NavLink>
                        </li>))}
                    </ul>)
                }
              </li>);
          })
        }
      </ul>
    </nav>
  );
}

export default NavBar;
