import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { carrito, calcularTotal, eliminarProducto, vaciarCarrito, agregarCantidad } = useContext(CartContext);

  return (
    <>

      <div className="carro">
        {carrito.map((prod) => (

          



          <div key={prod.id} className="producto">
            <p>Descripción: {prod.descripcion}</p>
            <p>Precio: ${prod.precio}</p>
            <p>Cantidad: {prod.cantidad}</p>
            <button onClick={() => agregarCantidad(prod.id)}>+</button>
            <button onClick={() => eliminarProducto(prod.id)}>-</button>
          </div>
        ))}
        <h2>Total: ${calcularTotal()}</h2>
        <button onClick={vaciarCarrito}>🗑️</button>
        <Link to="/finalizar-compra">Ir a comprar</Link>
      </div>
    </>
  );
};

export default Carrito;