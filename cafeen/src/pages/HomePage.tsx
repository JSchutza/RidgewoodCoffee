import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Menu from '../components/sections/Menu';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
    </main>
  );
};

export default HomePage; 