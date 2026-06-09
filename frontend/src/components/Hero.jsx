import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <img src="/images/hero-building.png" alt="Luxury building at golden hour" className="hero-img hero-img-day" />
        <img src="/images/building-night.png" alt="Luxury building at night" className="hero-img hero-img-night" />
      </div>
      <div className="hero-overlay"></div>
      
      {/* Optional: Add a subtle particle effect here if desired, or leave it to CSS/Canvas */}
      <div className="hero-particles"></div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="hero-title">
          <motion.span className="hero-word block" variants={itemVariants}>Elevate</motion.span>
          <motion.span className="hero-word block" variants={itemVariants}>Your</motion.span>
          <motion.span className="hero-word block" variants={itemVariants}>Living</motion.span>
        </h1>
        <motion.p className="hero-subtitle" variants={fadeVariants} style={{ WebkitFontSmoothing: 'antialiased' }}>
          Where architectural artistry meets unparalleled luxury
        </motion.p>
        <motion.a href="#properties" className="hero-cta" variants={fadeVariants}>
          <span>Explore Properties</span>
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>

      <motion.div 
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
