const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10 text-center border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p className="text-lg mb-4">© {new Date().getFullYear()} SpaceX Explorer. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Privacidad</a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Términos</a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Contacto</a>
        </div>
        <p className="text-sm text-gray-500">Hecho para los entusiastas del espacio.</p>
      </div>
    </footer>
  );
};

export default Footer;