
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
                    vanga geetha apartment, NFCL Rd, opposite stadium complex, Krishna Nagar, Ramanayapeta, Kakinada, Andhra Pradesh 533005
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
                    11:00 AM - 11:00 PM<br />
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
              {/* We'll embed a real map here - using a placeholder for now */}
              <iframe
                title="Subbu's Kitchen Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.854579988978!2d82.24651237492503!3d16.98170188383791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3829568a792d93%3A0x344e9f5c563f7732!2sSubbu%E2%80%99s%20kitchen!5e0!3m2!1sen!2sin!4v1747753835100!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
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
