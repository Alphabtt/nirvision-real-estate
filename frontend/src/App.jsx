import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientProvider } from './context/ClientContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Properties from './pages/Properties';
import Flats from './pages/Flats';
import Land from './pages/Land';
import Rent from './pages/Rent';
import TheBrand from './pages/TheBrand';
import Bespoke from './pages/Bespoke';
import InteriorDesign from './pages/InteriorDesign';
import FacilityMaintenance from './pages/FacilityMaintenance';
import NewsEvents from './pages/NewsEvents';
import Career from './pages/Career';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ClientProvider>
      <Router>
        <ScrollToTop />
        <Preloader isLoading={loading} />
        
        {!loading && (
          <div className="fade-in-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/flats" element={<Flats />} />
              <Route path="/properties/land" element={<Land />} />
              <Route path="/properties/rent" element={<Rent />} />
              <Route path="/about" element={<TheBrand />} />
              <Route path="/excellence" element={<Bespoke />} />
              <Route path="/interior-design" element={<InteriorDesign />} />
              <Route path="/facility-maintenance" element={<FacilityMaintenance />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/career" element={<Career />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            <Footer />
            <FloatingActions />
          </div>
        )}
      </Router>
    </ClientProvider>
  );
}

export default App;
