import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import Carrusel from './Carrusel';
import imagenes from "../data/carruselImagenes.json";
import { CartContext } from '../context/CartContext';
import { IonLoading } from '@ionic/react';

const ItemListContainer = () => {
  const { breadcrumb, setBreadcrumb } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const { categoryId } = useParams();
  const URL = 'https://backend-70085.onrender.com'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}/api/products/?limit=500`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.status === "success") {
          setProductos(data.payload);
        } else {
          throw new Error('API response status was not success');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setTitulo("Error al cargar los productos");
      }
};

    fetchProducts();
  }, [categoryId, setBreadcrumb, URL]);

  return (
    <main className="itemListContainer">
      {
        productos.length > 0 && <Carrusel className='galery' imagenes={imagenes} autoPlay={true} showIndicators={true} />
      }
      <h1 className='tituloProductos'>{titulo}</h1>
      <div className='productos'>
        {productos.length > 0 ? (
          productos.map(producto => (
            <Item key={producto._id} producto={producto} />
          ))
        ) : (
          <IonLoading
            isOpen={true}
            className="loading flex justify-center items-center h-full w-full absolute top-0 text-gray-400 z-[1]"
            showBackdrop={false}
            translucent={true}
            backdropDismiss={false}
            spinner={"circular"}
            message="Cargando.."
            style={{ zIndex: 2 }}
          />
        )}
      </div>
    </main>
  );
};

export default ItemListContainer;
