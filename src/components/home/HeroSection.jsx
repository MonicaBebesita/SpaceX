// HeroSection:
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import heroImage from '../../assets/spacex-NAVE.jpg'; 

const HeroSection = () => {
  const navigate = useNavigate(); // Inicializa el hook

  const handleExploreClick = () => {
    navigate('/search-filter'); // Navega a la ruta de últimos lanzamientos
  };

  return (
    <section 
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          El Futuro del Espacio Empieza Aquí
        </h1>
        <p className="text-2xl mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Descubre los lanzamientos más recientes, misiones históricas y lo que SpaceX tiene preparado para el futuro.
        </p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in-up delay-400"
          onClick={handleExploreClick} // Añade el manejador de clic
        >
          Explorar Lanzamientos
        </button>
      </div>
    </section>
  );
};

export default HeroSection;