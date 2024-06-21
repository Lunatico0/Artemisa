import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const CargarProductos = () => {
  const [selectedOption, setSelectedOption] = useState('categoria');

  const handleSet = async (destino, origen) => {
    try {
      const ref = collection(db, destino);

      if (destino === 'productos') {
        // Consulta para verificar si el producto ya existe
        const querySnapshot = await getDocs(query(ref, where('id', '==', origen.id)));

        if (querySnapshot.empty) {
          await addDoc(ref, origen);
          console.log('Producto agregado correctamente.');
        }
      } else if (destino === 'categoria') {
        const catQuerySnapshot = await getDocs(query(ref, where('categoriaId', '==', origen.categoriaId)));
        const subCatQuerySnapshot = await getDocs(query(ref, where('subcategorias.subcategoriaId', '==', origen.subcategorias.subcategoriaId)));

        if (catQuerySnapshot.empty) {
          await addDoc(ref, origen);
          console.log('Categoria agregada correctamente.');
        }
        if (subCatQuerySnapshot.empty) {
          await addDoc(ref, origen);
          console.log('Subcategoria agregada correctamente.');
        }
        console.log('Verificación de categoría y subcategorías.');
      }
    } catch (error) {
      console.error('Error al agregar el producto o la categoría:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ position: "relative", zIndex: "3", color: "white", paddingTop: "10rem" }}>
      <label htmlFor="inputState" className="formLabel">Array a cargar</label>
      <select id="inputState" className="formSelect" onChange={handleChange} value={selectedOption}>
        <option value="categoria">categoria</option>
        <option value="productos">productos</option>
      </select>
      <button onClick={() => handleSet(selectedOption, selectedOption)}>Comenzar</button>
    </div>
  );
};

export default CargarProductos;
