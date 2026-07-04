import React, { useEffect, useState } from 'react';
import { BedDouble, Bath, Square, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClient } from '../context/ClientContext';
import { rentData as fallbackRent } from '../data/rentData';
import './Rent.css';

const Rent = () => {
  const [rentData, setRentData] = useState([]);
  const { toggleShortlist, isShortlisted } = useClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://localhost:5000/api/properties?type=rent')
      .then(res => res.json())
      .then(data => setRentData(data && data.length > 0 ? data : fallbackRent))
      .catch(err => {
        console.error('Error fetching rent:', err);
        setRentData(fallbackRent);
      });
  }, []);

  return (
    <div className="rents-page">
      <section className="rents-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Luxury Rentals in Dhaka
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Experience premium living with our exclusive selection of high-end apartments for rent.
        </motion.p>
      </section>

      <section className="rents-grid">
        {rentData.map((rent, index) => (
          <motion.div 
            className="rent-card" 
            key={rent.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
          >
            <div className="rent-image-container" style={{ position: 'relative' }}>
              <img src={rent.image} alt={rent.title} className="rent-image" />
              <button 
                onClick={() => toggleShortlist(rent)}
                style={{
                  position: 'absolute', top: 15, right: 15, 
                  background: 'rgba(0,0,0,0.5)', border: 'none', 
                  borderRadius: '50%', width: 40, height: 40, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', backdropFilter: 'blur(4px)'
                }}
              >
                <Heart size={20} fill={isShortlisted(rent.id) ? '#D84C7B' : 'none'} color={isShortlisted(rent.id) ? '#D84C7B' : '#fff'} />
              </button>
            </div>
            
            <div className="rent-details">
              <div className="rent-location">{rent.location}</div>
              <h2 className="rent-title">{rent.title}</h2>
              
              <div className="rent-specs">
                <div className="spec-item">
                  <Square size={16} />
                  <span>{rent.size}</span>
                </div>
                <div className="spec-item">
                  <BedDouble size={16} />
                  <span>{rent.bedrooms} Beds</span>
                </div>
                <div className="spec-item">
                  <Bath size={16} />
                  <span>{rent.bathrooms} Baths</span>
                </div>
              </div>
              
              <p className="rent-description">
                {rent.description}
              </p>
              
              <div className="rent-footer">
                <div className="rent-price">{rent.price}</div>
                <button className="view-btn">VIEW DETAILS</button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Rent;
