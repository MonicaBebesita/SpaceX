import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Loader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <p className="ml-4 text-lg text-gray-400">Cargando tripulación...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-10 text-red-500 text-lg">
    <p>{message}</p>
  </div>
);

const CrewCarousel = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null); 

  useEffect(() => {
    const fetchCrewData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.spacexdata.com/v4/crew');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const filteredCrew = data.filter(member => member.image && member.launches && member.launches.length > 0);
        setCrewMembers(filteredCrew);
      } catch (err) {
        console.error("Error fetching crew data:", err);
        setError("No se pudo cargar la información de la tripulación. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrewData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (crewMembers.length === 0) {
    return <p className="text-xl text-gray-400 text-center py-10">No se encontraron miembros de la tripulación.</p>;
  }

  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-blue-400">Conoce a la Tripulación de SpaceX</h2>
        <p className="text-gray-300 text-lg mb-8">Descubre a los astronautas y tripulantes que han volado en misiones de SpaceX.</p>

        <div className="relative max-w-6xl mx-auto">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Navigation]}
            loop={true}
            spaceBetween={30} 
            centeredSlides={true} 
            autoplay={{
              delay: 4000,
              disableOnInteraction: false, 
            }}
            breakpoints={{
              0: { // Para pantallas muy pequeñas 
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: { // Para tablets
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: { // Para pantallas grandes 
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: '.crew-swiper-button-next', 
              prevEl: '.crew-swiper-button-prev', 
            }}
            className="mySwiper overflow-hidden rounded-xl shadow-2xl"
            onMouseEnter={() => swiperRef.current?.autoplay.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay.start()}
          >
            {crewMembers.map((member) => (
              <SwiperSlide key={member.id} className="flex justify-center items-center p-4">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center h-full max-w-sm mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg border-4 border-blue-600 mb-4 shadow-md"
                    // Fallback para imágenes rotas
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/334155/E2E8F0?text=Imagen+no+disponible'; }}
                  />
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">Agencia: {member.agency}</p>
                  <div className="text-gray-300 text-sm text-left w-full max-h-24 overflow-y-auto custom-scrollbar">
                    <p className="font-semibold mb-1">Misiones:</p>
                    <ul className="list-disc list-inside">
                      {member.launches.map((launch, idx) => (
                        <li key={idx}>{launch}</li>
                      ))}
                    </ul>
                  </div>
                  {member.wikipedia && (
                    <a
                      href={member.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                    >
                      Más información
                    </a>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="crew-swiper-button-prev absolute left-0 top-1/2 -translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous crew member"
          >
            <ChevronLeft className="text-white w-7 h-7" />
          </button>

          <button
            className="crew-swiper-button-next absolute right-0 top-1/2 translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next crew member"
          >
            <ChevronRight className="text-white w-7 h-7" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CrewCarousel;
