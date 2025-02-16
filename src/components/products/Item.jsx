import { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import Carrusel from '../Carrusel.jsx';
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
  const [ setTitleTruncado] = useState('');

  const { agregarAlCarrito } = useContext(CartContext);

  useEffect(() => {
    let tonoValue = '';
    let compCantValue = '';
    let otherDescription = '';
    let softDesc = '';
    producto.description.forEach(desc => {
      if (desc.label === 'TONO') {
        tonoValue = desc.value;
      }
      if (desc.label === 'COMPOSICIÓN') {
        compCantValue = desc.value;
      }
      if (desc.label === 'CANT. DE PIEZAS POR CAJA') {
        compCantValue = compCantValue + ' ' + desc.value;
      } else if (desc.label === 'TONO') {
        tonoValue = desc.value;
      }
      if (desc.label === 'ESPESOR' || desc.label === 'MEDIDAS' || desc.label === 'PRESENTACIÓN' || desc.label === 'CARACTERÍSTICAS' || desc.label === 'RENDIMIENTO' || desc.label === 'USOS' || desc.label === 'Aspecto' || desc.label === 'Dimensiones' || desc.label === 'SISTEMAS') {
        otherDescription = (otherDescription + ' ' + desc.value);
      }

      softDesc = (tonoValue + ' ' + compCantValue).length > 2 ? tonoValue + ' ' + compCantValue : otherDescription;
      setDescripcionTruncada(softDesc);
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

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = () => {
    toast(`Se agregó exitosamente ${producto.title}`);
  };

  return (
    <div className='flex flex-col justify-between rounded-lg shadow-md overflow-hidden bg-backgroundLight transition-transform duration-100 ease-in-out hover:-translate-y-1 hover:shadow-lg '>
      <Carrusel
        className="galery"
        imgClassName="object-contain p-0.5 rounded-t-lg"
        containerStyle={'h-auto aspect-square'}
        imagenes={producto.thumbnails}
        autoPlay={false}
        showIndicators={false}
        controls={true}
      />
      <div
        className='bg-secondary p-2 flex flex-col justify-between h-48'
      >
        <NavLink
          className='flex flex-col no-underline text-textLight justify-between h-full cursor-pointer'
          to={`/item/${producto._id}`}
          onClick={() => scrollTop()}
        >
          <p className='line-clamp-1'>
            {producto.title}
          </p>
          <p className='line-clamp-2' ref={descripcionRef}>
            {descripcionTruncada}
          </p>
          <p className='itemDetallesPrecio'>US${producto.price.toFixed(2)}</p>
        </NavLink>
        <button
          onClick={() => { notify(); handleAgregar(producto); }}
          className="hover:bg-hover bg-principal rounded-full pb-1 px-3 max-w-min text-textLight text-center"
          style={{ borderColor: "#a19d9d", borderWidth: "1px" }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Item;
