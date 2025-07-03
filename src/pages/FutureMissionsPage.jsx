import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import NewsletterSection from '../components/common/NewsletterSection';
import FAQSection from '../components/home/FAQSection';
import LaunchCard from '../components/launches/LaunchCard'; // Reutilizar LaunchCard
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { Link } from 'react-router-dom'; // Para el CTA

const FutureMissionsPage = () => {
  const [futureMissions, setFutureMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFutureMissions = async () => {
      try {
        setLoading(true);
        setError(null);
        // Endpoint para misiones futuras
        const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Opcional: ordenar por fecha ascendente para las próximas misiones
        const sortedData = data.sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));
        setFutureMissions(sortedData);
      } catch (err) {
        console.error("Error fetching future missions:", err);
        setError("No se pudieron cargar las misiones futuras. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchFutureMissions();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
      <NavigationBar />

      {/* Sección de Encabezado */}
      <header className="py-20 text-center bg-gray-950">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-green-400">Próximas Misiones de SpaceX</h1>
          <p className="mt-4 text-xl text-gray-300">Un vistazo al futuro de la exploración espacial.</p>
        </div>
      </header>

      {/* Sección de Lista de Misiones Futuras */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10 text-green-300">Explora lo que Viene</h2>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && futureMissions.length === 0 && (
            <p className="text-xl text-gray-400">No hay misiones futuras programadas en este momento.</p>
          )}
          {!loading && !error && futureMissions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
              {futureMissions.map((mission) => (
                <LaunchCard key={mission.id} launch={mission} /> // Reutilizamos LaunchCard
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de Beneficios (mantener o ajustar contenido) */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Beneficios de Seguir las Misiones Futuras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Inspiración Innovadora</h3>
              <p className="text-gray-300">Sé testigo de cómo SpaceX empuja los límites de la tecnología y la exploración.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Conocimiento Exclusivo</h3>
              <p className="text-gray-300">Accede a detalles sobre misiones que darán forma al futuro de la humanidad en el espacio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de CTA */}
      <section className="py-20 bg-green-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">¿Preparado para el Mañana?</h2>
          <p className="text-xl mb-8">No te pierdas los próximos hitos en la conquista del espacio.</p>
          <Link
            to="/latest-launches" // Un CTA para volver a los últimos lanzamientos
            className="bg-white text-green-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 inline-block"
          >
            Ver Últimos Lanzamientos
          </Link>
        </div>
      </section>

      <NewsletterSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default FutureMissionsPage;