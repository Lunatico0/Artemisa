import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ producto }) => {
  const navigate = useNavigate();

  const agregarItem = (e) => {
    console.log(e.currentTarget.id);
  }

  const itemDetalles = (e) => {
    navigate(`/item/${e.currentTarget.id}`);
  }

  return (
    <div className='item'>
      <img src={producto.imagen} alt={producto.imagen} onClick={itemDetalles} id={producto.id} />
      <div className="itemDetalles">
        <div className='detalles' onClick={itemDetalles} id={producto.id} >
          <h2 className='itemDetallesNombre'>{producto.nombre}</h2>
          <p className='itemDetallesDescripcion'>{producto.descripcion}</p>
          <p className='itemDetallesPrecio'>${producto.precio}</p>
        </div>
        <button onClick={agregarItem} className="botones agregarProducto" id={producto.id}>Agregar</button>
      </div>
    </div>
  )
}

export default Item;
