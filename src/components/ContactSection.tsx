import { Phone, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-restaurant-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">  
          {/* Information side */}
          <div className="animate-fade-in">
            <h2 className="section-title">Contact <span className="text-restaurant-yellow">Us</span></h2>
            <p className="mb-8">
              We'd love to hear from you! Reach out to us for reservations, catering inquiries, or any questions you may have.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                  <a href="tel:9160155777" className="text-lg text-restaurant-yellow hover:underline">
                    +919160155777
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                  <p className="text-lg text-gray-300">
                    anna canteen opposite, salipeta 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-restaurant-yellow text-restaurant-black flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Opening Hours</h3>
                  <p className="text-lg text-gray-300">
                    05:00 AM - 11:00 PM<br />
                    <span className="text-sm text-gray-400">Open 7 days a week</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Order Online</h3>
              <div className="flex gap-4">
                <button className="btn-outline">
                  <span>Swiggy</span>
                </button>
                <button className="btn-outline">
                  <span>Zomato</span>
                </button>
              </div>
            </div>
          </div>

          {/* Map side */}
          <div className="h-[400px] lg:h-auto animate-fade-in-right">
            <div className="bg-restaurant-gray w-full h-full rounded-lg overflow-hidden shadow-lg">
              {/* Google Maps embed */}
              <iframe
                title="Subbu's Kitchen Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.2988574903206!2d82.23150557437876!3d16.959843714982608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3829de87044203%3A0x9fb6d7370920e536!2sJEMINI%20TIFFIN!5e0!3m2!1sen!2snl!4v1749565083566!5m2!1sen!2snl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
