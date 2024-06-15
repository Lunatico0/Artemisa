import imagenes from '../../public/assets/carrusel/carruselImagenes.json'
import { useRef, React, useState, useEffect } from 'react';

const Carrusel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }

  }, [currentIndex]);


  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? imagenes.length - 1 : curr - 1;
      })
    } else {
      setCurrentIndex(curr => {
        const isLastSlide = currentIndex === imagenes.length - 1;
        return isLastSlide ? 0 : curr + 1;
      })
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="mainContainer">
      <div className="sliderContainer">
        <div className='leftArrow arrows' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow arrows' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="containerImages">
          <ul className='lista' ref={listRef}>
            {
              imagenes.map((item) => {
                return <li className='listaItem' key={item.id}>
                  <img className='img' src={item.url} alt={`${item.alt} ${item.id}`}/>
                </li>
              })
            }
          </ul>
        </div>
        <div className="dotsContainer">
          {
            imagenes.map((item, idx) => (
              <div key={idx}
                className={`dotContainerItem ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}>
                <img className='imgDot' src={item.url} alt={`${item.alt} ${item.id}`}/>
              </div>))
          }
        </div>
      </div>
    </div >
  )
}

export default Carrusel
