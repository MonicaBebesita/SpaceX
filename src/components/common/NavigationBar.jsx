// src/components/common/NavigationBar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // CAMBIOS CLAVE AQUÍ: 'fixed top-0 left-0 w-full z-50'
    <nav className="bg-gray-900 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition duration-300">
          SpaceX Hub
        </Link>

        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-300 transition duration-300 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/latest-launches"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-300 transition duration-300 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
            }
          >
            Últimos Lanzamientos
          </NavLink>
          <NavLink
            to="/future-missions"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-300 transition duration-300 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
            }
          >
            Misiones Futuras
          </NavLink>
          <NavLink
            to="/search-filter"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-300 transition duration-300 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
            }
          >
            Búsqueda y Filtros
          </NavLink>
          {/* Añadir más enlaces si tienes, por ejemplo:
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-300 transition duration-300 ${isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`
            }
          >
            Sobre Nosotros
          </NavLink>
          */}
        </div>

        {/* Botón de hamburguesa para pantallas pequeñas */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-xl py-2">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block px-4 py-2 text-lg text-white hover:bg-gray-700 transition duration-300"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/latest-launches"
            onClick={toggleMenu}
            className="block px-4 py-2 text-lg text-white hover:bg-gray-700 transition duration-300"
          >
            Últimos Lanzamientos
          </NavLink>
          <NavLink
            to="/future-missions"
            onClick={toggleMenu}
            className="block px-4 py-2 text-lg text-white hover:bg-gray-700 transition duration-300"
          >
            Misiones Futuras
          </NavLink>
          <NavLink
            to="/search-filter"
            onClick={toggleMenu}
            className="block px-4 py-2 text-lg text-white hover:bg-gray-700 transition duration-300"
          >
            Búsqueda y Filtros
          </NavLink>
          {/* Añadir más enlaces móviles aquí */}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;