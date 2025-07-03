import { useNavigate } from 'react-router-dom'; 

const CTASection = () => {
  const navigate = useNavigate(); 

  const handleExploreClick = () => {
    navigate('/latest-launches'); 
  };

  return (
      <section className="py-20 bg-blue-700 text-white text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:brightness-110 relative z-0">
        <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">¿Listo para Explorar el Cosmos?</h2>
        <p className="text-xl mb-8">No te pierdas los hitos más emocionantes de la exploración espacial.</p>
        <button
          className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
          onClick={handleExploreClick} 
        >
          Explorar Nuestra Tripulación
        </button>
      </div>
    </section>
  );
};

export default CTASection;