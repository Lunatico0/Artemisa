import { createContext, useEffect, useState } from "react"

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cantidad, setCantidad] = useState(1)

  const [carrito, setCarrito] = useState([]);

  let breadcrumb = "";

  //* DarkMode
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

  }, [handleDarkMode])

  const agregarAlCarrito = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);
    productoEncontrado ? setCarrito(carrito.map(prod =>
      prod.id === producto.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    )) : setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }


  //* Cantidad de productos
  const calcularCantidad = () => {
    return carrito.length
  }

  //* Total Productos
  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0).toFixed(2);
  }

  //* Vaciar Carrito
  const vaciarCarrito = () => {
    setCarrito([])
  }

  //* agregar unidad de dicho producto
  const handleSumar = (producto) => {
    setCarrito(carrito.map(prod => {
      if (prod.id === producto.id) {
        return { ...prod, cantidad: prod.cantidad + 1 };
      }
      return prod;
    }));
  }

  //* restar unidad de dicho producto
  const handleRestar = (producto) => {
    setCarrito(carrito.map(prod => {
      if (prod.id === producto.id && prod.cantidad > 1) {
        return { ...prod, cantidad: prod.cantidad - 1 };
      }
      return prod;
    }));
  }

  //* agregar al carrito
  const hadleAgregar = (producto) => {
    const itemAgregado = { ...producto, cantidad }
  }

  //* Eliminar producto
  const eliminarProducto = (producto) => {
    setCarrito(carrito.filter(prod => prod.id !== producto.id));
  }

  return (
    <CartContext.Provider value={{
      cantidad,
      breadcrumb,
      carrito,
      handleSumar,
      hadleAgregar,
      handleRestar,
      vaciarCarrito,
      eliminarProducto,
      setCarrito,
      handleDarkMode,
      calcularCantidad,
      calcularTotal,
      agregarAlCarrito
    }}>
      {children}
    </CartContext.Provider>
  )

}