import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase/config";
import Item from './Item';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const { categoryId } = useParams();

  useEffect(() => {
    const productosRef = collection(db, "productos");
    const categoriasRef = collection(db, "categoria");

    let prodQuery;
    if (categoryId) {
      prodQuery = query(
        productosRef,
        where("categoria.categoriaId", "==", categoryId)
      );
    } else {
      prodQuery = productosRef;
    }

    getDocs(prodQuery)
      .then((res) => {
        if (res.empty) {
          const subProdQuery = query(
            productosRef,
            where("categoria.subcategorias.subcategoriaId", "==", categoryId)
          );
          return getDocs(subProdQuery);
        }
        return res;
      })
      .then((res) => {
        setProductos(
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((error) => {
        console.error("Error al obtener productos: ", error);
      });

    if (categoryId) {
      const catQuery = query(categoriasRef, where("categoriaId", "==", categoryId));
      getDocs(catQuery)
        .then((res) => {
          if (res.docs.length > 0) {
            const categoriaData = res.docs[0].data();
            setTitulo(
              <NavLink className="navLink" to={`/category/${categoriaData.categoriaId}`}>
                {categoriaData.categoriaNombre}
              </NavLink>
            );
          } else {
            const subcatQuery = query(categoriasRef, where("subcategorias.subcategoriaId", "==", categoryId));
            getDocs(subcatQuery)
              .then((subres) => {
                if (subres.docs.length > 0) {
                  const subcategoriaData = subres.docs[0].data();
                  setTitulo(
                    <>
                      <NavLink className="navLink" to={`/category/${subcategoriaData.categoriaId}`}>
                        {subcategoriaData.categoriaNombre}
                      </NavLink>
                      {' > '}
                      <NavLink className="navLink" to={`/category/${subcategoriaData.subcategorias.subcategoriaId}`}>
                        {subcategoriaData.subcategorias.subcategoriaNombre}
                      </NavLink>
                    </>
                  );
                }
              })
              .catch((error) => {
                console.error("Error al obtener subcategorías: ", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error al obtener la categoría: ", error);
        });
    } else {
      setTitulo("")
    }
  }, [categoryId]);

  return (
    <div className="itemListContainer">
      <h1 className='tituloProductos'>{titulo}</h1>
      <div className="carruselContainer">
        <div className="backgroundBanner"></div>
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
