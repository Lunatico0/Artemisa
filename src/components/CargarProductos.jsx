// import React, { useState } from 'react';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import productos from '../data/productosArtemisaImagenes.json'
// import categoria from '../data/categoriasArtemisaImagenes.json'

// const CargarProductos = () => {
//   const [selectedOption, setSelectedOption] = useState('categoria');

//   const handleSet = async (destino, origen) => {
//     const arrayToUpload = origen === 'categoria' ? categoria : productos;
//     const ref = collection(db, destino);
//     arrayToUpload.forEach(prod => {
//       addDoc(ref, prod);
//     });
//   };

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div style={{ position: "relative", zIndex: "3", color: "white", paddingTop: "10rem" }}>
//       <label htmlFor="inputState" className="formLabel">Array a cargar</label>
//       <select id="inputState" className="formSelect" onChange={handleChange} value={selectedOption}>
//         <option value="categoria">categoria</option>
//         <option value="productos">productos</option>
//       </select>
//       <button onClick={() => handleSet(selectedOption, selectedOption)}>Comenzar</button>
//     </div>
//   );
// };

// export default CargarProductos;
