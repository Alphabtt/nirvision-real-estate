import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="about-image-wrapper">
            <img src="/images/about-team.png" alt="Architectural design workspace" className="about-image" />
            <div className="about-image-accent"></div>
          </div>
          <div className="about-badge">
            <span className="badge-number">25+</span>
            <span className="badge-text">Years of<br />Excellence</span>
          </div>
        </motion.div>

        <div className="about-content">
          <motion.span 
            className="section-tag"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            Our Legacy
          </motion.span>
          
          <motion.h2 
            className="about-title"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span>Building Dreams</span>
            <span>with Integrity</span>
            <span className="italic">&amp; Innovation</span>
          </motion.h2>
          
          <motion.p 
            className="about-description"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            For over two decades, NirVision has redefined luxury living across the nation. 
            We deliver exceptional residential, commercial, and condominium projects that blend 
            timeless elegance with modern innovation. Our unwavering commitment to quality craftsmanship 
            and customer satisfaction has established us as the most trusted name in premium real estate.
          </motion.p>
          
          <motion.div 
            className="about-features"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            {[
              "Premium Architecture",
              "Trusted Developer",
              "Sustainable Design"
            ].map((feature, idx) => (
              <motion.div key={idx} className="feature-item" variants={fadeUp}>
                <div className="feature-icon">
                  <CheckCircle2 size={24} strokeWidth={1.5} />
                </div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.a 
            href="#" 
            className="learn-more-btn"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span>Learn More</span>
            <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
