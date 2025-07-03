import React, { useState, useEffect, useRef } from 'react';
import ShootingStars from './ShootingStars'; 

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4 px-2 md:px-4 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:-translate-y-[2px] hover:bg-gray-800/60 hover:backdrop-blur-sm hover:brightness-110 relative z-0 rounded-md">
      <button
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-white hover:text-blue-400 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span
          className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`}
        >
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-300 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const sectionRef = useRef(null); 

  const faqs = [
    {
      question: "¿Cómo obtienen los datos de SpaceX?",
      answer: "Utilizamos la API pública de SpaceX para obtener toda la información sobre lanzamientos y misiones, asegurando la precisión y actualidad de los datos."
    },
    {
      question: "¿Es gratuita la aplicación?",
      answer: "Sí, nuestra aplicación es completamente gratuita para acceder a la información de SpaceX."
    },
    {
      question: "¿Con qué frecuencia se actualiza la información?",
      answer: "La información se actualiza en tiempo real a medida que la API de SpaceX proporciona nuevos datos."
    },
    {
      question: "¿Por qué las misiones futuras y los ultimos lanzamientos no muestran fechas más allá de 2022?",
      answer: "Esto se debe a que la API pública de SpaceX actualmente no está actualizada con los lanzamientos más recientes. Una vez que la API se actualice, la aplicación reflejará las nuevas fechas automáticamente."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowAnimation(true); 
          } else {
            // setShowAnimation(false);
          }
        });
      },
      {
        threshold: 0.5, // La animación se activa cuando el 50% de la sección es visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); 

  return (
    <section ref={sectionRef} className="py-20 bg-gray-950 text-white relative overflow-hidden">
      {showAnimation && <ShootingStars />} 
      <div className="container mx-auto px-4 relative z-10"> 
        <h2 className="text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;