
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import SpecialsSection from '../components/SpecialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  // Animation on scroll effect
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
  
  // Update page metadata
  useEffect(() => {
    document.title = "Subbu's Kitchen – Best Non‑Veg Starters & Pulao in Kakinada";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "₹120 Starters, ₹200–₹380 Donne Pulaos. Dynamic dine-in & delivery across Kakinada.");
    
    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', "Subbu's Kitchen – Best Non‑Veg Starters & Pulao in Kakinada");
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', "₹120 Starters, ₹200–₹380 Donne Pulaos. Dynamic dine-in & delivery across Kakinada.");
  }, []);

  return (
    <div className="bg-restaurant-black min-h-screen">
      <Navbar />
      <Hero />
      
      <main>
        <MenuSection />
        <SpecialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
