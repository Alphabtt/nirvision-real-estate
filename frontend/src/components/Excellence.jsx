import React from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartHandshake, Leaf, ShieldCheck, Clock, Settings } from 'lucide-react';

const pillars = [
  {
    icon: <Building2 size={36} strokeWidth={1.2} />,
    title: "Iconic Architecture",
    desc: "Signature designs that redefine skylines and create landmarks that stand the test of time."
  },
  {
    icon: <HeartHandshake size={36} strokeWidth={1.2} />,
    title: "Customer First",
    desc: "Personalized service from selection through handover, ensuring complete satisfaction."
  },
  {
    icon: <Leaf size={36} strokeWidth={1.2} />,
    title: "Green Living",
    desc: "Eco-conscious construction with energy-efficient systems and sustainable materials."
  },
  {
    icon: <ShieldCheck size={36} strokeWidth={1.2} />,
    title: "Quality Assurance",
    desc: "Rigorous standards with premium materials and expert craftsmanship at every stage."
  },
  {
    icon: <Clock size={36} strokeWidth={1.2} />,
    title: "Timely Delivery",
    desc: "A proven track record of on-time project delivery, keeping every promise made."
  },
  {
    icon: <Settings size={36} strokeWidth={1.2} />,
    title: "Facility Management",
    desc: "Comprehensive post-handover services for a seamless and hassle-free living experience."
  }
];

const Excellence = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="excellence" className="excellence-section">
      <div className="excellence-container">
        <motion.div 
          className="section-header centered"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">Our Pillars of Excellence</h2>
          <p className="section-subtitle">Every detail is crafted with purpose — from sustainable architecture to bespoke interior design</p>
        </motion.div>

        <motion.div 
          className="excellence-grid"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {pillars.map((pillar, idx) => (
            <motion.div key={idx} className="excellence-card" variants={fadeUp}>
              <div className="excellence-card-icon">
                {pillar.icon}
              </div>
              <h3 className="excellence-card-title">{pillar.title}</h3>
              <p className="excellence-card-desc">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Excellence;
