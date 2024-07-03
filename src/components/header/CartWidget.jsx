import React, { useContext } from 'react'
import ToggleButton from '../ToggleButton'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const CarWidget = () => {

  const { calcularCantidad } = useContext(CartContext);
  const cantidad = calcularCantidad();
  const mostrarBefore = cantidad > 0;

  return (
    <div className='carrito'>
      <Link to={"/carrito"}>
        <span className={`numerito ${mostrarBefore ? 'con-before' : ''}`} >{ cantidad != 0 ? cantidad : ""}</span>🛒
      </Link>
      <ToggleButton className="darkMode"/>
    </div>
  )
}

export default CarWidget
