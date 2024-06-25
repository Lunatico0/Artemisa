import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);
    if (productoEncontrado) {
      setCarrito(carrito.map(prod => prod.id === producto.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const calcularCantidad = () => {
    return carrito.length;
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0).toFixed(2);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const handleSumar = (producto) => {
    setCarrito(carrito.map(prod => prod.id === producto.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod));
  };

  const handleRestar = (producto) => {
    setCarrito(carrito.map(prod => prod.id === producto.id && prod.cantidad > 1 ? { ...prod, cantidad: prod.cantidad - 1 } : prod));
  };

  const eliminarProducto = (producto) => {
    setCarrito(carrito.filter(prod => prod.id !== producto.id));
  };

  const agruparProductos = () => {
    const productoUnico = Array.from(new Set(carrito.map(prod => prod.id)));
    return productoUnico.map(id => {
      const producto = carrito.find(prod => prod.id === id);
      const total = producto.cantidad * producto.precio;
      return {
        ...producto, total
      };
    });
  };

  return (
    <CartContext.Provider value={{
      cantidad,
      breadcrumb,
      carrito,
      agruparProductos,
      handleSumar,
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
  );
};
