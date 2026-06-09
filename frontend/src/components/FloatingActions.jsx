import React from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

const FloatingActions = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="floating-actions">
        <a href="tel:16000" className="fab fab-phone" aria-label="Call us">
          <Phone size={22} strokeWidth={2} />
        </a>
        <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="fab fab-whatsapp" aria-label="Chat on WhatsApp">
          <MessageCircle size={22} strokeWidth={2} />
        </a>
      </div>

      <button className="back-to-top visible" onClick={scrollToTop} aria-label="Back to top" style={{ opacity: 1, visibility: 'visible' }}>
        <ArrowUp size={20} strokeWidth={2} />
      </button>
    </>
  );
};

export default FloatingActions;
