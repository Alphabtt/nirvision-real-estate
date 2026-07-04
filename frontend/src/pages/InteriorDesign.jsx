import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './InteriorDesign.css';

const InteriorDesign = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // For parallax effect in stats
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div className="interior-page">
      
      {/* 1. Hero Section */}
      <section className="interior-hero">
        <div className="interior-hero-content">
          <div className="interior-hero-brand">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="interior-heading text-4xl lg:text-5xl"
            >
              NirVision<br/>Interiors
            </motion.h1>
          </div>
          <motion.div 
            className="interior-hero-desc"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp}>
              NirVision Interiors is our one-stop bespoke interior design team for your architectural vision. Over the past decade, we’ve built a reputation as a trusted partner, shaping the most luxurious lifestyles and premium workspaces for our discerning clients.
            </motion.p>
          </motion.div>
        </div>
        <div className="interior-hero-image">
          <img src="/images/property-penthouse.png" alt="NirVision Interior Design" />
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="interior-stats-section">
        <div className="interior-stats-container">
          
          <motion.div 
            className="stat-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="stat-number">130<span>+</span></div>
            <div className="stat-label">Completed Projects</div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="stat-number">80<span>+</span></div>
            <div className="stat-label">Ongoing Plans</div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="stat-number">30<span>+</span></div>
            <div className="stat-label">Skilled Team Members</div>
          </motion.div>

        </div>
      </section>

      {/* 3. Services Section */}
      <section className="interior-services-section">
        <motion.h2 
          className="interior-section-title interior-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
        >
          Our Services
        </motion.h2>

        <div className="services-grid">
          <motion.div 
            className="service-card bg-light"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h3>Interior<br/>Design</h3>
            <p>We design to elevate your lifestyle. Our architectural experts work closely with you to make your dream space a reality, meticulously crafting every detail.</p>
          </motion.div>

          <div className="service-image-block">
            <img src="/images/luxury_living_room_1783103394813.png" alt="Services" onError={(e) => { e.target.src = '/images/rent-1.png'; }} />
          </div>

          <motion.div 
            className="service-card bg-darker"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h3>Building<br/>Finishes</h3>
            <p>We are on a mission to design cohesive and effective interiors where every corner will lift your spirit with premium materials and immaculate finishes.</p>
          </motion.div>

          <motion.div 
            className="service-card bg-light"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h3>Renovation<br/>& Upgrades</h3>
            <p>Breathe in modernity with our renovation designs. We aim to revitalize your indoors and outdoors, blending seamlessly with your evolving lifestyle.</p>
          </motion.div>

          <motion.div 
            className="service-card bg-darker"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h3>Technical<br/>Support</h3>
            <p>Our comprehensive plumbing, electrical, and smart-home services will increase your living experience. We handle each work with precision by professionals.</p>
          </motion.div>

          <motion.div 
            className="service-card bg-light"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h3>Project<br/>Supervision</h3>
            <p>Get your interior constructed with a well-researched plan, effective and innovative design, and flawless execution supervised by our master architects.</p>
          </motion.div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="interior-testimonials-section">
        <motion.h2 
          className="interior-section-title interior-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
        >
          Hear From Our Clients
        </motion.h2>

        <div className="interior-testimonials-container">
          <div className="interior-testimonial-card">
            <p className="interior-testimonial-quote">“NirVision Interiors turned my penthouse into the sanctuary I've always dreamed of. The attention to detail is unmatched.”</p>
            <div className="interior-testimonial-author">
              <p>Mrs. Moushumi Datta</p>
              <span>Property Owner, Gulshan</span>
            </div>
          </div>

          <div className="interior-testimonial-card">
            <p className="interior-testimonial-quote">“Their creative vision and bespoke finishes exceeded all my expectations. Truly world-class luxury design!”</p>
            <div className="interior-testimonial-author">
              <p>Mr. Rafiq Ahmed</p>
              <span>Business Owner, Banani</span>
            </div>
          </div>

          <div className="interior-testimonial-card">
            <p className="interior-testimonial-quote">“They transformed our corporate office space into an inspiring, high-performance environment. Highly recommended.”</p>
            <div className="interior-testimonial-author">
              <p>Ms. Fatema Akter</p>
              <span>CEO, Tech Solutions Ltd</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Portfolio Section */}
      <section className="interior-portfolio-section">
        <motion.h2 
          className="interior-section-title interior-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
        >
          Our Portfolio
        </motion.h2>

        <div className="portfolio-grid">
          <div className="portfolio-col">
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/flat-1.png" alt="Portfolio 1" />
            </motion.div>
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/rent-2.png" alt="Portfolio 2" />
            </motion.div>
          </div>
          
          <div className="portfolio-col">
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/flat-2.png" alt="Portfolio 3" />
            </motion.div>
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/rent-3.png" alt="Portfolio 4" />
            </motion.div>
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/flat-4.png" alt="Portfolio 5" />
            </motion.div>
          </div>

          <div className="portfolio-col">
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/flat-3.png" alt="Portfolio 6" />
            </motion.div>
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/property-commercial.png" alt="Portfolio 7" />
            </motion.div>
          </div>

          <div className="portfolio-col">
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/rent-1.png" alt="Portfolio 8" />
            </motion.div>
            <motion.div className="portfolio-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src="/images/flat-5.png" alt="Portfolio 9" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section className="interior-contact-section">
        <div className="interior-contact-left">
          <h2 className="interior-contact-title">Let's <span>Get In Touch</span></h2>
        </div>
        <div className="interior-contact-right">
          <div className="interior-contact-bg">
            <img src="/images/building-night.png" alt="Contact Background" />
            <div className="interior-contact-overlay"></div>
          </div>
          <div className="interior-contact-info">
            <div className="interior-contact-item">
              <strong>Hotline:</strong> 16254
            </div>
            <div className="interior-contact-item">
              <strong>Email:</strong> interiors@nirvision.com
            </div>
            <div className="interior-contact-item">
              <strong>Address:</strong> Level 10, NirVision Tower, Gulshan-02, Dhaka
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default InteriorDesign;
