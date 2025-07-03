import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import NewsletterSection from '../components/common/NewsletterSection';
import { Link } from 'react-router-dom';
import FAQSection from '../components/home/FAQSection';
import LaunchCard from '../components/launches/LaunchCard'; // Importar LaunchCard

// Importar Loader y Error (los crearemos si no los tienes)
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Importar el nuevo componente CrewCarousel
import CrewCarousel from '../components/home/CrewCarousel'; 

const LatestLaunchesPage = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.spacexdata.com/v5/launches/past');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ordenar por fecha descendente para los "últimos" lanzamientos
        const sortedData = data.sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc));
        // Limitar a los 10 lanzamientos más recientes
        setLaunches(sortedData.slice(0, 5)); 
      } catch (err) {
        console.error("Error fetching latest launches:", err);
        setError("No se pudieron cargar los últimos lanzamientos. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar el componente

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
      <NavigationBar />

      {/* Sección de Encabezado */}
      <header className="py-20 text-center bg-gray-950">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-blue-400">Últimos Lanzamientos</h1>
          <p className="mt-4 text-xl text-gray-300">Mantente al día con los eventos más recientes de SpaceX.</p>
        </div>
      </header>

      {/* Sección de Lista de Portafolio */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Explora los Recientes Viajes al Espacio</h2>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && launches.length === 0 && (
            <p className="text-xl text-gray-400">No se encontraron lanzamientos recientes.</p>
          )}
          {!loading && !error && launches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {launches.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección del Carrusel de la Tripulación (Reemplaza la Galería de Momentos) */}
      <CrewCarousel />

      {/* Sección de Testimonios (Mantener placeholders o hacerlos dinámicos si se desea) */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Voces de la Exploración</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl italic">
              <p className="text-gray-300 mb-4">"SpaceX está redefiniendo los límites de lo posible. Cada lanzamiento es una inspiración."</p>
              <p className="font-semibold text-blue-400">- Dr. Emily Carter, Astrónoma</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl italic">
              <p className="text-gray-300 mb-4">"Es emocionante seguir la evolución de la tecnología espacial. Esta app lo hace sencillo y visual."</p>
              <p className="font-semibold text-blue-400">- Alex Rivera, Entusiasta Espacial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">¿Quieres Más Detalles?</h2>
          <p className="text-xl mb-8">Haz clic en cualquier lanzamiento para ver su información completa.</p>
          {/* El botón de CTA debe llevar a la página de misiones futuras */}
          <Link
            to="/future-missions"
            className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 inline-block"
          >
            Explorar Misiones Futuras
          </Link>
        </div>
      </section>

      <NewsletterSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LatestLaunchesPage;
