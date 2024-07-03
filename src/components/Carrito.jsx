import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';

const Carrito = () => {
  const { carrito, agruparProductos, calcularTotal, eliminarProducto, vaciarCarrito, handleSumar, handleRestar, handleChangeCantidadCarrito } = useContext(CartContext);

  return (
    <>
      <div className="carro">
        {agruparProductos().map((prod) => (
          <div key={prod.id} className="producto">
            <img
              src={prod.imagenPrincipal}
              alt={prod.descripcion}
              className='cartProdImg'
            />
            <NavLink to={`/item/${prod.id}`} className='prodDesc'>{prod.descripcion}</NavLink>
            <div className='cantProd'>
              <button className='boton btnCantProdMenos' onClick={() => handleRestar(prod)}>-</button>
              <input
                min="1"
                className='cantidad'
                type="number"
                value={prod.cantidad}
                onChange={(e) => handleChangeCantidadCarrito(e, prod.id)}
              />
              <button className='boton btnCantProdMas' onClick={() => handleSumar(prod)}>+</button>
            </div>
            <button className='boton eliminar' onClick={() => eliminarProducto(prod)}>🗑️</button>
            <p className='prodPrice'>Subtotal: ${prod.precio * prod.cantidad}</p>
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
            : <h2 className='carroVacio'>Tu carrito está vacío 😥</h2>
        }
      </div>
    </>
  );
};

export default Carrito;
