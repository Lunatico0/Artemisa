import { useEffect, useState } from 'react'
import './style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ItemListContainer from './components/ItemListContainer';
import NotFound from './components/NotFound';
import Footer from './components/footer/Footer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {

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

  return (
    <BrowserRouter>
      <div className="generalCont">
        <div className="container">
          <div className="contenido">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/productos' element={<ItemListContainer />} />
              <Route path='/category/:categoryId' element={<ItemListContainer />} />
              <Route path='/item/:id' element={<ItemDetailContainer />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
