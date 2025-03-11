import { createContext, useState, useEffect } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  const [dataWhithPagination, setDataWPagination] = useState('')

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    subsubcategory: null,
    sort: null,
    search: null,
    limit: 24,
  });

  const fetchData = async (endpoint, setData, responseKey = "payload", useFilters = true) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/${endpoint}`;

      if (useFilters) {
        const filterParams = { ...filters };

        Object.keys(filterParams).forEach((key) => {
          if (filterParams[key] === null || filterParams[key] === "") {
            delete filterParams[key];
          }
        });

        const params = new URLSearchParams(filterParams).toString();
        url = `${url}?${params}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.status === "success") {
        // Multiplicar el precio de cada producto por 1.4
        const updatedData = data[responseKey].map(product => ({
          ...product,
          price: product.price * 1.4
        }));

        setDataWPagination({ ...data, [responseKey]: updatedData });
        setData(updatedData);
      } else {
        throw new Error(data.message || "Error fetching data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketById = async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/carts/purchase/${ticketId}`);
      const data = await response.json();

      if (response.ok) {
        return data.ticket; // 🔥 Retorna solo el ticket
      } else {
        throw new Error(data.message || "Error fetching ticket");
      }
    } catch (err) {
      console.error("Fetch Ticket Error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const fetchProductById = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        return data.product;
      } else {
        throw new Error(data.message || "Error fetching product");
      }
    } catch (err) {
      console.error("Fetch Product Error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = () => fetchData("products", setProducts);
  const fetchCategories = () => fetchData("products/categories", setCategories, "categories", false);
  const fetchUsers = () => fetchData("users", setUsers, "users", false);
  const fetchCarts = () => fetchData("carts", setCarts, "carts", false);

  // Apply filters
  const applyFilters = (newFilters) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters, ...newFilters };

      return updatedFilters;
    });
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchCategories(); // Load categories on mount
    fetchProducts();   // Load products with default filters
  }, []);

  useEffect(() => {
    fetchProducts(); // Refetch products when filters change
  }, [filters]);

  return (
    <ApiContext.Provider
      value={{
        products,
        categories,
        users,
        carts,
        filters,
        loading,
        error,
        dataWhithPagination,
        fetchTicketById,
        applyFilters,
        fetchProductById,
        fetchCategories,
        fetchUsers,
        fetchCarts,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
