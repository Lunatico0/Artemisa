import { useContext } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartContext, CartProvider } from './context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import Carrito from './components/Carrito';
import ItemListContainer from './components/products/ItemListContainer.jsx';
import ItemDetailContainer from './components/products/ItemDetailContainer.jsx';
import NotFound from './components/NotFound';
import Footer from './components/footer/Footer';
import Carrusel from './components/Carrusel';
import CheckOut from './components/purchase/CheckOut.jsx';
// import CargarProductos from './components/CargarProductos';
import Ticket from './components/purchase/Ticket.jsx';

function AppContent() {
  return (
    <BrowserRouter>
      <div
        className={`fixed min-h-screen inset-0 -z-10 bg-cover bg-center
          dark:bg-[url(/assets/background/marmolNegro.avif)]
          bg-[url(/assets/background/marmolBlanco.jpg)]
          `}
      ></div>
      <div className="md:w-full md:mx-auto w-full">
        <div className="text-textDark h-screen mx-auto">
          <div className="contenido">
            <ToastContainer theme="dark" stacked autoClose={3000} position="bottom-right" />
            <Header />
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/productos' element={<ItemListContainer />} />

              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/category/:categoryId/subcategory/:subcategoryId" element={<ItemListContainer />} />
              <Route path="/category/:categoryId/subcategory/:subcategoryId/subsubcategory/:subsubcategoryId" element={<ItemListContainer />} />

              <Route path='/item/:id' element={<ItemDetailContainer />} />
              <Route path='/carrito' element={<Carrito />} />
              <Route path='/finalizar-compra' element={<CheckOut />} />
              {/* <Route path='/cargar-productos' element={<CargarProductos />} /> */}
              <Route path="/ticket/:ticketId" element={<Ticket />} />
              <Route path='/carrusel' element={<Carrusel />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
