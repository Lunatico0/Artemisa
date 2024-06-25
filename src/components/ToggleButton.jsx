import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const ToggleButton = (props) => {
  const { handleDarkMode } = useContext(CartContext);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "oscuro");

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
    handleDarkMode();
  };

  return (
    <div className='toggle-button'>
      <input type="checkbox" id="toggle" checked={isDarkMode} onChange={handleClick} />
      <div className='display'>
        <label className='label' htmlFor="toggle">
          <div className='circle'>
            {
              isDarkMode === true ? props.img1 : props.img2
            }
          </div>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;