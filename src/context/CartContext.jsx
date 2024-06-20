import { createContext, useEffect, useState } from "react"

export const CartContext = createContext();

export const CartProvider = ( {children} ) => {

  const [carrito, setCarrito] = useState([]);
  
  const [darkMode, setDarkMode] = useState(() => {
    if ((window.matchMedia('(prefers-color.scheme: dark)').matches) || (localStorage.getItem("darkMode") == "oscuro")) {
      return "oscuro"
    }
    return "claro"
  });
  
  const handleDarkMode = () => {
    setDarkMode(darkMode == "claro" ? "oscuro" : "claro");
  }
  
  useEffect(() => {
    if (darkMode === "oscuro") {
      document.querySelector('html').classList.add("oscuro");
      localStorage.setItem("darkMode", darkMode);
    } else {
      document.querySelector('html').classList.remove("oscuro");
      localStorage.setItem("darkMode", darkMode);
    }

    localStorage.setItem("carrito", carrito)
    
  }, [handleDarkMode, carrito])

  const calcularCantidad = () => {
    return carrito.length
  }

  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio, 0).toFixed(2);
  }

  const vaciarCarrito = () =>{
    setCarrito([])
  }

  const eliminarProducto = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);
    const indice = carrito.indexOf(productoEncontrado);
    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(indice, 1);
    setCarrito(nuevoCarrito)
  }

  return(
    <CartContext.Provider value={{ carrito, setCarrito, handleDarkMode, calcularCantidad, calcularTotal }}>
      {children}
    </CartContext.Provider>
  )

}