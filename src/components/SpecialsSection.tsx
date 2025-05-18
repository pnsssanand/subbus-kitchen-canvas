
import { useSpecialMenuItems } from '../firebase/hooks';
import MenuItem from './MenuItem';

const SpecialsSection = () => {
  const { specialItems, loading } = useSpecialMenuItems();
  
  // Demo data in case Firebase isn't loaded
  const demoSpecials = [
    { id: '1', name: 'Donne Chicken Fry Pulao', price: 130, category: 'Donne Pulao', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', isSpecial: true },
    { id: '2', name: 'Chicken 65', price: 120, category: 'Non-Veg Starters', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', isSpecial: true },
    { id: '3', name: 'Prawn Manchurian', price: 150, category: 'Non-Veg Starters', imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', isSpecial: true },
  ];

  const displayItems = loading || specialItems.length === 0 ? demoSpecials : specialItems;

  return (
    <section id="special" className="section-padding bg-restaurant-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Today's <span className="text-restaurant-yellow">Specials</span></h2>
          <div className="mx-auto w-24 h-1 bg-restaurant-yellow mb-6"></div>
          <p className="max-w-2xl mx-auto">
            Our chef's special recommendations that you shouldn't miss today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div key={item.id} className="animate-fade-in">
              <MenuItem
                name={item.name}
                price={item.price}
                description={item.description}
                imageUrl={item.imageUrl}
                isSpecial={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialsSection;
