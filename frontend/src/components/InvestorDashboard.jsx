import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, FileText, Activity, MessageSquare, ChevronRight, Download } from 'lucide-react';
import './InvestorDashboard.css';

const InvestorDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  // MOCK DATA
  const savedProperties = [
    { id: 1, name: "The Aurora Residences", location: "Gulshan-02", size: "4,500 sqft", status: "Ongoing", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "NirVision Zenith", location: "Banani", size: "3,200 sqft", status: "Ready", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" }
  ];

  const viewings = [
    { id: 1, property: "The Aurora Residences", date: "Oct 24, 2026", time: "10:00 AM", agent: "Sarah Rahman" }
  ];

  const documents = [
    { id: 1, title: "Aurora Floorplan Type-A", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "NirVision Corporate Brochure", type: "PDF", size: "8.1 MB" },
    { id: 3, title: "Zenith Investment Prospectus", type: "PDF", size: "4.5 MB" }
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <motion.div 
            key="portfolio"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dashboard-panel"
          >
            <motion.h2 variants={itemVariants}>Saved Portfolio</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Properties you have curated for future consideration.</motion.p>
            <motion.div className="portfolio-grid" variants={containerVariants}>
              {savedProperties.map(prop => (
                <motion.div key={prop.id} className="portfolio-card" variants={itemVariants} whileHover={{ y: -5 }}>
                  <div className="portfolio-img-wrapper">
                    <img src={prop.image} alt={prop.name} />
                    <button className="remove-heart"><Heart fill="#fff" size={20} /></button>
                  </div>
                  <div className="portfolio-info">
                    <span className="prop-status">{prop.status}</span>
                    <h3>{prop.name}</h3>
                    <p>{prop.location} • {prop.size}</p>
                    <button className="view-details-btn">View Details <ChevronRight size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      case 'viewings':
        return (
          <motion.div 
            key="viewings"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dashboard-panel"
          >
            <motion.h2 variants={itemVariants}>Scheduled Viewings</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Manage your upcoming property tours.</motion.p>
            <motion.div className="viewings-list" variants={containerVariants}>
              {viewings.map(view => (
                <motion.div key={view.id} className="viewing-card" variants={itemVariants}>
                  <div className="viewing-date">
                    <Calendar size={24} className="accent-icon" />
                    <div>
                      <h4>{view.date}</h4>
                      <span>{view.time}</span>
                    </div>
                  </div>
                  <div className="viewing-details">
                    <h4>{view.property}</h4>
                    <span>Agent: {view.agent}</span>
                  </div>
                  <button className="reschedule-btn">Reschedule</button>
                </motion.div>
              ))}
            </motion.div>
            <motion.button variants={itemVariants} className="schedule-new-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              + Schedule New Viewing
            </motion.button>
          </motion.div>
        );
      case 'vault':
        return (
          <motion.div 
            key="vault"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dashboard-panel"
          >
            <motion.h2 variants={itemVariants}>Document Vault</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Securely access brochures, floorplans, and contracts.</motion.p>
            <motion.div className="vault-list" variants={containerVariants}>
              {documents.map(doc => (
                <motion.div key={doc.id} className="vault-item" variants={itemVariants}>
                  <div className="doc-info">
                    <FileText size={20} className="accent-icon" />
                    <div>
                      <h4>{doc.title}</h4>
                      <span>{doc.type} • {doc.size}</span>
                    </div>
                  </div>
                  <button className="download-btn"><Download size={18} /></button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      case 'progress':
        return (
          <motion.div 
            key="progress"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dashboard-panel"
          >
            <motion.h2 variants={itemVariants}>Construction Progress</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Track the development of your current investments.</motion.p>
            <motion.div className="progress-card" variants={itemVariants}>
              <div className="progress-header">
                <h3>The Aurora Residences</h3>
                <span className="progress-badge">Unit A-4</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              <div className="progress-stats">
                <span>Overall Completion: <strong>65%</strong></span>
                <span>Est. Handover: <strong>Dec 2027</strong></span>
              </div>
              <ul className="progress-milestones">
                <li className="completed">Foundation & Piling</li>
                <li className="completed">Superstructure Framing</li>
                <li className="active">Interior Masonry</li>
                <li>Fittings & Finishes</li>
              </ul>
            </motion.div>
          </motion.div>
        );
      case 'concierge':
        return (
          <motion.div 
            key="concierge"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dashboard-panel"
          >
            <motion.h2 variants={itemVariants}>Concierge Chat</motion.h2>
            <motion.p variants={itemVariants} className="panel-desc">Direct line to your assigned NirVision broker.</motion.p>
            <motion.div className="chat-interface" variants={itemVariants}>
              <div className="chat-messages">
                <motion.div 
                  className="message received" 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p>Hello! I am Sarah, your dedicated broker. Let me know if you need the updated pricing for The Aurora.</p>
                  <span className="time">10:45 AM</span>
                </motion.div>
                <motion.div 
                  className="message sent"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p>Yes please, send the PDF when you can.</p>
                  <span className="time">11:02 AM</span>
                </motion.div>
              </div>
              <div className="chat-input-area">
                <input type="text" placeholder="Type a message..." />
                <button className="send-btn">Send</button>
              </div>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderAuth = () => (
    <motion.div 
      key="auth"
      className="auth-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="auth-card">
        <motion.div className="auth-header" variants={itemVariants}>
          <div className="logo-mark" style={{ margin: '0 auto 20px' }}>NV</div>
          <h2>{authMode === 'signin' ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{authMode === 'signin' ? 'Sign in to access your Investor Dashboard' : 'Join NirVision for exclusive real estate insights'}</p>
        </motion.div>
        
        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
          <AnimatePresence mode="wait">
            {authMode === 'signup' && (
              <motion.div 
                key="name-field"
                className="form-group"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div className="form-group" variants={itemVariants}>
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </motion.div>
          <motion.div className="form-group" variants={itemVariants}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </motion.div>
          <motion.button 
            variants={itemVariants}
            type="submit" 
            className="auth-submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        <motion.div className="auth-footer" variants={itemVariants}>
          {authMode === 'signin' ? (
            <p>Don't have an account? <span onClick={() => setAuthMode('signup')}>Sign up here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setAuthMode('signin')}>Sign in</span></p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="investor-dashboard-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`dashboard-container ${!isAuthenticated ? 'auth-mode' : ''}`}
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }}
            exit={{ y: "100%", transition: { duration: 0.4 } }}
          >
            <button className="dashboard-close" onClick={() => {
              onClose();
              setTimeout(() => setIsAuthenticated(false), 500); // reset auth when totally closed
            }}><X size={32} strokeWidth={1.5} /></button>
            
            <AnimatePresence mode="wait">
              {!isAuthenticated ? (
                renderAuth()
              ) : (
                <motion.div 
                  key="dashboard"
                  className="dashboard-layout"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Sidebar Navigation */}
                  <div className="dashboard-sidebar">
                    <motion.div 
                      className="user-profile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="avatar">JD</div>
                      <div className="user-info">
                        <h3>John Doe</h3>
                        <span>VIP Investor</span>
                      </div>
                    </motion.div>
                    <nav className="dashboard-nav">
                      {['portfolio', 'viewings', 'vault', 'progress', 'concierge'].map((tab) => (
                        <button 
                          key={tab}
                          className={activeTab === tab ? 'active' : ''} 
                          onClick={() => setActiveTab(tab)}
                          style={{ position: 'relative' }}
                        >
                          {activeTab === tab && (
                            <motion.div
                              layoutId="active-pill"
                              className="active-pill-bg"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                zIndex: 0
                              }}
                            />
                          )}
                          <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {tab === 'portfolio' && <Heart size={18} />}
                            {tab === 'viewings' && <Calendar size={18} />}
                            {tab === 'vault' && <FileText size={18} />}
                            {tab === 'progress' && <Activity size={18} />}
                            {tab === 'concierge' && <MessageSquare size={18} />}
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('concierge', 'Concierge Chat').replace('progress', 'Progress Tracker')}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Main Content Area */}
                  <div className="dashboard-main">
                    <AnimatePresence mode="wait">
                      {renderContent()}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvestorDashboard;
