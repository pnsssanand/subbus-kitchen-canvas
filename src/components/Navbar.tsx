
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-restaurant-black bg-opacity-95 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-restaurant-yellow">Subbu's</span> Kitchen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="nav-link">Menu</a>
          <a href="#special" className="nav-link">Today's Special</a>
          <a href="#location" className="nav-link">Location</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="tel:9160155777" className="flex items-center gap-2 btn-primary">
            <Phone size={18} />
            <span>91601 55777</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white flex flex-col gap-[6px] p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute w-full bg-restaurant-black bg-opacity-95 transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-[300px] opacity-100 shadow-lg' : 'max-h-0 opacity-0'
      }`}>
        <div className="container-custom py-4 flex flex-col gap-4">
          <a href="#menu" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#special" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>Today's Special</a>
          <a href="#location" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>Location</a>
          <a href="#contact" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="tel:9160155777" className="flex items-center gap-2 btn-primary justify-center">
            <Phone size={18} />
            <span>91601 55777</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
