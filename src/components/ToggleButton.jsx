import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const ToggleButton = (props) => {

  const { handleDarkMode } = useContext(CartContext)

  return (
    <>
      <input type="checkbox" id="toggle" onClick={handleDarkMode} />
      <div className='display'>
        <label className='label' htmlFor="toggle">
          <div className='circle'>
            {props.img1}
            {props.img2}
          </div>
        </label>
      </div>
    </>
  )
}

export default ToggleButton
