import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import TiffinsSection from '../components/TiffinsSection';
import SpecialsSection from '../components/SpecialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  // Animation on scroll effect with improved sensitivity and performance
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    // Initial check to reveal elements that are already visible
    reveal();
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);
  
  // Update page metadata with enhanced descriptions
  useEffect(() => {
    document.title = "Gemini's Foods – Best Non‑Veg Starters & Pulao in Kakinada";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Experience premium non-veg cuisine at Gemini's Foods. Authentic Pulao, delicious starters, and more. Best restaurant in Kakinada for dining and delivery.");
    
    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', "Gemini's Foods – Best Non‑Veg Starters & Pulao in Kakinada");
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', "Experience premium non-veg cuisine at Gemini's Foods. Authentic Pulao, delicious starters, and more. Best restaurant in Kakinada for dining and delivery.");
  }, []);

  return (
    <div className="bg-restaurant-black min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 h-screen w-2 bg-restaurant-yellow opacity-80 z-50 pointer-events-none hidden md:block"></div>
      <Navbar />
      <Hero />
      
      <main>
        <MenuSection />
        <TiffinsSection />
        <SpecialsSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 right-6 z-40 bg-restaurant-yellow text-restaurant-black p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 hover:rotate-12 opacity-0 translate-y-10 animate-fade-in"
        style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
