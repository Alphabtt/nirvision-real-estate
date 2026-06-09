import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const properties = [
  {
    id: 1,
    name: "Seraphina Residences",
    location: "Gulshan, Dhaka",
    type: "Residential",
    imgDay: "/images/hero-building.png",
    imgNight: "/images/building-night.png"
  },
  {
    id: 2,
    name: "Aurelia Heights",
    location: "Banani, Dhaka",
    type: "Condominium",
    imgDay: "/images/property-villa.png",
    imgNight: "/images/property-penthouse.png"
  },
  {
    id: 3,
    name: "The Pinnacle Tower",
    location: "Motijheel, Dhaka",
    type: "Commercial",
    imgDay: "/images/property-commercial.png",
    imgNight: "/images/building-night.png"
  },
  {
    id: 4,
    name: "Celestia Gardens",
    location: "Uttara, Dhaka",
    type: "Residential",
    imgDay: "/images/property-penthouse.png",
    imgNight: "/images/property-villa.png"
  }
];

const FeaturedProperties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setCardsPerView(3);
      else if (window.innerWidth > 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalDots = Math.max(1, properties.length - cardsPerView + 1);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, totalDots - 1));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="properties" className="properties-section">
      <div className="properties-container">
        <motion.div 
          className="section-header"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <span className="section-tag">Featured Projects</span>
          <h2 className="section-title">Latest Launches</h2>
        </motion.div>

        <motion.div 
          className="properties-slider"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <div className="properties-track" style={{ 
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            transition: 'transform 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)'
          }}>
            {properties.map((prop) => (
              <div key={prop.id} className="property-card" style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                <a href="#" className="property-link">
                  <div className="property-media">
                    <img src={prop.imgDay} alt={prop.name} className="property-img property-img-day" />
                    <img src={prop.imgNight} alt={`${prop.name} Night`} className="property-img property-img-night" />
                    <div className="property-overlay"></div>
                    <span className="property-type">{prop.type}</span>
                  </div>
                  <div className="property-info">
                    <h3 className="property-name">{prop.name}</h3>
                    <div className="property-location">
                      <MapPin size={16} />
                      <span>{prop.location}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="slider-controls">
            <button className="slider-arrow slider-prev" onClick={handlePrev} disabled={currentIndex === 0}>
              <ArrowLeft size={20} />
            </button>
            <div className="slider-dots">
              {Array.from({ length: totalDots }).map((_, idx) => (
                <span 
                  key={idx} 
                  className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
            <button className="slider-arrow slider-next" onClick={handleNext} disabled={currentIndex === totalDots - 1}>
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="properties-cta"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <a href="#" className="view-all-btn">
            <span>View All Properties</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
