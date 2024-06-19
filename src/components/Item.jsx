import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

//* Truncar descripcion de cada item despues de 2 lineas segun el ancho del container
const truncateText = (text, lines, containerRef) => {
  if (!containerRef.current) return text;

  const computedStyle = window.getComputedStyle(containerRef.current);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  const containerWidth = containerRef.current.offsetWidth;

  const maxHeight = lineHeight * lines;

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';
  div.style.lineHeight = `${lineHeight}px`;
  div.style.width = `${containerWidth}px`;
  div.innerText = text;

  document.body.appendChild(div);
  const textHeight = div.offsetHeight;
  document.body.removeChild(div);

  if (textHeight > maxHeight) {
    let truncatedText = text;
    while (div.offsetHeight > maxHeight) {
      truncatedText = truncatedText.slice(0, -1);
      div.innerText = truncatedText + '...';
    }
    return truncatedText + '...';
  }

  return text;
};

const Item = ( { producto } ) => {
  const navigate = useNavigate();
  const descripcionRef = useRef(null);
  const [descripcionTruncada, setDescripcionTruncada] = useState(producto.descripcion);

  const { carrito, setCarrito } = useContext(CartContext)


  const itemDetalles = (e) => {
    navigate(`/item/${e.currentTarget.id}`);
  };

  useEffect(() => {
    setDescripcionTruncada(truncateText(producto.descripcion, 2, descripcionRef));
  }, [producto.descripcion]);

  return (
    <div className='item'>
      <img src={producto.imagen} alt={producto.imagen} onClick={itemDetalles} id={producto.id} />
      <div className="itemDetalles">
        <div className='detalles' onClick={itemDetalles} id={producto.id}>
          <h2 className='itemDetallesNombre' >{producto.nombre}</h2>
          <p className='itemDetallesDescripcion' ref={descripcionRef}>{descripcionTruncada}</p>
          <p className='itemDetallesPrecio'>u$s{producto.precio}</p>
        </div>
        <button onClick={() => setCarrito([...carrito, producto])} className="botones agregarProducto" id={producto.id}>Agregar</button>
      </div>
    </div>
  );
};

export default Item;