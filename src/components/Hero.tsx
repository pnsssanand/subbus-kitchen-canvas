import { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.slurrp.com/prodrich_article/naebjnteql.webp?impolicy=slurrp-20210601&width=1200&height=675",
    "https://www.shutterstock.com/image-photo/tandoori-chicken-dish-prepared-by-600nw-2482760977.jpg",
    "https://t3.ftcdn.net/jpg/07/84/27/44/360_F_784274428_WkPlJu6zoNRHHdwJT8Gv7Z2jyhdCAVHJ.jpg",
    "https://bonmasala.com/wp-content/uploads/2022/06/Chicken-65-recipe.webp",
    "https://lh6.googleusercontent.com/proxy/tMcWolAwLu83-yGrrgX5oXGHGj0pCuDYpckhNqwap4LW4_YcrIWmNv5fuOCJK33X_h4pgj5vR160Z6ph0IntMtKbWnj49A",
    "https://twosleevers.com/wp-content/uploads/2017/06/Paneer-Tikka-Wide.jpg",
    "https://www.dosafactorymenu.com/blog-admin/images/indian-food-items-apt-for-everyone041641.jpeg",
    "https://www.mistay.in/travel-blog/content/images/2020/07/panner-cover.jpg"
  ];
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Navigation handlers
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
      {/* Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <img 
              src={img} 
              alt={`Delicious food item ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>
      
      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-center text-white px-4 z-10">
        <div className="text-center reveal max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Subbu's Kitchen</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Exquisite Non-Veg Starters & Authentic Pulao in Kakinada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 focus:outline-none z-20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 focus:outline-none z-20"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-6 md:w-8' : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
