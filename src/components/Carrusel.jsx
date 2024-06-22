import React from 'react';
import { Carousel } from 'react-bootstrap';

const Carrusel = ({ imagenes = [], autoPlay = true, showIndicators = true }) => {
  if (!imagenes || imagenes.length === 0) {
    return null;
  }

  return (
    <Carousel interval={autoPlay ? 5000 : null} indicators={showIndicators} >
      {imagenes.map((img, index) => (
        <Carousel.Item key={index}>
          <img src={img} alt={`Slide ${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
