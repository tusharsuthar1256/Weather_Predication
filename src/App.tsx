import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Weather } from './pages/Weather';
import { WaterPage } from './pages/WaterCalculator';
import { SoilPage } from './pages/SoilMoisture';
// import { LanguageProvider } from './contexts/LanguageContext';
import {} from "../src/image/irrigationImg.jpg"

function App() {
  return (
      <Router>
        <div  className="w-full pt-[64px] h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/water-calculator" element={<WaterPage />} />
            <Route path="/soil-moisture" element={<SoilPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;