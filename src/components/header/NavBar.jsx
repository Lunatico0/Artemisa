import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ToggleButton from '../ToggleButton.jsx';
import { ApiContext } from '../../context/apiContext.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import { handleCategoryClick, handleSubcategoryClick, handleSubsubcategoryClick } from '../utils/utilFunctions.jsx';

const NavBar = () => {
  const { categories = [], applyFilters } = useContext(ApiContext);
  const { menuVisible, viewWidth, setBreadcrumb, closeMenu } = useContext(CartContext);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const navigate = useNavigate();

  const toggleCategory = (categoriaId) => {
    setOpenCategory((prev) => (prev === categoriaId ? null : categoriaId));
    setOpenSubcategory(null);
  };

  const toggleSubcategory = (subcategoriaId) => {
    setOpenSubcategory((prev) => (prev === subcategoriaId ? null : subcategoriaId));
  };

  return (
    <>
      <nav
        className={`
          ${(viewWidth < 1024 ? (!menuVisible && 'hidden') : 'flex')}
          ${(viewWidth < 1024 && "absolute")} flex
          flex-col min-w-full text-nowrap bg-backgroundLight dark:bg-backgroundDark
        `}
      >
        {viewWidth < 1024 && (<div className='flex w-full justify-between'><ToggleButton /></div>)}
        <ul
          className="flex flex-col ml-0 pl-0
          lg:pb-0 lg:pr-0 lg:w-fit pt-4 lg:flex-row lg:h-16 lg:gap-12 lg:text-lg xl:mx-auto
          w-full h-full gap-6 font-medium uppercase pr-4 pb-12"
        >
          {categories.length === 0 ? (
            <p>No hay categorías disponibles</p>
          ) : (
            categories.map((categoria) => (
              <li className="relative w-full lg:w-auto group ml-0 pl-0" key={categoria.categoriaId}>
                <div className="flex items-center justify-between lg:block">
                  <NavLink
                    to={`/category/${categoria.categoriaId}`}
                    onClick={() => handleCategoryClick(categoria, applyFilters, setBreadcrumb, navigate, closeMenu)}
                    className={({ isActive }) =>
                      `block text-textDark dark:text-textLight no-underline transition px-2 duration-100 w-full ${isActive && 'font-bold'}`
                    }
                  >
                    {categoria.categoriaNombre}
                  </NavLink>
                  {/* 🔽 Flecha para desplegar en mobile */}
                  {categoria.subcategorias.length > 0 && (
                    <button
                      onClick={() => toggleCategory(categoria.categoriaId)}
                      className="lg:hidden text-textDark dark:text-textLight"
                    >
                      <ion-icon name={openCategory === categoria.categoriaId ? "caret-down-outline" : "caret-up-outline"}></ion-icon>
                    </button>
                  )}
                </div>

                {/* 🔽 Subcategorías */}
                <ul
                  className={`lg:absolute lg:left-0 lg:top-full lg:hidden lg:group-hover:flex lg:flex-col bg-principal w-full lg:w-auto shadow-lg rounded transition-all pl-2
                    ${openCategory === categoria.categoriaId ? "block" : "hidden"}`} // 📌 Estado en mobile, hover en desktop
                >
                  {categoria.subcategorias.map((subcategoria) => (
                    <li className="relative w-full lg:w-auto group/sub" key={subcategoria.subcategoriaId}>
                      <div className="flex items-center justify-between lg:block">
                        <NavLink
                          to={`/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}`}
                          onClick={() => handleSubcategoryClick(categoria, subcategoria, applyFilters, setBreadcrumb, navigate, closeMenu)}
                          className="block px-6 py-2 no-underline text-textDark dark:text-textLight rounded hover:bg-secondary/70 w-full"
                        >
                          {subcategoria.subcategoriaNombre}
                        </NavLink>
                        {/* 🔽 Flecha para desplegar en mobile */}
                        {subcategoria.subsubcategorias && subcategoria.subsubcategorias.length > 0 && (
                          <button
                            onClick={() => toggleSubcategory(subcategoria.subcategoriaId)}
                            className="lg:hidden text-textDark dark:text-textLight"
                          >
                            <ion-icon name={openSubcategory === subcategoria.subcategoriaId ? "caret-down-outline" : "caret-up-outline"}></ion-icon>
                          </button>
                        )}
                      </div>

                      {/* 🔽 Subsubcategorías */}
                      <ul
                        className={`lg:absolute lg:left-full lg:top-0 lg:hidden lg:group-hover/sub:flex lg:flex-col lg:w-auto
                        bg-secondary w-full shadow-lg rounded transition-all lg:-ml-4 pl-2
                        ${openSubcategory === subcategoria.subcategoriaId ? "block" : "hidden"}`
                        }
                      >
                        {subcategoria.subsubcategorias &&
                          subcategoria.subsubcategorias.map((subsubcategoria) => (
                            <li key={subsubcategoria.subsubcategoriaId} className="w-full lg:w-auto">
                              <NavLink
                                to={`/category/${categoria.categoriaId}/subcategory/${subcategoria.subcategoriaId}/subsubcategory/${subsubcategoria.subsubcategoriaId}`}
                                onClick={() =>
                                  handleSubsubcategoryClick(categoria, subcategoria, subsubcategoria, applyFilters, setBreadcrumb, navigate, closeMenu)
                                }
                                className="block px-8 py-2 no-underline text-textDark dark:text-textLight rounded hover:bg-secondary/70 w-full"
                              >
                                {subsubcategoria.subsubcategoriaNombre}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
