import { React, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CartContext } from '../context/CartContext'
import { collection, addDoc } from "firebase/firestore"

const CheckOut = () => {

  const { carrito, calcularTotal, vaciarCarrito } = useContext(CartContext)
  const { register, handleSubmit } = useForm()

  const comprar = (data) => {
    console.log(data)
  }

  return (
    <div style={{marginBlock: "10rem"}} className='form'>
      <form onSubmit={handleSubmit(comprar)}>
        <input type="text" placeholder='Ingrese su nombre' {...register("nombre")} />
        <input type="email" placeholder='Ingrese su e-mail' {...register("email")} />
        <button type='submit'>Comprar</button>
      </form>
    </div>
  )
}

export default CheckOut
