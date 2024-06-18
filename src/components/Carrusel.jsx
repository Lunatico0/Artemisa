import React from 'react';
import { Carousel } from 'react-bootstrap';
import imagenes from "../data/carruselImagenes.json";

const Carrusel = () => {
  return (
    <Carousel>
      {
        imagenes.length > 0 ? (
        imagenes.map((img, index) => (
          <Carousel.Item key={index}>
            <img src={img.url} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))
      ) : (
        console.log("No hay imagenes")
      )}
    </Carousel>
  );
}

export default Carrusel;
