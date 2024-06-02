import React from 'react'

const ToggleButton = (props) => {
  return (
    <>
      <input type="checkbox" id="toggle" onClick={props.darkMode} />
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
