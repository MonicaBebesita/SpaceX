import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LatestLaunchesPage from './pages/LatestLaunchesPage';
import FutureMissionsPage from './pages/FutureMissionsPage';
import SearchFilterPage from './pages/SearchFilterPage';
import LaunchDetailPage from './pages/LaunchDetailPage'; 

import './App.css'; // Puedes mantenerlo si lo usas para estilos globales no Tailwind

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/latest-launches" element={<LatestLaunchesPage />} />
          <Route path="/future-missions" element={<FutureMissionsPage />} />
          <Route path="/search-filter" element={<SearchFilterPage />} />
          <Route path="/launch/:id" element={<LaunchDetailPage />} /> {/* Ruta para detalles de lanzamiento */} 
        </Routes>
      </div>
    </Router>
  );
}

export default App;