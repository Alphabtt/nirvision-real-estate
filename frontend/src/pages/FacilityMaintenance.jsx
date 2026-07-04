import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, ArrowUpDown, Zap, Fuel, Flame, Fan, Sparkles, Eye } from 'lucide-react';
import './FacilityMaintenance.css';

const FacilityMaintenance = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const services = [
    {
      id: '01',
      title: 'BUILDING MANAGER',
      desc: 'Our Building Managers ensure smooth day-to-day operations, coordinating maintenance, security, and services, so your property remains efficient, secure, and well-managed.',
      img: '/images/fmd-manager.png'
    },
    {
      id: '02',
      title: 'CLEANER',
      desc: 'Our cleaning team maintains every corner of your property with care and consistency ensuring a clean, hygienic, and welcoming environment at all times.',
      img: '/images/fmd-cleaner.png'
    },
    {
      id: '03',
      title: 'EXPERT ELECTRICIAN',
      desc: 'Our expert electricians ensure reliable power systems through regular maintenance and quick response keeping your property safe, functional, and uninterrupted.',
      img: '/images/fmd-electrician.png'
    },
    {
      id: '04',
      title: 'SECURITY',
      desc: 'Our trained security personnel ensure round-the-clock protection, managing access and monitoring your property to maintain a safe and secure environment.',
      img: '/images/fmd-security.png'
    },
    {
      id: '05',
      title: 'PLUMBER',
      desc: 'Our skilled plumbers ensure reliable water systems through regular maintenance and prompt service keeping your property functional and hassle-free.',
      img: '/images/fmd-plumber.png'
    },
    {
      id: '06',
      title: 'GARDENER',
      desc: 'Our gardeners maintain green spaces with care and precision ensuring a fresh, well-kept environment that enhances the beauty of your property.',
      img: '/images/fmd-gardener.png'
    }
  ];

  const additionalServices = [
    { icon: <Droplets size={24} color="#333" />, text: 'Water Reservoir Cleaning' },
    { icon: <ArrowUpDown size={24} color="#333" />, text: 'Lift Servicing' },
    { icon: <Zap size={24} color="#333" />, text: 'Generator Servicing' },
    { icon: <Fuel size={24} color="#333" />, text: 'Generator Refueling' },
    { icon: <Flame size={24} color="#333" />, text: 'Fire Extinguisher Refilling' },
    { icon: <Fan size={24} color="#333" />, text: 'AC Servicing' },
    { icon: <Sparkles size={24} color="#333" />, text: 'Cleaning of common areas' },
    { icon: <Eye size={24} color="#333" />, text: 'Monitoring by Head Office Personnel' }
  ];

  return (
    <div className="fmd-page">
      
      {/* 1. Hero Section */}
      <section className="fmd-hero-section">
        <div className="fmd-hero-content">
          <motion.h1 
            className="fmd-hero-title"
            initial="hidden" animate="visible" variants={fadeUp}
          >
            Facility<br/>Maintenance
          </motion.h1>
          <motion.div 
            className="fmd-hero-text-image"
            initial="hidden" animate="visible" variants={{...fadeUp, visible: {...fadeUp.visible, transition: {delay: 0.2, duration: 0.8}}}}
          >
            <img src="/images/rent-2.png" alt="FMD Operations" className="fmd-hero-small-img" />
            <p className="fmd-hero-desc">
              FMD keeps your property running with generator and lift maintenance, fuel, pool care, and fire safety—so operations stay efficient and environments pristine.
            </p>
          </motion.div>
        </div>
        <div className="fmd-hero-large-img-container">
          <motion.img 
            src="/images/hero-building.png" 
            alt="Hero Background" 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
          />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="fmd-stats-section">
        <div className="fmd-stats-container">
          <div className="fmd-stat-card">
            <h3 className="fmd-stat-number">60<span>+</span></h3>
            <p className="fmd-stat-label">Properties Managed</p>
          </div>
          <div className="fmd-stat-card">
            <h3 className="fmd-stat-number">100<span>+</span></h3>
            <p className="fmd-stat-label">Expert Technicians</p>
          </div>
          <div className="fmd-stat-card">
            <h3 className="fmd-stat-number">500<span>+</span></h3>
            <p className="fmd-stat-label">Active Staff</p>
          </div>
        </div>
      </section>

      {/* 3. Stacked Services Section */}
      <section className="fmd-services-section">
        <motion.h2 
          className="fmd-section-title"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          FMD Services
        </motion.h2>
        
        <div className="fmd-stacked-container">
          {services.map((svc) => (
            <div key={svc.id} className="fmd-stack-card">
              <div className="fmd-card-img">
                <img src={svc.img} alt={svc.title} />
              </div>
              <div className="fmd-card-content">
                <p className="fmd-card-num">{svc.id}</p>
                <h3 className="fmd-card-title">{svc.title}</h3>
                <p className="fmd-card-desc">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Additional Services Grid */}
      <section className="fmd-additional-section">
        <motion.h2 
          className="fmd-section-title"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          Additional Services
        </motion.h2>
        <div className="fmd-additional-grid">
          {additionalServices.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="fmd-additional-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="fmd-icon-wrapper">
                {item.icon}
              </div>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="fmd-contact-section">
        <div className="fmd-contact-bg">
          <img src="/images/building-night.png" alt="Contact Background" />
        </div>
        <div className="fmd-contact-left">
          <h2 className="fmd-contact-title">Let's<span>Get In Touch</span></h2>
        </div>
        <div className="fmd-contact-right">
          <div className="fmd-contact-overlay"></div>
          <div className="fmd-contact-info">
            <p className="fmd-contact-item">
              <strong>Support:</strong> 24/7 FMD Helpdesk
            </p>
            <p className="fmd-contact-item">
              <strong>Phone:</strong> +880 1600-000000
            </p>
            <p className="fmd-contact-item">
              <strong>Email:</strong> facilities@nirvision.com
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FacilityMaintenance;
