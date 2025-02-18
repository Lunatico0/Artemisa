import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/apiContext.jsx";
import Item from "../products/Item.jsx";
import Carrusel from "../Carrusel.jsx";
import imagenes from "../../data/carruselImagenes.json";
import { CartContext } from "../../context/CartContext.jsx";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../utils/Loader.jsx";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";

const ItemListContainer = () => {
  const { categoryId, subcategoryId, subsubcategoryId } = useParams();
  const { products, loading, applyFilters, error } = useContext(ApiContext);
  const { breadcrumb, viewWidth } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const mobileImages = []

  for (let index = 0; index < imagenes.length; index++) {
    if (((index !== 1) & (index !== 2) & (index !== 3) & (index !== 4))) {
      mobileImages.push(imagenes[index])
    }
  }

  useEffect(() => {
    applyFilters({
      category: categoryId || null,
      subcategory: subcategoryId || null,
      subsubcategory: subsubcategoryId || null
    });
  }, [categoryId, subcategoryId, subsubcategoryId]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      {loading ? (
        <Loader styles={"fixed lg:top-32 top-16 left-0 right-0 z-50 min-h-screen min-w-screen backdrop-blur-md mx-auto my-auto flex justify-center items-center"} />
      ) : error ? (
        <p className="text-2xl p-2 mx-2 bg-backgroundLight/70 dark:bg-backgroundDark/80 rounded w-fit text-textDark dark:text-textLight">Error: {error}</p>
      ) : (
        <main className="xl:w-3/4 mx-auto px-2 md:px-0 mt-20 lg:mt-40">
          <Carrusel
            className=""
            imgClassName={`md:object-contain ${viewWidth <= 1024 ? 'top-0' : "-top-28"}`}
            containerStyle={'h-auto md:min-h-96 min-h-48 flex item-center justify-center'}
            imagenes={viewWidth <= 1280 ? mobileImages : imagenes}
            autoPlay={true}
            showIndicators={false}
          />

          <Filters setFilteredProducts={setFilteredProducts} breadcrumb={breadcrumb} />

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto'>
            {
              filteredProducts.map((producto) => (
                <Item key={producto._id} producto={producto} />
              ))
            }
          </div>
          <Pagination />
        </main>
      )}
    </>
  );
};

export default ItemListContainer;
