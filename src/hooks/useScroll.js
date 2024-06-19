import { useEffect } from 'react';

const useScroll = () => {
  useEffect(() => {
    const brand = document.querySelector('.brand');
    const footer = document.querySelector('.footer');
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Ocultar y mostrar la marca según el desplazamiento
      if (currentScroll > lastScrollTop) {
        // Scrolling down
        brand.classList.add('hidden');
      } else {
        // Scrolling up
        brand.classList.remove('hidden');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScroll;