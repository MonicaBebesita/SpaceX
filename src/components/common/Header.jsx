import logo from '../../assets/logo.svg';


const Header = () => {
  return (
    <header className="relative text-white py-20 text-center">
      <div className="container mx-auto">
        <img src={logo} alt="Logo SpaceX" className="mx-auto mb-6 w-24 h-24" />
        <h1 className="text-5xl font-extrabold tracking-tight">Explora el Universo SpaceX</h1>
        <p className="mt-4 text-xl text-gray-300">Tu puerta de entrada a los viajes espaciales de vanguardia.</p>
      </div>
    </header>
  );
};

export default Header;