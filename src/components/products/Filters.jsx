import { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../context/apiContext.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { generateBreadcrumb, getCategoryNames } from "../utils/utilFunctions.jsx";

const Filters = ({ setFilteredProducts, breadcrumb = [] }) => {
  const { products, applyFilters } = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "defa";
  const { categoryId, subcategoryId, subsubcategoryId } = useParams();
  const { categories } = useContext(ApiContext);

  const { categoryName, subcategoryName, subsubcategoryName } = getCategoryNames(categoryId, subcategoryId, subsubcategoryId, categories);

  const breadcrumbData = {
    category: {
      categoriaId: categoryId,
      categoriaNombre: categoryId ? categoryName : null,
      subcategoria: subcategoryId
        ? {
          subcategoriaId: subcategoryId,
          subcategoriaNombre: subcategoryId ? subcategoryName : null,
          subsubcategoria: subsubcategoryId
            ? {
              subsubcategoriaId: subsubcategoryId,
              subsubcategoriaNombre: subsubcategoryId ? subsubcategoryName : null,
            }
            : null,
        }
        : null,
    },
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(currentSort);
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros en mobile

  useEffect(() => {
    setSortOption(currentSort);
  }, [currentSort]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.some((desc) =>
        desc.value.toLowerCase().includes(query.toLowerCase())
      ))
    );
    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);
    setSearchParams({ sort: selectedSort });
    applyFilters({ sort: selectedSort });
  };

  return (
    <>
      {/* Botón para mostrar filtros en mobile */}
      <button
        aria-expanded={showFilters}
        className={`md:hidden bg-backgroundLight/50 dark:bg-backgroundDark/80 backdrop-blur-md text-textDark dark:text-textLight left-0 px-4 py-2 rounded w-fit mt-2 ${!showFilters && 'mb-2'}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar Filtros ▲" : "Mostrar Filtros ▼"}
      </button>

      <aside
        className={`bg-backgroundLight/50 dark:bg-backgroundDark/70 backdrop-blur-lg text-textDark dark:text-textLight p-2 rounded-lg shadow-md transition-all duration-300
        ${showFilters ? "block" : "hidden"} md:flex md:flex-row md:items-center md:justify-between md:h-16 w-full mb-2 md:mt-2
        `}
      >
        {/* Barra de Búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={`w-full md:w-1/4 rounded border h-10 border-gray-500 dark:border-gray-600 px-2
          focus:outline-none focus:ring-2 focus:ring-gray-400 ${showFilters && 'mb-2'}`}
        />

        {/* Breadcrumb */}
        {
          breadcrumb == null && <h2
            className="m-0 p-0 text-lg text-nowrap rounded px-3 py-1 bg-backgroundDark/30 dark:bg-backgroundLight/20 text-textDark dark:text-textLight text-center md:block hidden"
          >Todos los productos</h2>
        }
        {breadcrumb?.length > 0 && (
          <nav className="m-0 p-0 text-lg text-nowrap rounded px-3 py-1 bg-backgroundDark/30 dark:bg-backgroundLight/20 text-textDark dark:text-textLight text-center md:block hidden">
            {generateBreadcrumb(breadcrumb)}
          </nav>
        )}

        {/* Filtros de Ordenamiento */}
        <div className="flex gap-2 items-center">
          <label className="text-sm md:text-base text-nowrap text-gray-700 dark:text-gray-300">Ordenar por:</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-fit h-10 rounded border border-gray-500 dark:border-gray-600 px-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-textDark"
          >
            <option value="defa">Más recientes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="alpha_asc">A-Z</option>
            <option value="alpha_desc">Z-A</option>
          </select>
        </div>
      </aside>
    </>
  );
};

export default Filters;
