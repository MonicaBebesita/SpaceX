import { useEffect, useState, useRef } from 'react';
// Importa Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Importa los estilos de Swiper (core y quizás de algún módulo si lo usas)
import 'swiper/css';
import 'swiper/css/pagination'; // Si vas a usar paginación
import 'swiper/css/navigation'; // Si vas a usar botones de navegación

// Importa módulos necesarios de Swiper (ej. Navigation, Pagination, Autoplay)
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const CombinedCarouselSwiper = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga

  // Swiper te da control total sobre la instancia del slider si la necesitas
  const swiperRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia la carga
      try {
        const [dragonsRes, rocketsRes] = await Promise.all([
          fetch('https://api.spacexdata.com/v4/dragons'),
          fetch('https://api.spacexdata.com/v4/rockets'),
        ]);

        const dragonsData = await dragonsRes.json();
        const rocketsData = await rocketsRes.json();

        const formattedDragons = dragonsData.map(dragon => ({
          id: dragon.id,
          name: dragon.name,
          description: dragon.description,
          image: dragon.flickr_images[0],
          type: 'Dragon',
          link: dragon.wikipedia,
        }));

        const formattedRockets = rocketsData.map(rocket => ({
          id: rocket.id,
          name: rocket.name,
          description: rocket.description,
          image: rocket.flickr_images[0],
          type: 'Rocket',
          link: rocket.wikipedia,
        }));

        const combinedItems = [...formattedDragons, ...formattedRockets];
        combinedItems.sort(() => Math.random() - 0.5);

        let finalItems = [...combinedItems];
        while (finalItems.length < 4 && combinedItems.length > 0) {
            finalItems = [...finalItems, ...combinedItems];
        }
        
        setItems(finalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 hover:brightness-110 relative z-0">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 text-blue-400">
          Explora las Naves y Cohetes de SpaceX
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {loading ? (
            <div className="text-gray-400 text-lg py-10">Cargando naves y cohetes...</div>
          ) : items.length > 0 ? (
            <>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                spaceBetween={30} 
                centeredSlides={true} 
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                className="mySwiper overflow-hidden rounded-xl shadow-2xl"
                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay.start()}
              >
                {items.map((item, index) => (
                  <SwiperSlide key={`${item.id}-${item.type}-${index}`} className="flex justify-center items-center p-4">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center h-full max-w-sm mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover rounded-lg border-4 border-blue-600 mb-4 shadow-md"
                      />
                      <h3 className="text-2xl font-bold text-blue-300 mb-2">{item.name} ({item.type})</h3>
                      <p className="text-gray-300 text-sm mt-2 flex-grow overflow-hidden text-ellipsis">
                        {item.description.length > 150
                          ? `${item.description.slice(0, 150)}...`
                          : item.description}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
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
                className="swiper-button-prev absolute left-0 top-1/2 -translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-white w-7 h-7" />
              </button>

              <button
                className="swiper-button-next absolute right-0 top-1/2 translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next slide"
              >
                <ChevronRight className="text-white w-7 h-7" />
              </button>
            </>
          ) : (
            <div className="text-gray-400 text-lg py-10">No se pudieron cargar los elementos del carrusel.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CombinedCarouselSwiper;