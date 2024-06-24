import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';

const Carrito = () => {
  const { carrito, calcularTotal, eliminarProducto, vaciarCarrito, handleSumar, handleRestar } = useContext(CartContext);



  const agruparProductos = () => {
    const productoUnico = Array.from(new Set(carrito.map(prod => prod.id)));
    return productoUnico.map(id => {
      const producto = carrito.find(prod => prod.id === id);
      const total = producto.cantidad * producto.precio;
      return {
        ...producto, total
      };
    });
  };

  return (
    <>
      <div className="carro">
        {agruparProductos().map((prod) => (
          <div key={prod.id} className="producto">
            <img src={prod.imagenPrincipal}
              alt="prod.descripcion"
              className='cartProdImg'
            />
            <p className='prodDesc'>{prod.descripcion}</p>
            <div className='cantProd'>
              <button className='boton btnCantProdMenos' onClick={() => handleRestar(prod)}>➖</button>
              <p>Cantidad: {prod.cantidad}</p>
              <button className='boton btnCantProdMas' onClick={() => handleSumar(prod)}>➕</button>
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
                  <NavLink className='navLink' to="/finalizar-compra">Ir a comprar 🛍️</NavLink>
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