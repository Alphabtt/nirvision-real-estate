import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing to our newsletter!");
  };

  return (
    <section id="contact" className="newsletter-section">
      <div className="newsletter-container">
        <motion.div 
          className="newsletter-content"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <span className="section-tag">Stay Updated</span>
          <h2 className="newsletter-title">Get Exclusive Access to<br/>Our Latest Properties</h2>
          <p className="newsletter-desc">Subscribe to receive curated property listings, investment insights, and early-access invitations.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">
              <span>Subscribe</span>
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
