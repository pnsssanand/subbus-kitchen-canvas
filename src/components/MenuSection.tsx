
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType, useMenuItems } from '../firebase/hooks';

const MenuSection = () => {
  const { menuItems, loading } = useMenuItems();
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (menuItems.length > 0) {
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
      setCategories(uniqueCategories);
      
      // Set default category if we haven't yet
      if (activeCategory === 'all' && uniqueCategories.length > 0) {
        setActiveCategory(uniqueCategories[0]);
        const initialFilteredItems = menuItems.filter(item => item.category === uniqueCategories[0]);
        setFilteredItems(initialFilteredItems);
      }
    }
  }, [menuItems]);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category === activeCategory);
      setFilteredItems(filtered);
    }
  }, [activeCategory, menuItems]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // For demo data in case Firebase data isn't loaded yet
  const demoItems = [
    { id: '1', name: 'Chicken Fry Pulao', price: 120, category: 'Pulao', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: '2', name: 'Mutton Fry Pulao', price: 250, category: 'Pulao', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: '3', name: 'Chilli Chicken', price: 120, category: 'Non-Veg Starters', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: '4', name: 'Chicken 65', price: 120, category: 'Non-Veg Starters', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: '5', name: 'Mixed Pulao', price: 260, category: 'Pulao', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { id: '6', name: 'Dragon Chicken', price: 120, category: 'Non-Veg Starters', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
  ];

  const displayItems = loading || filteredItems.length === 0 ? demoItems : filteredItems;
  const displayCategories = categories.length > 0 ? categories : ['Pulao', 'Non-Veg Starters'];

  return (
    <section id="menu" className="section-padding bg-restaurant-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our <span className="text-restaurant-yellow">Menu</span></h2>
          <div className="mx-auto w-24 h-1 bg-restaurant-yellow mb-6"></div>
          <p className="max-w-2xl mx-auto">
            Discover our wide range of authentic dishes prepared with the freshest ingredients and traditional recipes.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {displayCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-restaurant-yellow text-restaurant-black font-semibold'
                  : 'bg-restaurant-gray hover:bg-opacity-70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems
            .filter(item => activeCategory === 'all' || item.category === activeCategory)
            .map((item) => (
              <div key={item.id} className="animate-fade-in">
                <MenuItem
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  isSpecial={item.isSpecial}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
