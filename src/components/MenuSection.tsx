import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../types/menu';
import { useMenuItems } from '../firebase/hooks';

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
        setFilteredItems(initialFilteredItems as MenuItemType[]);
      }
    }
  }, [menuItems]);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems as MenuItemType[]);
    } else {
      const filtered = menuItems.filter(item => item.category === activeCategory);
      setFilteredItems(filtered as MenuItemType[]);
    }
  }, [activeCategory, menuItems]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // For demo data in case Firebase data isn't loaded yet
  const demoItems: MenuItemType[] = [
    { 
      id: '1', 
      name: 'Chicken Fry Pulao', 
      price: 120, 
      category: 'Pulao', 
      imageUrl: 'https://c8.alamy.com/comp/2G6CN80/chicken-fried-rice-2G6CN80.jpg', 
      description: 'Delicious chicken pulao prepared with aromatic spices and tender chicken pieces', 
      isSpecial: false 
    },
    { 
      id: '2', 
      name: 'Mutton Fry Pulao', 
      price: 250, 
      category: 'Pulao', 
      imageUrl: 'https://img-global.cpcdn.com/recipes/1ccc28366fafd4c7/680x482cq70/mutton-fried-rice-recipe-main-photo.jpg', 
      description: 'Premium mutton pulao with succulent meat and fragrant basmati rice', 
      isSpecial: false 
    },
    { 
      id: '3', 
      name: 'Chilli Chicken', 
      price: 120, 
      category: 'Non-Veg Starters', 
      imageUrl: 'https://mymorningmocha.com/wp-content/uploads/2023/06/Honey-chilli-chicken-recipe.jpg', 
      description: 'Spicy chilli chicken with a perfect balance of heat and flavor', 
      isSpecial: false 
    },
    { 
      id: '4', 
      name: 'Chicken 65', 
      price: 120, 
      category: 'Non-Veg Starters', 
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj4IToB1rYOK7gZVizwWtX6PAJvi9oXPprDzNYG_h8RrKVvEHhqLFb_mrim2oCB4M2cDKIOxC5KyoM4NZDrQKxoI4nbXmchD1qc8wBCXgJPADhwke1ZCkWu6MLDlj8okEwOurD-PDQaZs/w691-h484/chicken+65+4.JPG', 
      description: 'Classic chicken 65 - crispy, spicy, and bursting with flavor', 
      isSpecial: false 
    },
    { 
      id: '5', 
      name: 'Mixed Pulao', 
      price: 260, 
      category: 'Pulao', 
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCx4Ps3cSHwpPObWOd6ifCQAnoAjc1ff4mXNtzZp2xH4cmgC3LrN1QMthlwebn4cIBxTnD7sKmxcvDXf0Icrkl9YEnM_Nf0YY3vTVpPi5aX2jHZpE7OdNsa6otz3Pn1EoQbLSfyzhiuBL0BGKlvBJ4uVGbKFfGEdUzCIy7kpiWXk6GddI2XlT4_4R95bA/s16000/maxresdefault.jpg', 
      description: 'Exquisite mixed pulao with premium meats and aromatic spices', 
      isSpecial: false 
    },
    { 
      id: '6', 
      name: 'Dragon Chicken', 
      price: 120, 
      category: 'Non-Veg Starters', 
      imageUrl: 'https://aromaticessence.co/wp-content/uploads/2022/04/dragon_chicken_dry_version_1.jpg', 
      description: 'Fiery dragon chicken with a perfect blend of spices and sauces', 
      isSpecial: false 
    },
  ];

  const displayItems = loading || filteredItems.length === 0 ? demoItems : filteredItems;
  const displayCategories = categories.length > 0 ? categories : ['Pulao', 'Non-Veg Starters'];

  return (
    <section id="menu" className="section-padding bg-restaurant-dark relative overflow-hidden">
      {/* Background pattern for premium look */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="mb-4 text-4xl md:text-5xl font-bold">Our <span className="text-restaurant-yellow relative inline-block">
            Menu
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-restaurant-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </span></h2>
          <div className="mx-auto w-24 h-1 bg-restaurant-yellow mb-8 transform transition-all duration-500 hover:w-32"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Discover our wide range of authentic dishes prepared with the freshest ingredients and traditional recipes.
          </p>
        </div>

        {/* Category tabs - enhanced with animations */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal">
          {displayCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-glow ${
                activeCategory === category
                  ? 'bg-restaurant-yellow text-restaurant-black font-semibold shadow-md'
                  : 'bg-restaurant-gray hover:bg-opacity-70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu items grid - with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems
            .filter(item => activeCategory === 'all' || item.category === activeCategory)
            .map((item, index) => (
              <div 
                key={item.id} 
                className="animate-fade-in hover:transform hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
