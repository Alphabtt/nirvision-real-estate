import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProperties from './components/FeaturedProperties';
import Stats from './components/Stats';
import Excellence from './components/Excellence';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={loading} />
      
      {!loading && (
        <div className="fade-in-content">
          <Navbar />
          <main>
            <Hero />
            <About />
            <FeaturedProperties />
            <Stats />
            <Excellence />
            <Testimonials />
            <Newsletter />
          </main>
          <Footer />
          <FloatingActions />
        </div>
      )}
    </>
  );
}

export default App;
