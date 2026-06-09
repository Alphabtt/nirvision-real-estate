import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "NirVision transformed our dream home into reality. The attention to detail and the quality of construction exceeded every expectation we had. Living here feels like a five-star experience every day.",
    author: "Sakib Rahman",
    role: "Homeowner, Seraphina Residences",
    initials: "SR"
  },
  {
    id: 2,
    quote: "As a commercial investor, I've worked with many developers. NirVision stands apart with their professionalism, transparency, and unwavering commitment to delivering value. The Pinnacle Tower is truly world-class.",
    author: "Nadia Ahmed",
    role: "Investor, The Pinnacle Tower",
    initials: "NA"
  },
  {
    id: 3,
    quote: "From the first consultation to final handover, the entire journey was smooth and delightful. The interiors were beautifully curated, and the after-sales support has been exceptional. Highly recommended!",
    author: "Tanvir Hasan",
    role: "Homeowner, Celestia Gardens",
    initials: "TH"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <motion.div 
          className="section-header centered"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <span className="section-tag light">What People Say</span>
          <h2 className="section-title light">Client Voices</h2>
        </motion.div>

        <div className="testimonials-carousel" style={{ position: 'relative', height: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            >
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonials[currentIndex].quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[currentIndex].initials}</div>
                <div className="author-info">
                  <h4>{testimonials[currentIndex].author}</h4>
                  <p>{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonial-nav">
          <button className="test-arrow" onClick={handlePrev} aria-label="Previous testimonial">
            <ArrowLeft size={18} />
          </button>
          <div className="test-dots">
            {testimonials.map((_, idx) => (
              <span 
                key={idx} 
                className={`test-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          <button className="test-arrow" onClick={handleNext} aria-label="Next testimonial">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
