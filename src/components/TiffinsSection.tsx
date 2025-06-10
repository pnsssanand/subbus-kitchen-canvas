import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

type TiffinItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

const TiffinsSection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  
  const tiffinItems: TiffinItem[] = [
    {
      id: 'idly',
      name: 'Idly',
      description: 'Soft, fluffy steamed rice cakes, a staple South Indian breakfast. Served with sambar and varieties of chutneys for a nutritious start to your day.',
      imageUrl: 'https://southindianstore.com/wp-content/uploads/2018/06/breakfast-2408818_1920.jpg',
      price: 40
    },
    {
      id: 'vada',
      name: 'Vada',
      description: 'Crispy, savory lentil fritters with a crunchy exterior and soft interior. Traditionally served with sambar and coconut chutney for a satisfying breakfast or snack.',
      imageUrl: 'https://www.dosanchutney.com/cdn/shop/articles/12_mini_Sambar_Idly.png?v=1681582133',
      price: 50
    },
    {
      id: 'pesarattu',
      name: 'Pesarattu',
      description: 'A healthy, protein-rich green gram dosa from Andhra Pradesh, served with ginger chutney. Offers a unique flavor profile and excellent nutritional benefits.',
      imageUrl: 'https://i.ytimg.com/vi/c0PQz7TF4RQ/maxresdefault.jpg',
      price: 60
    },
    {
      id: 'mysorebajji',
      name: 'Mysore Bajji',
      description: 'Fluffy, deep-fried fritters from Mysore, made with maida and yogurt, known for their unique taste and soft texture. Best enjoyed hot with chutney.',
      imageUrl: 'https://www.awesomecuisine.com/wp-content/uploads/2016/04/mysore-bonda-500x500.jpg',
      price: 55
    },
    {
      id: 'ravadosa',
      name: 'Rava Dosa',
      description: 'A crispy, lacy semolina-based dosa, distinct for its airy texture. Garnished with onions and green chilies, served with chutney and sambar for a delightful meal.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6tRhsHb8-D9ByrKLTXmBFsopaYUrXe4fTw&s',
      price: 70
    }
  ];

  return (
    <section id="tiffins" className="section-padding bg-restaurant-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full border border-restaurant-yellow"></div>
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full border border-restaurant-yellow"></div>
        <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full border border-restaurant-yellow"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="mb-4">
            South Indian <span className="text-restaurant-yellow">Tiffins</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-restaurant-yellow mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg">
            Discover our authentic South Indian breakfast delights, crafted with fresh ingredients and traditional 
            recipes. Perfect for a quick, healthy, and delicious start to your day or as a light evening snack.
          </p>
        </div>

        {/* Tiffin Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiffinItems.map((item) => (
            <div 
              key={item.id}
              className="group reveal"
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="bg-restaurant-dark border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-restaurant-yellow hover:shadow-[0_5px_30px_rgba(255,221,0,0.15)] h-full">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${activeCard === item.id ? 'scale-110' : 'scale-100'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-restaurant-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-restaurant-yellow text-restaurant-black px-3 py-1 rounded-full text-sm font-semibold">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                  <p className="text-gray-400 mb-5">{item.description}</p>
                  <button className="flex items-center text-restaurant-yellow hover:text-white gap-2 transition-colors group-hover:gap-3">
                    <span>Order Now</span>
                    <ArrowRight size={16} className="transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Our Tiffins */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Choose Our Tiffins?</h3>
            <ul className="space-y-4">
              {[
                'Authentic South Indian flavors prepared by expert chefs',
                'Made with freshly sourced ingredients every morning',
                'Healthy and wholesome options rich in nutrients',
                'Convenient for breakfast, lunch, or a light dinner',
                'Wide variety of traditional dishes to choose from'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full min-h-[300px]">
            <div className="absolute top-0 left-0 w-[80%] h-[80%] z-10">
              <img 
                src="https://static.displate.com/857x1200/displate/2022-06-06/3cdcc41b0887bd3eb2fa656c185d04f3_89dce8e6a36a4b79e295a224d3a2f301.jpg" 
                alt="South Indian Tiffin Spread" 
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[70%]">
              <img 
                src="https://static.toiimg.com/thumb/msid-70519122,width-1280,resizemode-4/70519122.jpg" 
                alt="Variety of Tiffins" 
                className="w-full h-full object-cover rounded-lg shadow-xl border-4 border-restaurant-black"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 reveal">
          <a href="#menu" className="btn-primary inline-flex items-center gap-2">
            <span>Explore Our Complete Menu</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TiffinsSection;
