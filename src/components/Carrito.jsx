import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';
import Loader from './utils/Loader.jsx';

const Carrito = () => {
  const {
    carrito,
    modificarCantidad,
    eliminarProducto,
    vaciarCarrito,
    loading,
    handleChangeCantidad,
    viewWidth
  } = useContext(CartContext);

  return (
    <>
      {loading ? (
        <Loader styles={"fixed lg:top-32 top-5 left-0 right-0 z-20 min-h-screen min-w-screen backdrop-blur-md mx-auto my-auto flex justify-center items-center"} />
      ) : carrito.length > 0 ? (
        <div className={`flex flex-col justify-between pt-20 lg:pt-40 gap-3 z-20 lg:w-3/4 mx-auto h-[93dvh]`}>
          <h2
            className='w-fit mx-2 px-4 py-2 m-0 backdrop-blur-md rounded-lg text-textDark dark:text-textLight bg-backgroundDark/20 dark:bg-backgroundLight/20'>
            Carrito
            <span className="relative top-1 left-1"><ion-icon name="cart-outline"></ion-icon></span>
          </h2>

          <div className='flex flex-col -mt-3 pt-3 px-2 gap-3 max-h-[75dvh] overflow-auto'>
            {carrito.map(prod => (
              <div key={prod.product._id} className="flex flex-row justify-between items-center border border-gray-800 rounded-lg gap-2 backdrop-blur-md">
                <img
                  src={prod.product.thumbnails[0]}
                  alt={prod.product.title}
                  className='aspect-square w-36 my-2 ml-2 rounded-lg object-cover'
                />
                <div className="flex flex-col w-full gap-2 md:gap-4">
                  <NavLink to={`/item/${prod.product._id}`} className='line-clamp-2 text-textDark dark:text-textLight no-underline lg:text-lg text-normal font-semibold'>
                    {prod.product.title}
                  </NavLink>

                  <div className='p-0 m-0'>
                    <p className='flex gap-x-1 text-sm p-0 m-0 text-textDark dark:text-textLight'>{prod.product.description[0].label}: {prod.product.description[0].value}</p>
                  </div>

                  <div className='flex flex-row w-full items-center justify-between pr-2'>
                    {/* Add quit quantity */}
                    <div className="flex items-center">

                      {/* Botón "-" con animación */}
                      <button
                        onClick={() => modificarCantidad(prod.product._id, -1)}
                        className="px-2.5 py-2.5 bg-secondary text-textDark dark:text-textLight rounded-l-full
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
                        value={prod.quantity}
                        min="1"
                        onChange={handleChangeCantidad}
                        style={{
                          MozAppearance: "textfield",
                        }}
                      />

                      {/* Botón "+" con animación */}
                      <button
                        onClick={() => modificarCantidad(prod.product._id, 1)}
                        className="px-2.5 py-2.5 bg-secondary text-textDark dark:text-textLight rounded-r-full
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
                    <p className='text-textDark dark:text-textLight font-semibold text-nowrap text-center m-0 p-0'>
                      ${(prod.product.price * prod.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className='w-10 h-10 pt-1
                    absolute -top-4 -right-2 rounded-full backdrop-blur-sm
                    bg-backgroundLight/50 dark:bg-backgroundDark/30 text-textDark dark:text-textLight
                    uppercase cursor-pointer'
                    onClick={() => eliminarProducto(prod.product._id)}
                  >
                    <ion-icon size="large" name="trash-outline"></ion-icon>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='px-2'>
            <button
              className='bg-hover dark:bg-bgFooter/60 backdrop-blur-lg text-textDark dark:text-textLight rounded-l-full pr-6 pl-3 py-1.5 items-center'
              onClick={vaciarCarrito}
            >
              Vaciar carrito
              <span className="relative top-0.5 pl-1"><ion-icon name="trash-outline"></ion-icon></span>
            </button>
            <button className='bg-acento rounded-r-full pr-6 pl-3 py-1.5'>
              <NavLink
                className='no-underline text-textDark'
                to="/finalizar-compra"
              >
                Finalizar Compra <span className="relative top-0.5 pl-1 no-underline"><ion-icon name="bag-check-outline"></ion-icon></span>
              </NavLink>
            </button>
          </div>


        </div>
      ) : (
        <div className="relative flex flex-col pt-20 lg:pt-40 px-2 gap-4 z-20 lg:w-3/4 mx-auto">
          <h2 className='text-textDark dark:text-textLight'>Tu carrito está vacío 😥</h2>
        </div>
      )}
    </>
  );
};

export default Carrito;
