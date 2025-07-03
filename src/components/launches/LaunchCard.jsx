import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRocket, FaInfoCircle } from 'react-icons/fa';

import defaultShipImage from '../../assets/lanzamiento.jpg'; 

const LaunchCard = ({ launch }) => {
  const launchDate = new Date(launch.date_utc).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statusText = launch.success === true ? 'Éxito' : (launch.success === false ? 'Fallo' : 'Programado');
  const statusColor = launch.success === true ? 'text-green-400' : (launch.success === false ? 'text-red-400' : 'text-yellow-400');
  const statusIcon = <FaInfoCircle />; // Un icono genérico para todas las tarjetas, o puedes añadir lógica si quieres iconos de éxito/fallo

  // Usar la imagen de parche, o flickr, o el placeholder local
  const cardImage = launch.links.patch.small ||
                    (launch.links.flickr.small && launch.links.flickr.small[0]) ||
                    (launch.links.flickr.original && launch.links.flickr.original[0]) ||
                    defaultShipImage; // Usar la imagen local como último fallback

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 p-6 flex flex-col justify-between border border-gray-700">
      <div>
        <img
          src={cardImage}
          alt={launch.name}
          className="w-24 h-24 mx-auto mb-4 object-contain rounded-full border-2 border-green-500 p-1 bg-gray-700" // Cambiado a verde para futuras
        />
        <h3 className="text-2xl font-semibold mb-2 text-green-400 text-center">{launch.name}</h3>
        <p className="text-gray-400 text-sm flex items-center justify-center mb-2">
          <FaCalendarAlt className="mr-2" /> Fecha: {launchDate}
        </p>
        <p className={`text-sm font-medium flex items-center justify-center ${statusColor}`}>
          {statusIcon} <span className="ml-2">Estado: {statusText}</span>
        </p>
        <p className="text-gray-300 text-center mt-4 text-sm line-clamp-3">
          {"Detalles de la misión próximos a ser revelados."}
        </p>
      </div>
      <Link
        to={`/launch/${launch.id}`}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 block text-lg"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default LaunchCard;