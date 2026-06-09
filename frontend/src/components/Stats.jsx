import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem = ({ count, suffix, label }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCurrent(Math.floor(progress * count));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, count]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{current}</span>
      <span className="stat-suffix">{suffix}</span>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <StatItem count={150} suffix="+" label="Projects Delivered" />
        <div className="stat-divider"></div>
        <StatItem count={3200} suffix="+" label="Happy Families" />
        <div className="stat-divider"></div>
        <StatItem count={25} suffix="+" label="Years of Trust" />
        <div className="stat-divider"></div>
        <StatItem count={12} suffix="" label="Awards Won" />
      </div>
    </section>
  );
};

export default Stats;
