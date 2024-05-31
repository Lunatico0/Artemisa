import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data/productos.json';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const producto = data.find(item => item.id.toString() === id);

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="itemListContainer">
      <div className="carruselContainer">
        <div className="backgroundBanner">

        </div>
      </div>
      <div className="itemDetail">
        <img src={producto.imagen} alt={producto.nombre} />
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p>Precio: ${producto.precio}</p>
      </div>
    </div>
  )
}

export default ItemDetailContainer
