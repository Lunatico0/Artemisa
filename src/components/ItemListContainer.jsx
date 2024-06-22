import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase/config";
import Item from './Item';
import Carrusel from './Carrusel';
import imagenes from "../data/carruselImagenes.json";
import { CartContext } from '../context/CartContext';

const ItemListContainer = () => {
  let { breadcrumb } = useContext(CartContext)
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const { categoryId } = useParams();

  useEffect(() => {
    const productosRef = collection(db, "productos");
    let prodQuery = categoryId ? query(productosRef, where("categoria.categoriaId", "==", categoryId)) : productosRef;

    getDocs(prodQuery)
      .then((res) => {
        if (res.empty) {
          const subProdQuery = query(
            productosRef,
            where("categoria.subcategoria.subcategoriaId", "==", categoryId)
          );
          return getDocs(subProdQuery).then((subres) => {
            if (!subres.empty) {
              setProductos(subres.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
              const firstDocData = subres.docs[0].data();
              setTitulo(
                <>
                  <NavLink className="navLink" to={`/category/${firstDocData.categoria.categoriaId}`}>
                    {firstDocData.categoria.categoriaNombre}
                  </NavLink>
                  {" > "}
                  <NavLink className="navLink" to={`/category/${firstDocData.categoria.subcategoria.subcategoriaId}`}>
                    {firstDocData.categoria.subcategoria.subcategoriaNombre}
                  </NavLink>
                </>
              );
            } else {
              setProductos([]);
              setTitulo("No hay productos");
            }
          });
        } else {
          setProductos(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          categoryId ?
            setTitulo(
              <>
                <NavLink className="navLink" to={`/category/${res.docs[0].data().categoria.categoriaId}`}>
                  {res.docs[0].data().categoria.categoriaNombre}
                </NavLink>
              </>
            ) : setTitulo("")
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos: ", error);
      });
      breadcrumb = titulo;
  }, [categoryId]);

  return (
    <div className="itemListContainer">
      <Carrusel imagenes={imagenes} autoPlay={true} showIndicators={true} />
      <h1 className='tituloProductos'>{titulo}</h1>
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
