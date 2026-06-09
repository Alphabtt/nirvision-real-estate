import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent to NirVision.`);
    setFormData({ name: '', email: '', phone: '', size: '', location: '', message: '' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const offices = [
    {
      title: "Corporate Office",
      phone: "+880 2 58815305-11",
      email: "sales@nirvision.com",
      address: "House # 5, Road # 90, Gulshan-02, Dhaka-1212",
      mapLink: "https://www.google.com/maps"
    },
    {
      title: "Corporate Annex Office",
      phone: "+880 2 48810255-9",
      email: "sales@nirvision.com",
      address: "House # 9/C, Road # 71, Gulshan-02, Dhaka-1212",
      mapLink: "https://www.google.com/maps"
    },
    {
      title: "Chattogram Office",
      phone: "031-2562313",
      email: "sales@nirvision.com",
      address: "Pinnacle Tower, 4th Floor, CDA Avenue, Chattogram",
      mapLink: "https://www.google.com/maps"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-split">
        
        {/* Left Side: Interactive Form */}
        <motion.div 
          className="contact-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="contact-form-container">
            <h2 className="contact-heading">Get in Touch</h2>
            <p className="contact-subtext">We are here to help. Reach out to us for inquiries about our luxury properties or land development opportunities.</p>

            <div className="contact-tabs">
              <button 
                className={`contact-tab ${activeTab === 'client' ? 'active' : ''}`}
                onClick={() => setActiveTab('client')}
              >
                Client
                {activeTab === 'client' && <motion.div layoutId="activeTabIndicator" className="tab-indicator" />}
              </button>
              <button 
                className={`contact-tab ${activeTab === 'landowner' ? 'active' : ''}`}
                onClick={() => setActiveTab('landowner')}
              >
                Land Owner
                {activeTab === 'landowner' && <motion.div layoutId="activeTabIndicator" className="tab-indicator" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
                </div>
                <div className="form-group">
                  <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder={activeTab === 'client' ? "Preferred size in sqft" : "Land size in Katha/Bigha"} />
                </div>
                <div className="form-group">
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder={activeTab === 'client' ? "Your preferred location" : "Land location"} />
                </div>
                <div className="form-group">
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="3" required></textarea>
                </div>
                
                <button type="submit" className="contact-submit-btn">Send Message</button>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Office Details */}
        <motion.div 
          className="contact-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="office-details-container">
            <h3 className="office-heading">OFFICE DETAILS</h3>
            
            <div className="office-list">
              {offices.map((office, index) => (
                <div className="office-card" key={index}>
                  <div className="office-info">
                    <h4>{office.title}</h4>
                    <div className="office-contact-item">
                      <Phone size={16} className="contact-icon" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="office-contact-item">
                      <Mail size={16} className="contact-icon" />
                      <span>{office.email}</span>
                    </div>
                    <div className="office-contact-item">
                      <MapPin size={16} className="contact-icon" />
                      <span>{office.address}</span>
                    </div>
                  </div>
                  <a href={office.mapLink} target="_blank" rel="noopener noreferrer" className="office-map-link">
                    <ExternalLink size={14} />
                    View Location
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
