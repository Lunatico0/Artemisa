import { useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import CartWidget from './CartWidget.jsx';
import ToggleButton from '../ToggleButton.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import { ApiContext } from '../../context/apiContext.jsx';

const Header = () => {
  const { viewWidth, menuVisible, setMenuVisible, setBreadcrumb } = useContext(CartContext);
  const { applyFilters, closeMenu } = useContext(ApiContext);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuVisible && navRef.current && !navRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuVisible]);

  return (
    <header ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md flex flex-col lg:items-center pt-2 bg-transparent"
    >
      <div className="flex justify-between flex-row-reverse items-center py-2 px-6 lg:px-12">
        <CartWidget closeMenu={closeMenu} />

        <NavLink
          to="/"
          className={`text-textoLogo no-underline text-4xl md:text-5xl font-serif tracking-widest`}
          onClick={() => {
            applyFilters({
              category: null,
              subcategory: null,
              subsubcategory: null,
              sort: null,
              limit: 360,
              page: 1,
            });
            setBreadcrumb(null);
          }}
        >
          ARTEMISA
        </NavLink>

        {viewWidth < 1024 && (
          <button className={`text-textDark dark:text-textLight text-2xl`} onClick={toggleMenu}>
            {menuVisible ? '\u2715' : '☰'}
          </button>
        )}
        {viewWidth > 1024 && <ToggleButton styles={'mt-4'} />}
      </div>
      <div className='w-full flex' ref={navRef}>
        <NavBar />
        {viewWidth > 1024 && <CartWidget closeMenu={closeMenu} />}
      </div>
    </header>
  );
};

export default Header;
