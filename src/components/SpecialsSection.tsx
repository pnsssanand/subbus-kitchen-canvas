import { useSpecialMenuItems } from '../firebase/hooks';
import MenuItem from './MenuItem';

const SpecialsSection = () => {
  const { specialItems, loading } = useSpecialMenuItems();
  
  // Demo data in case Firebase isn't loaded
  const demoSpecials = [
    { 
      id: '1', 
      name: 'Donne Chicken Fry Pulao', 
      price: 130, 
      category: 'Donne Pulao', 
      imageUrl: 'https://c8.alamy.com/comp/2G6CN80/chicken-fried-rice-2G6CN80.jpg', 
      isSpecial: true,
      description: 'Our signature dish - aromatic chicken pulao with secret spice blend'
    },
    { 
      id: '2', 
      name: 'Chicken 65', 
      price: 120, 
      category: 'Non-Veg Starters', 
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj4IToB1rYOK7gZVizwWtX6PAJvi9oXPprDzNYG_h8RrKVvEHhqLFb_mrim2oCB4M2cDKIOxC5KyoM4NZDrQKxoI4nbXmchD1qc8wBCXgJPADhwke1ZCkWu6MLDlj8okEwOurD-PDQaZs/w691-h484/chicken+65+4.JPG', 
      isSpecial: true,
      description: 'Crispy and flavorful chicken 65 - a customer favorite'
    },
    { 
      id: '3', 
      name: 'Dragon Chicken', 
      price: 150, 
      category: 'Non-Veg Starters', 
      imageUrl: 'https://aromaticessence.co/wp-content/uploads/2022/04/dragon_chicken_dry_version_1.jpg', 
      isSpecial: true,
      description: 'Fiery and delicious dragon chicken with our chef\'s special sauce'
    },
  ];

  const displayItems = loading || specialItems.length === 0 ? demoSpecials : specialItems;

  return (
    <section id="special" className="section-padding bg-restaurant-black relative">
      {/* Premium background effect */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-restaurant-yellow/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-restaurant-yellow/5 to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Today's <span className="text-restaurant-yellow relative inline-block">Specials
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-restaurant-yellow transform transition-all duration-300"></span>
          </span></h2>
          <div className="mx-auto w-24 h-1 bg-restaurant-yellow mb-8 transform transition-all duration-500 hover:w-32"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Our chef's special recommendations that you shouldn't miss today. Crafted with premium ingredients and exceptional skill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <div key={item.id} 
              className="animate-fade-in hover:transform hover:scale-[1.03] transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-restaurant-yellow text-restaurant-black text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    CHEF'S CHOICE
                  </div>
                </div>
                <MenuItem
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  isSpecial={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialsSection;
