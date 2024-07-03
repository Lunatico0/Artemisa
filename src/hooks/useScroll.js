

const useScroll = (ref) => {
  window.addEventListener("scroll", function(){
    const header = document.querySelector(ref);
    header.classList.toggle("sticky", window.scrollY > 0);
  })
};

export default useScroll;
