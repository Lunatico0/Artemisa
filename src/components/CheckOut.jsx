import { React, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CartContext } from '../context/CartContext'
import { collection, addDoc } from "firebase/firestore"

const CheckOut = () => {

  const { carrito, calcularTotal, eliminarProducto, vaciarCarrito, agregarCantidad, quitarCantidad } = useContext(CartContext);
  const { register, handleSubmit } = useForm();

  const comprar = (data) => {
    console.log(data)
  }

  return (
    <div className="checkOut">
      <div className='items'>
        
      </div>
      <div className='form'>
        <form onSubmit={handleSubmit(comprar)}>
          <input type="text" placeholder='Nombre' {...register("nombre")} />
          <input type="text" placeholder='Apellido' {...register("apellido")} />
          <input type="email" placeholder='e-mail' {...register("email")} />
          <input type='tel' placeholder='Telefono' {...register("telefono")} />
          <input type='text' placeholder='Direccion' {...register("direccion")} />
          <input type="text" placeholder='Localidad' {...register("localidad")} />
          <input type="text" placeholder='Comentarios' {...register("comentarios")} />
          <button type='submit'>Comprar</button>
        </form>
      </div>
      









      {/* <h2>Confirmar Pedido</h2>
      <div className="order-summary">
        <div className="product-item">
          <span>Código: XXXXXXXX</span>
          <span>Detalle: [Nombre del Producto]</span>
          <span>Precio: $[Precio]</span>
          <span>Cantidad: [Cantidad]</span>
        </div>
      </div>

      <form className="customer-info">
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Teléfono" />
      </form>

      <div className="order-total">
         Importe: $[Total]
         IVA (Impuestos): $[Monto de Impuestos]
         Total: $[Total con Impuestos]
      </div>

      <button className='clear-cart'>Limpiar Carrito</button>
      <button className='continue'>Continuar</button> */}
    </div>
  );

}

export default CheckOut
