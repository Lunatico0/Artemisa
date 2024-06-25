import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';

const Carrito = () => {
  let { carrito } = useContext(CartContext);
  const { agruparProductos, calcularTotal, eliminarProducto, vaciarCarrito, handleSumar, handleRestar } = useContext(CartContext);
  

  return (
    <>
      <div className="carro">
        {agruparProductos().map((prod) => (
          <div key={prod.id} className="producto">
            <img src={prod.imagenPrincipal}
              alt="prod.descripcion"
              className='cartProdImg'
            />
            <NavLink to={`/item/${prod.id}`} className='prodDesc'>{prod.descripcion}</NavLink>
            <div className='cantProd'>
              <button className='boton btnCantProdMenos' onClick={() => handleRestar(prod)}>-</button>
              <p className='cantidad'>Cantidad: {prod.cantidad}</p>
              <button className='boton btnCantProdMas' onClick={() => handleSumar(prod)}>+</button>
            </div>
            <button className='boton eliminar' onClick={() => eliminarProducto(prod)}>🗑️</button>
            <p className='prodPrice'>Precio: ${prod.precio}</p>
          </div>
        ))}
        {
          carrito.length > 0 ?
            <div className='carroInfo'>
              <h2 className='total'>Total: ${calcularTotal()}</h2>
              <div className="botones">
                <button className='vaciar' onClick={vaciarCarrito}>Vaciar carrito🗑️</button>
                <button className='comprar'>
                  <NavLink className='navLink' to="/finalizar-compra">Finalizar Compra 🛍️</NavLink>
                </button>
              </div>
            </div>
            : <h2 className='carroVacio'>Tu carrito esta vacio 😥</h2>
        }
      </div>
    </>
  );
};

export default Carrito;