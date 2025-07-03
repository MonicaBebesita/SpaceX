import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FaCalendarAlt, FaRocket, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

import defaultShipImage from '../assets/lanzamiento.jpg';

const LaunchDetailPage = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [rocket, setRocket] = useState(null);
  const [launchpad, setLaunchpad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const launchResponse = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
        if (!launchResponse.ok) {
          throw new Error(`HTTP error! Status: ${launchResponse.status}`);
        }
        const launchData = await launchResponse.json();
        setLaunch(launchData);

        const fetches = [];
        if (launchData.rocket) {
          fetches.push(
            fetch(`https://api.spacexdata.com/v4/rockets/${launchData.rocket}`)
              .then(res => {
                if (!res.ok) throw new Error(`Rocket fetch error! Status: ${res.status}`);
                return res.json();
              })
              .then(data => setRocket(data))
          );
        }
        if (launchData.launchpad) {
          fetches.push(
            fetch(`https://api.spacexdata.com/v4/launchpads/${launchData.launchpad}`)
              .then(res => {
                if (!res.ok) throw new Error(`Launchpad fetch error! Status: ${res.status}`);
                return res.json();
              })
              .then(data => setLaunchpad(data))
          );
        }

        await Promise.all(fetches);

      } catch (err) {
        console.error("Error fetching launch details:", err);
        setError("No se pudieron cargar los detalles de este lanzamiento. Por favor, verifica la ID o tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLaunchDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
        <NavigationBar />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
        <NavigationBar />
        <ErrorMessage message={error} />
        <Footer />
      </div>
    );
  }

  if (!launch) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
        <NavigationBar />
        <ErrorMessage message="No se encontró información para este lanzamiento." />
        <Footer />
      </div>
    );
  }

  const launchDate = new Date(launch.date_utc).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const featuredImage = launch.links.flickr.original.length > 0
    ? launch.links.flickr.original[0]
    : launch.links.flickr.small.length > 0
      ? launch.links.flickr.small[0]
      : defaultShipImage; 

  const youtubeEmbedUrl = launch.links.webcast
    ? `https://www.youtube.com/embed/${launch.links.webcast.split('v=')[1] || launch.links.webcast.split('/').pop().split('?')[0]}`
    : null;

  const statusColor = launch.success ? 'text-green-400' : (launch.success === false ? 'text-red-400' : 'text-yellow-400');
  const statusText = launch.success ? 'Éxito' : (launch.success === false ? 'Fallo' : 'Desconocido');
  const statusIcon = launch.success ? <FaCheckCircle /> : (launch.success === false ? <FaTimesCircle /> : <FaInfoCircle />);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans pt-16">
      <NavigationBar />

      <header className="py-20 text-center bg-gray-950">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            {launch.name}
          </h1>
          <p className="mt-4 text-xl text-gray-300 flex items-center justify-center">
            <FaCalendarAlt className="mr-2" /> {launchDate}
          </p>
        </div>
      </header>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img
              src={featuredImage}
              alt={launch.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg mb-8"
            />
            <h2 className="text-3xl font-bold mb-4 text-white">Descripción de la Misión</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {launch.details || `Detalles para el lanzamiento "${launch.name}" no disponibles.`}
            </p>
            <ul className="text-lg text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-blue-300 flex items-center">
                  <FaRocket className="mr-2" /> Cohete:
                </span>{' '}
                {rocket ? rocket.name : 'Cargando...'}
              </li>
              <li>
                <span className="font-semibold text-blue-300 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Sitio de Lanzamiento:
                </span>{' '}
                {launchpad ? `${launchpad.name} (${launchpad.locality})` : 'Cargando...'}
              </li>
              <li>
                <span className="font-semibold text-blue-300 flex items-center">
                  Carga(s) Útil(es):
                </span>{' '}
                {launch.payloads.length > 0 ? launch.payloads.length : 'Ninguna especificada'}
              </li>
            </ul>
          </div>

          <div>
            {youtubeEmbedUrl ? (
              <>
                <h2 className="text-3xl font-bold mb-4 text-white">Video del Lanzamiento</h2>
                <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={youtubeEmbedUrl}
                    title={`Video de Lanzamiento de ${launch.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            ) : (
              <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md mb-8">
                <p className="text-xl text-gray-400">No hay video disponible para este lanzamiento.</p>
              </div>
            )}

            <h2 className="text-3xl font-bold mb-4 text-white">Estado del Lanzamiento</h2>
            <p className={`text-2xl font-bold mb-6 flex items-center ${statusColor}`}>
              {statusIcon} <span className="ml-3">Estado: {statusText}</span>
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {launch.failures && launch.failures.length > 0 ? (
                `Razón del fallo: ${launch.failures[0].reason}`
              ) : (
                'Este lanzamiento se completó como se esperaba.'
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Sigue Explorando</h2>
          <p className="text-xl mb-8">Descubre más lanzamientos y misiones espaciales.</p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/latest-launches"
              className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
            >
              Ver Otros Lanzamientos
            </Link>
            <Link
              to="/future-missions"
              className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
            >
              Explorar Misiones Futuras
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LaunchDetailPage;