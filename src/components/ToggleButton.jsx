import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import useScroll from '../hooks/useScroll';

const ToggleButton = () => {
  useScroll(".darkMode")
  const { handleDarkMode, darkMode, options } = useContext(CartContext);
  
  return (
    <div className={`darkMode p-1 top-1 right-4 duration-100 
    bg-gray-300 rounded-full dark:bg-gray-800`}>
      {options.map(opt => (
        <button
          key={opt.text}
          aria-label={`swithc ` + opt.text + ` mode`}
          className={`size-6 text-xl m-1 
          ${darkMode === opt.text && "text-sky-600"}`}
          onClick={() => handleDarkMode(opt.text)}
        >
          <ion-icon name={opt.icon}></ion-icon>
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
