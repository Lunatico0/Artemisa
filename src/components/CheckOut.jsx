import { React, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CartContext } from '../context/CartContext'
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { Navigate, NavLink, redirect } from 'react-router-dom'
import { db } from '../firebase/config'

const CheckOut = () => {

  const { carrito, agruparProductos, calcularTotal, vaciarCarrito } = useContext(CartContext);
  const { register, handleSubmit, watch } = useForm();
  const [isValid, setIsValid] = useState(false);
  const [prodId, setProdId] = useState("")

  const comentarios = watch('comentarios');

  const handleValidation = (event) => {
    setIsValid(event.target.value.trim() !== '');
  };

  const comprar = (data) => {
    const pedido = {
      cliente: data,
      fecha: Timestamp.now(),
      productos: carrito,
      total: calcularTotal()
    }

    const pedidosRef = collection(db, "pedidos");

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setProdId(doc.id);
        vaciarCarrito();
      })
  }

  if (prodId) {
    return (
      <div className="compraRealizada">
        <div className='graciasCompra'>
          <h2>Muchas gracias por tu compra</h2>
          <p>Tu codigo de seguimiento es: {prodId}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        carrito.length > 0 ?
          <>
            <div className="checkOut">
              <div className='items'>
                {agruparProductos().map((prod) => (
                  <div key={prod.id} className="producto">
                    <img src={prod.imagenPrincipal}
                      alt={prod.descripcion}
                      className='cartProdImg'
                    />
                    <div className='cantProd'>
                      <p className='cantidad'>Cant. {prod.cantidad}</p>
                      <NavLink to={`/item/${prod.id}`} className='prodDesc'>{prod.descripcion}</NavLink>
                    </div>
                    <p className='prodPrice'>${(prod.precio * prod.cantidad).toFixed(2)}</p>
                  </div>)
                )}
              </div>
              <div className='register'>
                <form id='checkout-form' className='form' onSubmit={handleSubmit(comprar)}>
                  <div className="nombre">

                    <input aria-label='Nombre' type="text" {...register("nombre")} required />
                    <span>Nombre</span>

                  </div>
                  <div className="apellido">

                    <input aria-label='Apellido' type="text" {...register("apellido")} required />
                    <span>Apellido</span>

                  </div>
                  <div className="email">

                    <input aria-label='e-Mail' type="email" {...register("email")} required />
                    <span>e-mail</span>

                  </div>
                  <div className="tel">

                    <input aria-label='Telefono' type='tel' {...register("telefono")} required />
                    <span>Telefono</span>

                  </div>
                  <div className="direccion">

                    <input aria-label='Direeccion' type='text' {...register("direccion")} required />
                    <span>Direccion</span>

                  </div>
                  <div className="localidad">

                    <input aria-label='Localidad' type="text" {...register("localidad")} required />
                    <span>Localidad</span>

                  </div>
                  <div className="coments">

                    <textarea aria-label='Comentarios' type="text" id='coments' className={`coments ${isValid ? 'valid' : ''}`} {...register("comentarios")} onChange={handleValidation} />
                    <span>Comentarios</span>

                  </div>
                </form>
              </div>
            </div>
            <div className='finalizar'>
              <h2 className='total'>Total: ${calcularTotal()}</h2>
              <button type='submit' form="checkout-form">Comprar</button>
            </div>
          </>
        :
        // redireccionar a la pagina de inicio si no hay productos en el carrito, usando <Navigate to="/" replace /> de react-router-dom

        <Navigate to="/" replace />
        
      }
    </div>
  );

}

export default CheckOut
