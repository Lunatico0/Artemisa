import { useContext, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { CartContext } from '../context/CartContext.jsx';

const Carrusel = ({
  imagenes,
  autoPlay = true,
  showIndicators = true,
  controls,
  className = "",
  imgClassName = "",
  containerStyle = {},
  imgStyle = {},
  activeIndex = null,
  setActiveIndex = null,
}) => {
  const { carouselTheme } = useContext(CartContext);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    if (setActiveIndex) {
      setActiveIndex(selectedIndex);
    } else {
      setIndex(selectedIndex);
    }
  };

  if (!imagenes || imagenes.length === 0) {
    return null;
  }

  return (
    <Carousel
      data-bs-theme={carouselTheme}
      className={className}
      interval={autoPlay ? 5000 : null}
      indicators={showIndicators ? imagenes.length > 1 : false}
      prevLabel={false}
      pause={'hover'}
      touch={true}
      controls={controls == false ? controls : imagenes.length > 1}
      fade
      activeIndex={activeIndex !== null ? activeIndex : index}
      onSelect={handleSelect}
    >
      {imagenes.map((img, idx) => (
        img ? (
          <Carousel.Item key={idx}>
            <div className={`relative w-full overflow-hidden ${containerStyle}`}>
              <img
                src={img}
                alt={`Slide ${idx}`}
                className={`absolute left-0 w-full ${imgClassName}`}
                style={imgStyle}
              />
            </div>
          </Carousel.Item>
        ) : null
      ))}
    </Carousel>
  );
};

export default Carrusel;
