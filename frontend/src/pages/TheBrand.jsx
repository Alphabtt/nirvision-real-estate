import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const TheBrand = () => {
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

  return (
    <div className="brand-page">
      {/* 1. Hero Section */}
      <section className="brand-hero">
        <div className="brand-hero-bg">
          <img src="/images/building-night.png" alt="NirVision Building" />
        </div>
        
        <motion.div 
          className="brand-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="brand-hero-number">10</motion.div>
          <motion.div variants={fadeUp} className="brand-hero-subtitle">Years Of</motion.div>
          <motion.h1 variants={fadeUp} className="brand-hero-title">
            Broadening<br />Life Boundaries
          </motion.h1>
          <motion.p variants={fadeUp} className="brand-hero-desc">
            Since its inception, NirVision has grown into a symbol of unparalleled luxury and architectural excellence in the real estate sector.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. The Narrative Section */}
      <section className="brand-section">
        <div className="brand-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="brand-section-header"
          >
            <h2 className="brand-section-title">
              The NirVision<br />Narrative
            </h2>
          </motion.div>

          <div className="narrative-grid">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="narrative-block"
            >
              <div className="narrative-img portrait">
                <img src="/images/property-penthouse.png" alt="Luxury Property" />
              </div>
              <p className="narrative-text">
                With a decade of real estate excellence, NirVision has delivered landmark luxury developments, collectively broadening the boundaries of how modern visionaries live, work, and dream.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="narrative-block offset"
            >
              <div className="narrative-img square">
                <img src="/images/property-commercial.png" alt="Commercial Luxury" />
              </div>
              <p className="narrative-text">
                Guided by our vision of delivering "Bespoke Excellence", we continue to lead the luxury real estate industry with masterful craftsmanship, pioneering design, and immaculate reliability. Every decision we make embodies our philosophy – "Broaden Life Boundaries." By harmonizing aesthetics with function, we transcend architecture itself.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The NirVision Way (Vision & Mission) */}
      <section className="brand-section brand-section-alt">
        <div className="brand-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="brand-section-header"
          >
            <h2 className="brand-section-title">The NirVision Way</h2>
            <p className="brand-section-desc">
              The NirVision Way describes our vision, mission, values, and guiding principles. It establishes a common understanding of what we believe in and how we shape the future of luxury living.
            </p>
          </motion.div>

          <div className="way-grid">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="way-card"
            >
              <h3>Vision</h3>
              <h4>To Achieve Excellence With High Performance</h4>
              <p>
                We believe that excellence is a journey which can be achieved by delivering superior results. Delivering superior results requires high performance, a strong sense of urgency, and a passion for continuous improvement.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="way-card"
            >
              <h3>Mission</h3>
              <h4>To Maximize Investors' Return & Elevate Lifestyles</h4>
              <p>
                Our mission is to create spaces that serve as timeless investments while offering an unparalleled quality of life, meticulously curated for the discerning few.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Guiding Principles */}
      <section className="brand-section">
        <div className="brand-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="brand-section-header"
          >
            <h2 className="brand-section-title">Guiding Principles</h2>
            <p className="brand-section-desc">
              Our guiding principles are our core behaviors that enable our values to help us achieve our mission and vision.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="principles-grid"
          >
            {[
              "Live The NirVision Way",
              "Value Diversity and Inclusion",
              "Win with Merit",
              "Challenge the Status Quo",
              "Lead by Example"
            ].map((principle, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                className="principle-item"
              >
                <div className="principle-number">
                  <span>0{index + 1}</span>
                </div>
                <span className="principle-text">{principle}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Our Leadership */}
      <section className="brand-section brand-section-dark">
        <div className="brand-container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="brand-section-header"
          >
            <h2 className="brand-section-title">Our Leadership</h2>
          </motion.div>

          <div className="leadership-grid">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="leader-card"
            >
              <div className="leader-img">
                <img src="/images/about-team.png" alt="Chairman" />
              </div>
              <p className="leader-quote">
                "The road to success is the combination of dedication, devotion and unremitting hard work. The endeavor towards this brought NirVision to the country’s leading luxury real estate tier."
              </p>
              <div className="leader-info">
                <span className="leader-name">Sadman Ragib</span>
                <span className="leader-dot"></span>
                <span className="leader-title">Chairman</span>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="leader-card offset"
            >
              <div className="leader-img">
                <img src="/images/about-team.png" alt="Vice Chairman" />
              </div>
              <p className="leader-quote">
                "In NirVision, We don’t Repeat, We Create. We forge spaces that inspire belonging, embrace experience, and redefine the very meaning of living."
              </p>
              <div className="leader-info">
                <span className="leader-name">Anisur Rahman</span>
                <span className="leader-dot"></span>
                <span className="leader-title">Vice-Chairman</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheBrand;
