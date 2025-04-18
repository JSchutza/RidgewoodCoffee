import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center"
    >
      <div className="container text-center">
        <div className={`space-y-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white fade-in">
            Welcome to Ridgewood Coffee
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto fade-in fade-in-delay-1">
            Your local coffee haven in the heart of the community
          </p>
          <div className="fade-in fade-in-delay-2">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="btn-primary mt-8"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 