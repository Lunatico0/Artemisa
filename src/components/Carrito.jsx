import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

const Carrito = () => {

  const { carrito, calcularTotal, eliminarProducto, vaciarCarrito } = useContext(CartContext)

  return (
    <div className="carruselContainer">
      <div className="backgroundBanner"></div >
      <div className='carro'>
        {
          carrito.map((prod) =>
            <h1 key={prod.id}>{prod.nombre}: ${prod.precio}</h1>
          )
        }
        <h2>Total: ${calcularTotal()}</h2>
        <button onClick={vaciarCarrito} >Eliminar todos los productos</button>
        <Link to={"/finalizar-compra"}>Ir a comprar</Link>
      </div>
    </div>
  )
}

export default Carrito
