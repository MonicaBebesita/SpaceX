import React, { useState, useEffect, useCallback } from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import FAQSection from '../components/home/FAQSection';
import LaunchCard from '../components/launches/LaunchCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
// Eliminamos FaSearch ya que no hay input de texto
import { FaCalendarAlt, FaRocket, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SearchFilterPage = () => {
  // Eliminamos el estado searchTerm
  // const [searchTerm, setSearchTerm] = useState('');

  const [filterYear, setFilterYear] = useState('');
  const [filterSuccess, setFilterSuccess] = useState(''); // 'success', 'failure', ''
  const [rocketsList, setRocketsList] = useState([]); // Para el filtro de cohetes (opcionalmente dinámico)
  const [filterRocket, setFilterRocket] = useState(''); // Para el filtro por cohete

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Generar la lista de años dinámicamente (ej. de 2006 al año actual + 5)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2006 + 6 }, (_, i) => 2006 + i); // Desde 2006 hasta el año actual + 5

  // Función para obtener la lista de cohetes para el filtro
  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/rockets');
        if (!response.ok) {
          throw new Error('Failed to fetch rockets');
        }
        const data = await response.json();
        setRocketsList(data);
      } catch (err) {
        console.error('Error fetching rockets for filter:', err);
      }
    };
    fetchRockets();
  }, []);

  // Función principal para buscar y filtrar
  const performSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSearchResults([]); // Limpiar resultados anteriores
    setTotalPages(1);
    setTotalResults(0);

    const query = {};
    const options = {
      page: page,
      limit: 12, // Número de resultados por página
      sort: { date_utc: -1 }, // Ordenar por fecha descendente
      populate: [
        {
          path: 'rocket',
          select: 'name'
        }
      ]
    };

    // Eliminamos la lógica de searchTerm
    /*
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { details: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    */

    if (filterYear) {
      const yearStart = new Date(`${filterYear}-01-01T00:00:00Z`).toISOString();
      const yearEnd = new Date(`${parseInt(filterYear) + 1}-01-01T00:00:00Z`).toISOString();
      query.date_utc = { $gte: yearStart, $lt: yearEnd };
    }

    if (filterSuccess !== '') {
      query.success = filterSuccess === 'success';
    }

    if (filterRocket) {
        query.rocket = filterRocket;
    }

    try {
      const response = await fetch('https://api.spacexdata.com/v5/launches/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, options }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      setSearchResults(data.docs);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalDocs);

    } catch (err) {
      console.error("Error performing search:", err);
      setError(`Error al cargar los lanzamientos: ${err.message}.`);
    } finally {
      setLoading(false);
    }
  }, [filterYear, filterSuccess, filterRocket, page]); // Dependencias actualizadas para useCallback

  // Ejecutar la búsqueda inicial y cada vez que cambian los filtros o la página
  // La búsqueda ahora se activa automáticamente al cambiar los filtros
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // handleSearchClick y handleKeyPress ya no son necesarios si no hay input de texto.
  // La paginación seguirá llamando a setPage y eso disparará performSearch.
  // handleClearFilters sigue siendo útil.

  const handleClearFilters = () => {
    // setSearchTerm(''); // Eliminado
    setFilterYear('');
    setFilterSuccess('');
    setFilterRocket('');
    setPage(1);
    // performSearch se llamará por el useEffect debido a los cambios de estado
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
      <NavigationBar />

      {/* Sección de Encabezado */}
      <header className="py-20 text-center bg-gray-950">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-purple-400">Filtrar Lanzamientos</h1>
          <p className="mt-4 text-xl text-gray-300">Refina tu búsqueda con opciones de filtro avanzadas.</p>
        </div>
      </header>

      {/* Sección de Filtros */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Filtra tu Búsqueda</h2>

          {/* Eliminamos la barra de búsqueda de texto */}
          {/*
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mb-12 items-center">
            <input
              type="text"
              placeholder="Ej. Falcon Heavy, Starlink, 2023..."
              className="flex-grow p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
            />
            <button
              onClick={handleSearchClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 flex items-center justify-center text-lg w-full md:w-auto"
            >
              <FaSearch className="mr-2" /> Buscar
            </button>
          </div>
          */}

          {/* Opciones de Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <FaCalendarAlt className="text-5xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-center">Por Año</h3>
              <select
                className="mt-4 p-3 rounded bg-gray-700 border border-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={filterYear}
                onChange={(e) => { setFilterYear(e.target.value); setPage(1); }} // Resetear página al cambiar filtro
              >
                <option value="">Todos los Años</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <FaRocket className="text-5xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-center">Por Cohete</h3>
              <select
                className="mt-4 p-3 rounded bg-gray-700 border border-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={filterRocket}
                onChange={(e) => { setFilterRocket(e.target.value); setPage(1); }} // Resetear página al cambiar filtro
              >
                <option value="">Todos los Cohetes</option>
                {rocketsList.map((rocket) => (
                  <option key={rocket.id} value={rocket.id}>
                    {rocket.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
              <FaCheckCircle className="text-5xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-center">Por Estado</h3>
              <select
                className="mt-4 p-3 rounded bg-gray-700 border border-gray-600 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={filterSuccess}
                onChange={(e) => { setFilterSuccess(e.target.value); setPage(1); }} // Resetear página al cambiar filtro
              >
                <option value="">Todos los Estados</option>
                <option value="success">Éxito</option>
                <option value="failure">Fallo</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleClearFilters}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Resultados de Búsqueda */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Lanzamientos Filtrados</h2> {/* Texto actualizado */}
          <p className="text-gray-400 mb-8">{totalResults} Lanzamientos Encontrados</p>

          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && searchResults.length === 0 && (
            <p className="text-xl text-gray-400">No se encontraron lanzamientos que coincidan con los criterios de filtro.</p>
          )}

          {!loading && !error && searchResults.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {searchResults.map((launch) => (
                  <LaunchCard key={launch.id} launch={launch} />
                ))}
              </div>

              {/* Paginación */}
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <FaChevronLeft className="mr-2" /> Anterior
                </button>
                <span className="text-xl text-gray-300">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages || loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Siguiente <FaChevronRight className="ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Maximiza tu Búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Precisión Inigualable</h3>
              <p className="text-gray-300">Obtén resultados exactos y relevantes con nuestros potentes filtros.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Análisis Profundo</h3>
              <p className="text-gray-300">Identifica tendencias y patrones en los datos de lanzamientos de SpaceX.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Sección de CTA (ajustado el texto) */}
      <section className="py-20 bg-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Comienza a Explorar</h2>
          <p className="text-xl mb-8">Usa los filtros para desenterrar información valiosa.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchFilterPage;