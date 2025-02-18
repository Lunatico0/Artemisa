import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import useScroll from '../hooks/useScroll';
import { IonIcon } from '@ionic/react';
import { moon, sunny, desktopOutline } from 'ionicons/icons';

const ToggleButton = ({ styles }) => {
  useScroll(".darkMode");
  const { handleDarkMode, darkMode, options, viewWidth } = useContext(CartContext);

  return (
    <div className={`darkMode ${styles} ${viewWidth < 1024 ? 'bottom-4 left-1/2 -translate-x-1/2' : 'right-4 -top-2'} absolute flex mx-auto p-1 duration-100 bg-gray-300 rounded-full md:dark:bg-gray-800 dark:bg-gray-700`}>
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
