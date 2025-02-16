import { useEffect } from 'react';

const useScroll = (ref) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.classList.toggle("sticky", window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
};

export default useScroll;
