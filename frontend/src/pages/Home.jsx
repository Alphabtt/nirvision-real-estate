import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProperties from '../components/FeaturedProperties';
import Stats from '../components/Stats';
import Excellence from '../components/Excellence';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProperties />
      <Stats />
      <Excellence />
      <Testimonials />
      <Contact />
      <Newsletter />
    </main>
  );
};

export default Home;
