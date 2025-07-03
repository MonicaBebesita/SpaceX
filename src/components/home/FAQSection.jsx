import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-white hover:text-blue-400 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="text-2xl">{isOpen ? '-' : '+'}</span>
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

  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-4">
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