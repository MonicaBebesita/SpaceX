import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LatestLaunchesPage from './pages/LatestLaunchesPage';
import FutureMissionsPage from './pages/FutureMissionsPage';
import SearchFilterPage from './pages/SearchFilterPage';
import LaunchDetailPage from './pages/LaunchDetailPage'; 
import ScrollToTop from './components/common/ScrollToTop';
import { ParallaxProvider } from 'react-scroll-parallax';
import './App.css'; 
function App() {
  return (
    <Router>
      <ParallaxProvider>
        <ScrollToTop /> 
        <div className="bg-gray-900 text-white min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/latest-launches" element={<LatestLaunchesPage />} />
            <Route path="/future-missions" element={<FutureMissionsPage />} />
            <Route path="/search-filter" element={<SearchFilterPage />} />
            <Route path="/launch/:id" element={<LaunchDetailPage />} />
          </Routes>
        </div>
      </ParallaxProvider>
    </Router>
  );
}

export default App;