import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Menu from './components/sections/Menu';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';

const App: React.FC = () => {
  // Add a simple performance monitoring effect
  useEffect(() => {
    const startTime = performance.now();
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      console.log(`Page loaded in ${loadTime / 1000} seconds`);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App; 