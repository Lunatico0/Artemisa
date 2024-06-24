import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

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
            <p className='prodDesc'>Descripción: {prod.descripcion}</p>
            <p className='prodPrice'>Precio: ${prod.precio}</p>
            <div className='cantProd'>
              <button className='btn btnCantProdMas' onClick={() => handleSumar(prod)}>➕</button>
              <p>Cantidad: {prod.cantidad}</p>
              <button className='btn btnCantProdMenos' onClick={() => handleRestar(prod)}>➖</button>
              <button className='btn eliminar' onClick={() => eliminarProducto(prod)}>🗑️</button>
            </div>
          </div>
        ))}
        {
          carrito.length > 0 ?
            <>
              <h2>Total: ${calcularTotal()}</h2>
              <button onClick={vaciarCarrito}>🗑️</button>
              <Link to="/finalizar-compra">Ir a comprar</Link>
            </>
            : <h2>Tu carrito esta vacio 😥</h2>
        }
      </div>
    </>
  );
};

export default Carrito;