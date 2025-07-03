import { useState } from "react";
import emailjs from '@emailjs/browser'; // Importa EmailJS

const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false); // Para manejar errores

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userEmail = form.email.value; // Obtén el valor del email

    // Tus IDs de EmailJS (reemplaza con los tuyos)
    const serviceId = 'service_dwpbzfj';   
    const templateId = 'template_4bzgtqt';  
    const publicKey = 'NKA20lMOHcyc85EBr';   

    const templateParams = {
      email: userEmail, 
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Correo enviado exitosamente!', response.status, response.text);
        setSubmitted(true);
        setError(false); // Reinicia el estado de error
        form.reset(); // Limpia el formulario
      })
.catch((err) => {
  console.error('Fallo al enviar el correo:', err);
  if (err?.text) {
    console.error('Detalles del error:', err.text);
  } else if (err?.message) {
    console.error('Mensaje del error:', err.message);
  } else {
    console.error('Error completo:', JSON.stringify(err, null, 2));
  }
  setError(true);
  setSubmitted(false);
});
  };

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">Suscríbete a Nuestro Boletín</h2>
        <p className="text-xl mb-8">
          Recibe las últimas noticias, actualizaciones y lanzamientos directamente en tu bandeja de entrada.
        </p>

        {submitted ? (
          <div className="bg-green-600 text-white p-4 rounded-lg font-medium transition">
            ¡Gracias por suscribirte!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              name="email" // Asegúrate de que el name sea 'email' para accederlo fácilmente
              placeholder="Tu correo electrónico"
              required
              className="flex-grow p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300"
            >
              Suscribirse
            </button>
          </form>
        )}

        {error && ( // Muestra el mensaje de error si hay un problema
          <div className="bg-red-600 text-white p-4 rounded-lg font-medium mt-4 transition">
            Hubo un error al suscribirte. Por favor, inténtalo de nuevo.
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;