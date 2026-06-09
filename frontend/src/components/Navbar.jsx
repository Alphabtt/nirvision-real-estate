import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Properties', id: 'properties' },
    { name: 'Excellence', id: 'excellence' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav-container">
          <div className="nav-left">
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
            </button>
            <span className="menu-label">Menu</span>
          </div>

          <a href="#home" className="nav-logo" aria-label="NirVision Home">
            <span className="logo-mark">NV</span>
            <span className="logo-text">NirVision</span>
          </a>

          <div className="nav-right">
            <button className="search-btn" aria-label="Open search" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
              <span className="search-label">Search</span>
            </button>
            <a href="#contact" className="nav-cta">Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay powered by Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            style={{ visibility: 'visible', pointerEvents: 'auto', display: 'block' }}
          >
            {/* Backdrop Blur */}
            <motion.div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'rgba(21, 23, 26, 0.7)', 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'none'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.2 } }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div 
              className="mobile-menu-inner"
              style={{ transition: 'none' }} // Prevent legacy CSS fighting
              initial={{ x: '-100%' }}
              animate={{ x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }}
              exit={{ x: '-100%', transition: { ease: 'easeInOut', duration: 0.4 } }}
            >
              <button 
                className="menu-close" 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                style={{ transition: 'none' }}
              >
                <X size={40} strokeWidth={1} />
              </button>
              
              <ul className="mobile-nav-links">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + (i * 0.08), ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { delay: (navItems.length - i) * 0.04, duration: 0.2 } }}
                  >
                    <a 
                      href={`#${item.id}`} 
                      className="mobile-link" 
                      onClick={() => setIsMenuOpen(false)}
                      style={{ transition: 'color 0.3s ease' }}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <p className="mobile-menu-email">info@nirvision.com</p>
                <div className="mobile-social-links">
                  <a href="#" aria-label="Facebook">FB</a>
                  <a href="#" aria-label="Instagram">IG</a>
                  <a href="#" aria-label="LinkedIn">LN</a>
                  <a href="#" aria-label="YouTube">YT</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Overlay powered by Framer Motion */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ 
              background: 'rgba(21, 23, 26, 0.95)', 
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            <button 
              className="search-close" 
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={40} strokeWidth={1} />
            </button>

            <motion.div 
              className="search-container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.4, ease: "easeOut" } }}
              exit={{ y: -20, opacity: 0, transition: { duration: 0.2 } }}
            >
              <form onSubmit={(e) => { e.preventDefault(); alert("Search submitted!"); setIsSearchOpen(false); }}>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Type to search..." 
                  autoFocus
                />
                <button type="submit" className="search-submit" aria-label="Submit search">
                  <ArrowRight size={32} strokeWidth={1} />
                </button>
              </form>
              <div className="search-hint">Press Enter to search</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
