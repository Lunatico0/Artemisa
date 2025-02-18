import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { logoWhatsapp, logoInstagram } from 'ionicons/icons';

const Footer = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('redes-sociales');
  const footerRef = useRef(null);

  const ocultarFooter = () => {
    setFooterVisible(false);
    setActiveTab('redes-sociales');
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mostrarFooter = () => {
    setFooterVisible(true);
  };

  const handleClickOutside = (event) => {
    if (footerRef.current && !footerRef.current.contains(event.target)) {
      ocultarFooter();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`fixed left-0 w-full py-2 z-10
        bg-bgFooter text-textLight
        transition-all duration-300 ease-in-out
        ${footerVisible ? 'bottom-0' : '-bottom-28'}`
      }
    >
      {/* Controles para cambiar de pestañas */}
      <div className="flex justify-evenly border-b pb-2
      border-gray-500
      md:justify-center md:gap-6">
        {[
          { key: "redes-sociales", label: "Redes Sociales" },
          { key: "nosotros", label: "Nosotros" },
          { key: "navegacion", label: "Navegación" },
          { key: "contacto", label: "Contacto" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              mostrarFooter();
            }}
            className={`
              rounded-t transition duration-200 text-nowrap
              px-2 py-1 md:px-4 md:py-2 lg:size-2/12
              ${activeTab === tab.key ? "bg-principal text-white" : "hover:bg-gray-700"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de cada pestaña */}
      <div className="mt-2 text-center">
        {activeTab === "redes-sociales" && (
          <div className="flex justify-center gap-4">
            <a href="https://wa.me/+543435578195" target="_blank" className="text-3xl text-textLight">
            <IonIcon icon={logoWhatsapp} />
            </a>
            <a href="https://www.instagram.com/artemisapvc/" target="_blank" className="text-3xl text-textLight">
            <IonIcon icon={logoInstagram} />
            </a>
          </div>
        )}

        {activeTab === "nosotros" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold">About Us</h2>
            <p>Vestimos tu hogar con la mejor calidad, calidez y delicadeza</p>
          </div>
        )}

        {activeTab === "navegacion" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <NavLink to="/" onClick={scrollTop} className="block text-textLight hover:text-gray-300">
              Inicio
            </NavLink>
          </div>
        )}

        {activeTab === "contacto" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:contacto@artemisa-pvc.com" className="text-textLight hover:text-gray-300">contacto@artemisa-pvc.com</a></li>
              <li>Instagram: <a href="https://www.instagram.com/artemisapvc/" className="text-textLight hover:text-gray-300">@artemisapvc</a></li>
              <li>Whatsapp: <a href="https://wa.me/+543435578195" className="text-textLight hover:text-gray-300">Carolina</a></li>
              <li>Telefono: <a href="tel:+543435578195" className="text-textLight hover:text-gray-300">+543435578195</a></li>
            </ul>
          </div>
        )}
      </div>

      {/* Footer Bottom */}
      <div className="mt-4 border-t border-gray-500 pt-2 text-center">
        © 2025 <span className="text-textoLogo">ARTEMISA</span> | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
