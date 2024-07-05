import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import useScroll from '../hooks/useScroll';
import { IonIcon } from '@ionic/react';
import { moon, sunny, desktopOutline } from 'ionicons/icons';

const ToggleButton = () => {
  useScroll(".darkMode");
  const { handleDarkMode, darkMode, options } = useContext(CartContext);
  
  return (
    <div className={`darkMode p-1 top-1 right-4 duration-100 bg-gray-300 rounded-full dark:bg-gray-800`}>
      {options.map(opt => (
        <button
          key={opt.text}
          aria-label={`switch ` + opt.text + ` mode`}
          className={`size-6 text-xl m-1 ${darkMode === opt.text && "text-sky-600"}`}
          onClick={() => handleDarkMode(opt.text)}
        >
          <IonIcon icon={opt.icon === 'moon' ? moon : opt.icon === 'sunny' ? sunny : desktopOutline} />
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
