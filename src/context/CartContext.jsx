import { createContext, useEffect, useState } from "react"

export const CartContext = createContext();

export const CartProvider = ( {children} ) => {

  const [carrito, setCarrito] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    if (window.matchMedia('(prefers-color.scheme: dark)').matches) {
      return "oscuro"
    }
    return "claro"
  });

  useEffect(() => {
    if (darkMode === "oscuro") {
      document.querySelector('html').classList.add("oscuro");
    } else {
      document.querySelector('html').classList.remove("oscuro");
    }
  }, [darkMode])

  return(
    <CartContext.Provider value={ { carrito, setCarrito } }>
      {children}
    </CartContext.Provider>
  )

}