import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let breadcrumb = "";
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  //* DarkMode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') : 'system'
  );

  const handleDarkMode = (text) => {
    setDarkMode(text);
  }

  function onWindowMatch () {
    if(localStorage.darkMode === 'dark' || (!('darkMode' in localStorage) && darkQuery.matches)){
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (darkMode) {
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem("darkMode", 'dark');
        break;

      case 'light':
        element.classList.remove('dark')
        localStorage.setItem("darkMode", 'light');
        break;

      default:
        localStorage.removeItem("darkMode");
        onWindowMatch();
        break;
    }
  }, [darkMode]);

  darkQuery.addEventListener("change", (e) => {
    if ( !( "darkMode" in localStorage ) ){
      if ( e.matches ) {
        element.classList.add('dark')
      } else {
        element.classList.remove('dark')
      }
    }
  })

  const options = [
    {
      text: 'dark',
      icon: 'moon'
    },
    {
      text: 'light',
      icon: 'sunny'
    },
    {
      text: 'system',
      icon: 'desktop-outline'
    },
  ];  

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const handleChangeCantidad = (event) => {
    const value = parseInt(event.target.value, 10);
    setCantidad(value);
  };

  const agregarAlCarrito = (producto, cantidad) => {
    const productoEncontrado = carrito.find(prod => prod.id === producto.id);

    if (productoEncontrado) {
      setCarrito(carrito.map(prod => prod.id === producto.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: cantidad }]);
    }
  };

  const calcularCantidad = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
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

  const handleChangeCantidadCarrito = (event, prodId) => {
    const newCantidad = parseInt(event.target.value, 10);
    if (!isNaN(newCantidad)) {
      // Actualizar la cantidad del producto en el carrito
      const updatedCarrito = carrito.map(prod => {
        if (prod.id === prodId) {
          return { ...prod, cantidad: newCantidad };
        }
        return prod;
      });
      setCarrito(updatedCarrito); // Asumiendo que setCarrito está disponible en el contexto
    }
  };

  return (
    <CartContext.Provider value={{
      cantidad,
      breadcrumb,
      carrito,
      darkMode,
      options,
      agruparProductos,
      handleSumar,
      handleRestar,
      vaciarCarrito,
      eliminarProducto,
      setCantidad,
      setCarrito,
      handleDarkMode,
      calcularCantidad,
      calcularTotal,
      handleChangeCantidad,
      agregarAlCarrito,
      handleChangeCantidadCarrito
    }}>
      {children}
    </CartContext.Provider>
  );
};
