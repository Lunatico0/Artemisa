import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState()

  const { carrito, setCarrito } = useContext(CartContext)

  useEffect(() =>{
    const productoRef = doc(db, "productos", id)

    getDoc(productoRef)
      .then(res => {
        setProducto( { ...res.data(), id: res.id } )
      })

  }, [id])

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="itemListContainer">
      <div className="carruselContainer">
        <div className="backgroundBanner"/>
      </div>
      <div className="itemDetail">
        <div className='itemDetailInfo'>
          <img className='infoImagen' src={producto.imagen} alt={producto.descripcion} />
          <p className='infoDescripcion'>{producto.descripcionAlterna}</p>
        </div>
        <div className='itemDetailAside'>
          <h2 className='detailNombre'>{producto.descripcion}</h2>
          <h2 className='detailAdicional'>{producto.descripcionAlterna}</h2>
          <p className='detailPrecio'>${producto.precio}</p>
          <button onClick={() => setCarrito([...carrito, producto])} className="botones agregarProducto detailAgregar" id={producto.id}>Agregar</button>
        </div>
      </div>
      {/* <Item key={producto.id} producto={producto} /> alternativa para reutilizar Item */}
    </div>
  )
}

export default ItemDetailContainer
