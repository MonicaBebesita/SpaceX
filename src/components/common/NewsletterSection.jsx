import { useState } from "react";

const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("https://formspree.io/f/mnnvrdne", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
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
              name="email"
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
      </div>
    </section>
  );
};

export default NewsletterSection;
