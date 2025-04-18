import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  type: 'scroll' | 'route';
  path?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', type: 'route', path: '/' },
  { id: 'about', label: 'About', type: 'scroll' },
  { id: 'menu-section', label: 'Menu Preview', type: 'scroll', path: 'menu' },
  { id: 'menu-page', label: 'Full Menu', type: 'route', path: '/menu' },
  { id: 'gallery', label: 'Gallery', type: 'scroll' },
  { id: 'contact', label: 'Contact', type: 'scroll' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Filter navigation items based on current page
  const currentPageItems = navItems.filter(item => {
    // On home page, show all scroll items and the home route
    if (location.pathname === '/') {
      return item.type === 'scroll' || item.id === 'home' || item.id === 'menu-page';
    }
    // On other pages, only show route items
    return item.type === 'route';
  });

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <RouterLink
              to="/"
              className="cursor-pointer"
            >
              <span className={`text-2xl font-serif font-bold ${
                scrolled || location.pathname !== '/' ? 'text-primary-600' : 'text-white'
              }`}>
                Ridgewood Coffee
              </span>
            </RouterLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {currentPageItems.map((item) => (
                item.type === 'scroll' ? (
                  <ScrollLink
                    key={item.id}
                    to={item.path || item.id}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onSetActive={() => setActiveSection(item.id)}
                    className={`cursor-pointer hover:text-primary-500 transition-colors ${
                      activeSection === item.id 
                        ? scrolled ? 'text-primary-600' : 'text-white font-medium'
                        : scrolled ? 'text-gray-700' : 'text-gray-200'
                    }`}
                  >
                    {item.label}
                  </ScrollLink>
                ) : (
                  <RouterLink
                    key={item.id}
                    to={item.path || '/'}
                    className={`cursor-pointer hover:text-primary-500 transition-colors ${
                      location.pathname === item.path
                        ? 'text-primary-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </RouterLink>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${scrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'} hover:text-primary-500 focus:outline-none`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentPageItems.map((item) => (
              item.type === 'scroll' ? (
                <ScrollLink
                  key={item.id}
                  to={item.path || item.id}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onSetActive={() => setActiveSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </ScrollLink>
              ) : (
                <RouterLink
                  key={item.id}
                  to={item.path || '/'}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </RouterLink>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 