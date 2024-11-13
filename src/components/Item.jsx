import { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Carrusel from './Carrusel';
import { toast } from 'react-toastify';

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

const Item = ({ producto }) => {
  const navigate = useNavigate();
  const defaultCant = 1;
  const descripcionRef = useRef(null);
  const titleRef = useRef(null);
  const [descripcionTruncada, setDescripcionTruncada] = useState('');
  const [titleTruncado, setTitleTruncado] = useState('');

  const { agregarAlCarrito } = useContext(CartContext);

  const itemDetalles = (e) => {
    navigate(`/item/${e.currentTarget.id}`);
  };

  useEffect(() => {
    let tonoValue = '';
    let compCantValue = '';
    let softDesc = '';
    producto.description.forEach(desc => {
      if (desc.label === 'TONO') {
        tonoValue = desc.value;
      }
      if (desc.label === 'COMPOSICIÓN') {
        compCantValue = desc.value;
      } else if (desc.label === 'CANT. DE PIEZAS POR CAJA') {
        compCantValue = desc.value;
      }
      softDesc = tonoValue + ' ' + compCantValue;
      setDescripcionTruncada(truncateText(softDesc, 1, descripcionRef));
    });
  }, [producto.description]);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleTruncado(truncateText(producto.title, 1, titleRef));
    }
  }, [producto.title]);

  const handleAgregar = (prod) => {
    agregarAlCarrito(prod, defaultCant);
  };

  const notify = () => {
    toast(`Se agregó exitosamente ${producto.title}`);
  };

  return (
    <div className='item'>
      <Carrusel className='prodSlider' imagenes={producto.thumbnails} autoPlay={false} showIndicators={false} />
      <div className="itemDetalles">
        <div className='detalles' onClick={itemDetalles} id={producto._id}>
          <p className='itemDetallesTitulo' ref={titleRef}>{titleTruncado}</p>
          <p className='itemDetallesDescripcion' ref={descripcionRef}>{descripcionTruncada}</p>
          <p className='itemDetallesPrecio'>US${producto.price.toFixed(2)}</p>
        </div>
        <button onClick={() => { notify(); handleAgregar(producto); }} className="botones agregarProducto" >Agregar</button>
      </div>
    </div>
  );
};

export default Item;
