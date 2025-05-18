
import { useState } from 'react';

export interface MenuItemProps {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

const MenuItem = ({ name, price, description, imageUrl, isSpecial = false }: MenuItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="menu-card">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-restaurant-dark flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {isSpecial && (
          <div className="absolute top-2 right-0 bg-restaurant-yellow text-restaurant-black px-3 py-1 font-bold text-sm transform -skew-x-12">
            <span className="block transform skew-x-12">Special</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold mr-2">{name}</h3>
          <span className="text-restaurant-yellow font-bold whitespace-nowrap">₹{price}/-</span>
        </div>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
