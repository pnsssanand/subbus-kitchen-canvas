import React, { useState } from 'react';

interface MenuItemProps {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description, imageUrl, isSpecial = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`bg-restaurant-gray rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 ${isSpecial ? 'border-2 border-restaurant-yellow/30' : ''}`}>
      <div className="relative h-56 overflow-hidden">
        {/* Default placeholder if no image provided */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-restaurant-black/70 z-10"></div>
        
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9'} 
          alt={name} 
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {isSpecial && (
          <div className="absolute top-4 left-0 bg-restaurant-yellow text-restaurant-black px-4 py-1 z-20 shadow-lg transform -skew-x-12">
            <span className="transform skew-x-12 inline-block font-semibold">Special</span>
          </div>
        )}
        
        <div className="absolute bottom-0 right-0 py-2 px-4 bg-restaurant-black/80 backdrop-blur-sm z-20 rounded-tl-lg">
          <span className="text-lg font-bold text-restaurant-yellow">₹{price}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 group-hover:text-restaurant-yellow transition-colors duration-300">{name}</h3>
        {description && <p className="text-gray-300 text-sm">{description}</p>}
        
        <div className="mt-4 flex justify-between items-center">
          <button className="text-sm uppercase font-medium text-restaurant-yellow hover:text-white transition-colors duration-300 flex items-center gap-1">
            Order Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < 5 ? 'text-restaurant-yellow' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
