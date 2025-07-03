const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Características Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Lanzamientos en Tiempo Real</h3>
            <p className="text-gray-300">Accede a información detallada sobre los últimos lanzamientos de SpaceX tan pronto como suceden.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Misiones Futuras</h3>
            <p className="text-gray-300">Mantente al tanto de las próximas misiones y los ambiciosos planes de SpaceX para el espacio.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Búsqueda Avanzada</h3>
            <p className="text-gray-300">Encuentra lanzamientos específicos por fecha, misión o estado con potentes filtros.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;