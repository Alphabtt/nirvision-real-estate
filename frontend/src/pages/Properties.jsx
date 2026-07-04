import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Properties.css';

const Properties = () => {
  const categories = [
    {
      id: 'flats',
      title: 'Flats',
      image: '/images/flat-1.png',
      link: '/properties/flats',
      delay: 0.1
    },
    {
      id: 'land',
      title: 'Land',
      image: '/images/land-1.png',
      link: '/properties/land',
      delay: 0.3
    },
    {
      id: 'rent',
      title: 'Rent',
      image: '/images/rent-1.png',
      link: '/properties/rent',
      delay: 0.5
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="properties-hub">
      {/* Header Section */}
      <header className="properties-hub-header">
        <motion.h1 
          className="properties-hub-title"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          Explore Our Portfolio
        </motion.h1>
        <motion.p 
          className="properties-hub-subtitle"
          initial="hidden" animate="visible" variants={{...fadeUp, visible: {...fadeUp.visible, transition: {delay: 0.2, duration: 0.8, ease: "easeOut"}}}}
        >
          Discover a curated selection of world-class luxury flats, premium land plots, and exclusive rental properties tailored to your lifestyle.
        </motion.p>
      </header>

      {/* Grid Layout */}
      <div className="properties-hub-grid">
        {categories.map((category) => (
          <Link to={category.link} className="properties-hub-card" key={category.id}>
            <div className="properties-hub-bg">
              <img src={category.image} alt={`${category.title} Properties`} />
            </div>
            <div className="properties-hub-overlay"></div>
            
            <div className="properties-hub-content">
              <motion.h2 
                className="properties-hub-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: category.delay + 0.4, duration: 0.8 }}
              >
                {category.title}
              </motion.h2>
              <div className="properties-hub-arrow">
                <span>Explore {category.title}</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Properties;
