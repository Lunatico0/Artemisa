import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Carrusel from './Carrusel';
import imagenes from "../data/carruselImagenes.json";
import { Breadcrumb } from 'react-bootstrap';

const ItemDetailContainer = () => {
  const { breadcrumb } = useContext(CartContext)
  const { id } = useParams();
  const [producto, setProducto] = useState()

  let imagenesProd = [
    producto?.imagenPrincipal || "",
    producto?.imagenesSecundarias?.imagen1 || "",
    producto?.imagenesSecundarias?.imagen2 || "",
    producto?.imagenesSecundarias?.imagen3 || ""
  ]

  const { agregarAlCarrito } = useContext(CartContext)

  useEffect(() => {
    const productoRef = doc(db, "productos", id)

    getDoc(productoRef)
      .then(res => {
        setProducto({ ...res.data(), id: res.id })
      })

  }, [id])

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="itemListContainer">
      <div className="carruselContainer">
        <div className="backgroundBanner" />
      </div>
      <Breadcrumb className='navcrumb'>
        <Breadcrumb.Item href={`/category/${producto.categoria.categoriaId}`}>{producto.categoria.categoriaNombre}</Breadcrumb.Item>
        <Breadcrumb.Item href={`/category/${producto.categoria.subcategoria.subcategoriaId}`}>{producto.categoria.subcategoria.subcategoriaNombre}</Breadcrumb.Item>
        <Breadcrumb.Item active href={`/category/${producto.descripcion}`}>{producto.descripcion}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="itemDetail">
        <div className='itemDetailInfo'>
          <Carrusel imagenes={imagenesProd} autoPlay={false} showIndicators={false} />
          <p className='infoDescripcion'>{producto.descripcionAlterna}</p>
        </div>
        <div className='itemDetailAside'>
          <h2 className='detailNombre'>{producto.descripcion}</h2>
          <h2 className='detailAdicional'>{producto.descripcionAlterna}</h2>
          <p className='detailPrecio'>${producto.precio}</p>
          <button onClick={() => agregarAlCarrito(producto)} className="botones agregarProducto detailAgregar" id={producto.id}>Agregar</button>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailContainer
