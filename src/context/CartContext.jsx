import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const element = document.documentElement;

  const [carrito, setCarrito] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [cantidad, setCantidad] = useState(1);
  const [categoryId, setCategoryId] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([{
    name: 'Todos los produtos',
    path: `/`
  }]);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);

  //* Dark Mode
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") || "system");
  const [carouselTheme, setCarouselTheme] = useState(localStorage.getItem("darkMode") || "system");

  //* ✅ Funciones para manejar el carrito con la API

  // 🔹 Obtener carrito desde la API
  const fetchCarrito = async (cid) => {
    if (!cid) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/carts/${cid}`);
      const data = await response.json();
      if (response.ok) {
        setCarrito(data.cart.products);
      } else {
        throw new Error(data.message || "Error al obtener carrito");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Crear un nuevo carrito si no existe
  const crearCarrito = async () => {
    try {
      const response = await fetch(`${BASE_URL}/carts`, { method: "POST" });
      const data = await response.json();
      if (response.ok) {
        setCartId(data.newCart._id);
        localStorage.setItem("cartId", data.newCart._id);
        return data.newCart._id;
      }
      throw new Error("No se pudo crear el carrito");
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Agregar producto al carrito
  const agregarAlCarrito = async (producto, cantidad = 1) => {
    setLoading(true);
    try {
      let cid = cartId;
      if (!cid) {
        cid = await crearCarrito();
      }

      const response = await fetch(`${BASE_URL}/carts/${cid}/products/${producto._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: cantidad }),
      });

      if (!response.ok) throw new Error("No se pudo agregar el producto");

      fetchCarrito(cid);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmarAccion = async (mensaje, confirmButtonText = "Sí, eliminar") => {
    return Swal.fire({
      title: "¿Estás seguro?",
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then((result) => result.isConfirmed);
  };

  // 🔹 Modificar cantidad de un producto en el carrito
  const modificarCantidad = async (productId, cantidad) => {
    setLoading(true);
    try {
      if (!cartId) return;

      const producto = carrito.find((prod) => prod.product._id === productId);

      if (!producto) return;

      if (producto.quantity === 1 && cantidad === -1) {
        const confirmar = await confirmarAccion("¿Quieres eliminar este producto del carrito?");
        if (!confirmar) return; // Si el usuario cancela, no hacemos nada

        await eliminarProducto(productId); // Si confirma, eliminamos el producto
        return;
      }

      const response = await fetch(`${BASE_URL}/carts/${cartId}/products/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: cantidad }),
      });

      if (!response.ok) throw new Error("No se pudo modificar la cantidad");

      fetchCarrito(cartId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar un producto del carrito
  const eliminarProducto = async (productId) => {
    const confirmar = await confirmarAccion("¿Quieres eliminar este producto del carrito?");
    if (!confirmar) return;

    setLoading(true);
    try {
      if (!cartId) return;

      const response = await fetch(`${BASE_URL}/carts/${cartId}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("No se pudo eliminar el producto");

      fetchCarrito(cartId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Vaciar carrito
  const vaciarCarrito = async (confirm) => {
    if (confirm) {
      const confirmar = await confirmarAccion("¿Quieres eliminar este producto del carrito?");
      if (!confirmar) return;
    }

    if (!cartId) return;

    try {
      const response = await fetch(`${BASE_URL}/carts/${cartId}/empty`, { method: "DELETE" });

      if (!response.ok) throw new Error("No se pudo vaciar el carrito");

      setCarrito([]);
    } catch (err) {
      setError(err.message);
    }
  };


  //* ✅ Otras funciones del CartContext (manteniendo las originales)

  useEffect(() => {
    if (cartId) {
      fetchCarrito(cartId);
    }
  }, [cartId]);

  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDarkMode = (mode) => {
    setDarkMode(mode);
    localStorage.setItem("darkMode", mode);
    if (mode === "system") {
      onWindowMatch();
    }
  };

  function onWindowMatch() {
    if (localStorage.darkMode === "dark" || (!("darkMode" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
      setCarouselTheme("dark");
    } else {
      element.classList.remove("dark");
      setCarouselTheme("light");
    }
  }

  useEffect(() => {
    switch (darkMode) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("darkMode", "dark");
        setCarouselTheme("dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("darkMode", "light");
        setCarouselTheme("light");
        break;
      case "system":
        localStorage.removeItem("darkMode");
        onWindowMatch();
        break;
      default:
        break;
    }
  }, [darkMode]);

  useEffect(() => {
    darkQuery.addEventListener("change", onWindowMatch);
    return () => {
      darkQuery.removeEventListener("change", onWindowMatch);
    };
  }, []);

  const handleChangeCantidad = (event) => {
    const value = parseInt(event.target.value, 10);
    setCantidad(value);
  };

  const calcularCantidad = () => {
    return new Set(carrito.map(prod => prod.product._id)).size;
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.product.price * prod.quantity, 0).toFixed(2);
  };

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

  return (
    <CartContext.Provider
      value={{
        carrito,
        options,
        cantidad,
        cartId,
        loading,
        error,
        breadcrumb,
        viewWidth,
        categoryId,
        menuVisible,
        darkMode,
        carouselTheme,
        closeMenu,
        setBreadcrumb,
        setCantidad,
        setMenuVisible,
        setCategoryId,
        setCarouselTheme,
        handleDarkMode,
        handleChangeCantidad,
        calcularCantidad,
        calcularTotal,
        agregarAlCarrito,
        modificarCantidad,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
