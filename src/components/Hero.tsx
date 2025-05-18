
import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0.4, 1 - scrollPosition / 700);
        heroRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="relative w-full h-screen bg-restaurant-black overflow-hidden"
      ref={heroRef}
    >
      {/* Background video or image */}
      <div className="absolute inset-0 bg-cover bg-center">
        {/* We'll replace this with a video if you upload one */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9')] bg-cover bg-center"
          style={{ filter: 'brightness(0.4)' }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full container-custom flex flex-col justify-center items-start">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="mb-4 leading-tight">
            <span className="text-restaurant-yellow">Best Non-Veg Starters</span>
            <br />
            & Donne Pulao in Kakinada
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Experience the authentic flavors of our signature Donne Pulao and mouthwatering starters at Subbu's Kitchen - Kakinada's favorite dining destination.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="btn-primary">
              Explore Menu
            </a>
            <a href="tel:9160155777" className="btn-outline flex items-center gap-2">
              <Phone size={18} />
              <span>91601 55777</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <div className="w-[2px] h-8 bg-restaurant-yellow relative">
          <div className="absolute w-full h-1/3 bg-white animate-[bounce_1.5s_infinite] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
