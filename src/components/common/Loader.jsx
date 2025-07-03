import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-xl ml-4 text-gray-400">Cargando lanzamientos...</p>
    </div>
  );
};

export default Loader;