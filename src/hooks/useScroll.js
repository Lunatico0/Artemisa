import { useEffect } from 'react';

const useScroll = () => {
  useEffect(() => {
    const brand = document.querySelector('.brand');
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Ocultar y mostrar la marca segun el desplazamiento
      if (currentScroll > lastScrollTop) {
        brand.classList.add('hidden');
      } else {
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
