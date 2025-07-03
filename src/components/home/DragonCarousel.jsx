import { useEffect, useState, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CombinedCarousel = () => {
  const [items, setItems] = useState([]);
  const timerRef = useRef(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1, 
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2, 
          spacing: 25,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 2, 
          spacing: 30,
        },
      },
    },
    created(sliderInstance) {
      timerRef.current = setInterval(() => {
        sliderInstance.next();
      }, 4000);
    },
  });

  const pauseAutoplay = () => clearInterval(timerRef.current);  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      slider.current?.next();
    }, 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
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
          finalItems.push(...combinedItems);
        }
        
        setItems(finalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 text-blue-400">
          Explora las Naves y Cohetes de SpaceX
        </h2>

        <div
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          className="relative max-w-6xl mx-auto"
        >
          <div ref={sliderRef} className="keen-slider overflow-hidden rounded-xl shadow-2xl">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${item.type}-${index}`} // Unique key for each item
                className="keen-slider__slide flex justify-center items-center p-4"
              >
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
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {slider.current && (
            <>
              <button
                onClick={() => slider.current?.prev()}
                className="absolute left-0 top-1/2 -translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-white w-7 h-7" />
              </button>

              <button
                onClick={() => slider.current?.next()}
                className="absolute right-0 top-1/2 translate-x-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 hover:bg-opacity-90 p-4 rounded-full shadow-lg transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next slide"
              >
                <ChevronRight className="text-white w-7 h-7" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CombinedCarousel;