import React, { useEffect, useState } from 'react';
import { BedDouble, Bath, Square, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { motion } from 'framer-motion';
import { useClient } from '../context/ClientContext';
import { flatsData as fallbackFlats } from '../data/flatsData';
import './Flats.css';

const Flats = () => {
  const [flatsData, setFlatsData] = useState([]);
  const { toggleShortlist, isShortlisted } = useClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://nirvision-backend.onrender.com/api/properties?type=flats')
      .then(res => res.json())
      .then(data => setFlatsData(data && data.length > 0 ? data : fallbackFlats))
      .catch(err => {
        console.error('Error fetching flats, using fallback:', err);
        setFlatsData(fallbackFlats);
      });
  }, []);

  return (
    <div className="flats-page">
      <section className="flats-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Exclusive Flats in Dhaka
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover unparalleled luxury living across the most prestigious neighborhoods in the city.
        </motion.p>
      </section>

      <section className="flats-grid">
        {flatsData.map((flat, index) => (
          <motion.div 
            className="flat-card" 
            key={flat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
          >
            <div className="flat-image-container" style={{ position: 'relative' }}>
              <img src={flat.image} alt={flat.title} className="flat-image" />
              <button 
                onClick={() => toggleShortlist(flat)}
                style={{
                  position: 'absolute', top: 15, right: 15, 
                  background: 'rgba(0,0,0,0.5)', border: 'none', 
                  borderRadius: '50%', width: 40, height: 40, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', backdropFilter: 'blur(4px)'
                }}
              >
                <Heart size={20} fill={isShortlisted(flat.id) ? '#D84C7B' : 'none'} color={isShortlisted(flat.id) ? '#D84C7B' : '#fff'} />
              </button>
            </div>
            
            <div className="flat-details">
              <div className="flat-location">{flat.location}</div>
              <h2 className="flat-title">{flat.title}</h2>
              
              <div className="flat-specs">
                <div className="spec-item">
                  <Square size={16} />
                  <span>{flat.size}</span>
                </div>
                <div className="spec-item">
                  <BedDouble size={16} />
                  <span>{flat.bedrooms} Beds</span>
                </div>
                <div className="spec-item">
                  <Bath size={16} />
                  <span>{flat.bathrooms} Baths</span>
                </div>
              </div>
              
              <p className="flat-description">
                {flat.description}
              </p>
              
              <div className="flat-footer">
                <div className="flat-price">{flat.price}</div>
                <button className="view-btn">VIEW DETAILS</button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Flats;
