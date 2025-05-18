
import { MapPin, Clock, Phone, Facebook, Instagram, Twitter } from '../components/ui/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-restaurant-black pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and about */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold">
                <span className="text-restaurant-yellow">Subbu's</span> Kitchen
              </h3>
            </Link>
            <p className="text-gray-400 mb-6">
              Serving the finest non-vegetarian cuisine in Kakinada since 2019. Known for our authentic Donne Pulao and delicious starters.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center hover:bg-opacity-80 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center hover:bg-opacity-80 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="tel:9160155777" 
                className="w-10 h-10 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center hover:bg-opacity-80 transition-all"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-restaurant-yellow transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="text-gray-400 hover:text-restaurant-yellow transition-colors">Menu</a>
              </li>
              <li>
                <a href="#special" className="text-gray-400 hover:text-restaurant-yellow transition-colors">Today's Special</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-restaurant-yellow transition-colors">Contact</a>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-restaurant-yellow transition-colors">Admin</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-restaurant-yellow" />
                <a href="tel:9160155777" className="text-gray-400 hover:text-restaurant-yellow transition-colors">91601 55777</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-restaurant-yellow flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Sports Complex, RTO Office Road,<br />Vanga Geetha App Opposite,<br />Kakinada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-restaurant-yellow" />
                <span className="text-gray-400">11:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} Subbu's Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
