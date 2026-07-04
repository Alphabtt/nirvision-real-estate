import React, { useEffect, useState } from 'react';
import { Expand, MapPin, Waypoints, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClient } from '../context/ClientContext';
import { landData as fallbackLand } from '../data/landData';
import './Land.css';

const Land = () => {
  const [landData, setLandData] = useState([]);
  const { toggleShortlist, isShortlisted } = useClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://nirvision-backend.onrender.com/api/properties?type=land')
      .then(res => res.json())
      .then(data => setLandData(data && data.length > 0 ? data : fallbackLand))
      .catch(err => {
        console.error('Error fetching land:', err);
        setLandData(fallbackLand);
      });
  }, []);

  return (
    <div className="lands-page">
      <section className="lands-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Prime Land in Dhaka
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Invest in the most coveted plots across the capital for your next grand development.
        </motion.p>
      </section>

      <section className="lands-grid">
        {landData.map((land, index) => (
          <motion.div 
            className="land-card" 
            key={land.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
          >
            <div className="land-image-container" style={{ position: 'relative' }}>
              <img src={land.image} alt={land.title} className="land-image" />
              <button 
                onClick={() => toggleShortlist(land)}
                style={{
                  position: 'absolute', top: 15, right: 15, 
                  background: 'rgba(0,0,0,0.5)', border: 'none', 
                  borderRadius: '50%', width: 40, height: 40, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', backdropFilter: 'blur(4px)'
                }}
              >
                <Heart size={20} fill={isShortlisted(land.id) ? '#D84C7B' : 'none'} color={isShortlisted(land.id) ? '#D84C7B' : '#fff'} />
              </button>
            </div>
            
            <div className="land-details">
              <div className="land-location">{land.location}</div>
              <h2 className="land-title">{land.title}</h2>
              
              <div className="land-specs">
                <div className="spec-item">
                  <Expand size={16} />
                  <span>{land.size}</span>
                </div>
                <div className="spec-item">
                  <MapPin size={16} />
                  <span>{land.zone}</span>
                </div>
                <div className="spec-item">
                  <Waypoints size={16} />
                  <span>{land.access}</span>
                </div>
              </div>
              
              <p className="land-description">
                {land.description}
              </p>
              
              <div className="land-footer">
                <div className="land-price">{land.price}</div>
                <button className="view-btn">VIEW DETAILS</button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Land;
