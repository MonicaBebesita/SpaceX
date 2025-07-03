const BenefitsSection = () => {
  return (
    <section className="py-20 bg-black text-white ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Beneficios de Usar Nuestra App</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Tecnología de Punta</h3>
            <p className="text-gray-300">Utilizamos las últimas tecnologías web para ofrecerte una experiencia fluida y reactiva.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Diseño Intuitivo</h3>
            <p className="text-gray-300">Nuestra interfaz está diseñada para ser hermosa y fácil de usar, haciendo que la exploración espacial sea accesible para todos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;