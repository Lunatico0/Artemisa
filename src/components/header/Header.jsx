import React from 'react';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import useScroll from '../../hooks/useScroll.js';

const Header = () => {
  useScroll(".header");
  return (
    <header className="header">
      <NavLink to="/" className='brand'><h1 className='logo'>ARTEMISA</h1></NavLink>
      <div className='headerCont'>
        <NavBar />
        <CartWidget />
      </div>
    </header>
  );
};

export default Header;
