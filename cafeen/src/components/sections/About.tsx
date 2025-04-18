import React from 'react';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <h2 className="heading text-center">Our Story</h2>
        <div 
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Founded in 2020, Ridgewood Coffee began as a dream to create a welcoming space
              where community and quality coffee come together. Our passion for exceptional
              coffee and commitment to sustainability drives everything we do.
            </p>
            <p className="text-lg text-gray-700">
              We source our beans directly from sustainable farms around the world, paying fair prices 
              to support the livelihoods of farmers and their communities. Our small-batch roasting 
              process ensures that every cup reflects the unique character of its origin.
            </p>
            <p className="text-lg text-gray-700">
              Beyond great coffee, we're proud to be a neighborhood gathering place where 
              connections are made and ideas are shared. Whether you're meeting friends, working remotely, 
              or simply enjoying a moment of solitude, our space is designed to make you feel at home.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/images/about-image.jpg" 
              alt="Barista preparing coffee at Ridgewood Coffee" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 