import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '../data/productos.json';
import categorias from '../data/category.json';
import Item from './Item';

const ItemListContainer = (props) => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");
  const { categoryId } = useParams();

  useEffect(() => {
    const obtenerProductos = () => {
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    };

    obtenerProductos()
      .then(res => {
        if (categoryId) {
          setProductos(res.filter(producto => producto.categoria.id === categoryId));
          setTitulo(categorias.find((cat) => cat.id === categoryId).nombre)
        } else {
          setProductos(res);
          setTitulo("Productos")
        }
      })
      .catch(err => console.log(err));
  }, [categoryId]);

  return (
    <div className="itemListContainer">
      <h1 className='tituloProductos'>{titulo}</h1>
      <div className="carruselContainer">
        <div className="backgroundBanner">
          
        </div>
      </div>

      <div className='productos'>
        {productos.length > 0 ? (
          productos.map(producto => (
            <Item key={producto.id} producto={producto} />
          ))
        ) : (
          "No hay productos"
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
