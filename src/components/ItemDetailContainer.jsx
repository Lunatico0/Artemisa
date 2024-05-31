import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data/productos.json';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const producto = data.find(item => item.id.toString() === id);

  const agregarItem = (e) => {
    console.log(e.currentTarget.id);
  }

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
        <div className='itemDetailInfo'>
          <img className='infoImagen' src={producto.imagen} alt={producto.nombre} />
          <p className='infoDescripcion'>{producto.descripcion}</p>
        </div>
        <div className='itemDetailAside'>
          <h2 className='detailNombre'>{producto.nombre}</h2>
          <p className='detailPrecio'>${producto.precio}</p>
          <button onClick={agregarItem} className="botones agregarProducto detailAgregar" id={producto.id}>Agregar</button>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailContainer
