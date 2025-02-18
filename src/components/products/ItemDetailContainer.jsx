import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import Carrusel from '../Carrusel.jsx';
import { toast } from 'react-toastify';
import { ApiContext } from '../../context/apiContext.jsx';
import { generateBreadcrumb } from '../utils/utilFunctions.jsx';
import Loader from '../utils/Loader.jsx';

const ItemDetailContainer = () => {
  const { agregarAlCarrito, handleChangeCantidad, cantidad, setCantidad, breadcrumb, setBreadcrumb, viewWidth } = useContext(CartContext)
  const { fetchProductById, loading } = useContext(ApiContext);
  const [producto, setProducto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetchProductById(id);
      if (product) {
        setProducto(product);

        // 🔥 Create a breadcrumb dynamically based on the product category
        if (product.category) {
          const { categoriaNombre, categoriaId, subcategoria, subsubcategoria } = product.category;

          const breadcrumbTrail = [
            { name: categoriaNombre, path: `/category/${categoriaId}` }
          ];

          if (subcategoria) {
            breadcrumbTrail.push({
              name: subcategoria.subcategoriaNombre,
              path: `/category/${categoriaId}/subcategory/${subcategoria.subcategoriaId}`
            });
          }

          if (subcategoria.subsubcategoria) {
            breadcrumbTrail.push({
              name: subcategoria.subsubcategoria.subsubcategoriaNombre,
              path: `/category/${categoriaId}/subcategory/${subcategoria?.subcategoriaId}/subsubcategory/${subcategoria.subsubcategoria.subsubcategoriaId}`
            });
          }

          // Update breadcrumb state
          setBreadcrumb(breadcrumbTrail);
        }
      }
    };

    scrollTop();
    fetchProduct();
  }, [id]);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    notify();
  };

  const notify = () => {
    toast(`Se agregaron ${cantidad} ${producto.title}`);
  }

  return (
    <>
      {
        loading ? (
          <Loader styles={"fixed lg:top-32 top-16 left-0 right-0 z-0 min-h-screen min-w-screen backdrop-blur-md mx-auto my-auto flex justify-center items-center"} />
        ) : producto == "No se encuentra el producto" ? (
          <div className='relative mt-40 w-full lg:w-2/3 xl:w-1/2 mx-auto h-screen -top-20 md:top-0'>
            <p
              className='text-textDark dark:text-textLight text-2xl roundedd backdrop-blur-md w-fit px-4 py-2'
            >
              {producto}
            </p>
          </div >
        ) : producto && (
          <div className='relative mt-40 w-full lg:w-2/3 xl:w-1/2 mx-auto h-screen -top-20 md:top-0'>

            <div className='w-full px-2 pb-12'>
              <nav className="mb-4">{generateBreadcrumb(breadcrumb)}</nav>

              {/* Item detail */}
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4">

                <div className="hidden md:flex min-w-16 flex-col space-y-2 pr-2 overflow-auto h-96">
                  {producto?.thumbnails?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={`w-16 h-16 cursor-pointer rounded-lg object-cover aspect-square border-2 transition
                        ${activeIndex === index ? "border-secondary" : "border-transparent"}`}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>

                {/* carrusel */}
                <div className='w-full h-full'>
                  <Carrusel
                    className="h-full"
                    imgClassName="object-cover h-auto"
                    containerStyle={'h-auto min-h-96 flex item-center justify-center'}
                    imagenes={producto?.thumbnails}
                    autoPlay={false}
                    showIndicators={viewWidth > 768 ? false : true}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </div>

                {/* Aside detail */}
                <aside
                  className='flex flex-col p-2 rounded justify-between
                  bg-backgroundLight/70 dark:bg-backgroundDark/80 text-textDark dark:text-textLight
                    md:w-fit'
                >

                  {/* Details price */}
                  <div className='flex flex-col '>
                    <h2 className='text-base'>{producto?.title}</h2>
                    <p className='text-base'>${producto?.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity addToCart */}
                  <div className='flex justify-between items-center px-8'>

                    {/* Add quit quantity */}
                    <div className="flex items-center">
                      {/* Botón "-" con animación */}
                      <button
                        onClick={() => setCantidad((prevCantidad) => Math.max(1, prevCantidad - 1))}
                        className="px-2 py-2.5 bg-secondary text-white rounded-l-full
                          transition duration-150 ease-in-out
                          active:scale-90 active:bg-opacity-70"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                      </button>

                      {/* Input de cantidad sin flechas */}
                      <input
                        className="w-12 py-1.5 text-center text-black appearance-none
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none
                          focus:ring-0 focus:outline-none border-none
                          bg-gray-100"
                        type="number"
                        value={cantidad}
                        min="1"
                        onChange={handleChangeCantidad}
                        style={{
                          MozAppearance: "textfield",
                        }}
                      />

                      {/* Botón "+" con animación */}
                      <button
                        onClick={() => setCantidad((prevCantidad) => prevCantidad + 1)}
                        className="px-2.5 py-2.5 bg-secondary text-white rounded-r-full
                          transition duration-150 ease-in-out
                          active:scale-90 active:bg-opacity-70"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      </button>
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={handleAgregar}
                      className="px-3 py-2 bg-principal rounded border-1 border-principal hover:border-secondary transition duration-150 ease-in-out active:scale-90 active:bg-opacity-70"
                      id={producto?.id}
                    >
                      Agregar
                    </button>
                  </div>
                </aside>
              </div>

              {/* More details */}
              <div
                className='flex flex-col
                  bg-backgroundLight/80 dark:bg-backgroundDark/90 text-textDark dark:text-textLight
                  rounded w-full mt-2 p-2'
              >
                <h2>Mas detalles</h2>
                {
                  producto?.description.map((desc, idx) => (
                    <div
                      key={idx}
                      className='flex flex-row justify-between'
                    >
                      <h2 className='text-nowrap text-base md:text-2xl font-normal pr-2'>{desc.label}:</h2>
                      <h2 className='line-clamp-1 text-base md:text-2xl font-normal'>{desc.value}</h2>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ItemDetailContainer
