
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-cake-700 flex items-center">
              <span>Cake-O</span>
              <span className="text-cake-500">Saurus</span>
            </Link>
            <p className="text-gray-600 max-w-xs">
              Crafting delicious moments with artisanal cakes and desserts for all your special occasions.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-cake-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-cake-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-cake-500 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-cake-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=birthday" className="text-gray-600 hover:text-cake-500 transition-colors">Birthday Cakes</Link>
              </li>
              <li>
                <Link to="/products?category=wedding" className="text-gray-600 hover:text-cake-500 transition-colors">Wedding Cakes</Link>
              </li>
              <li>
                <Link to="/products?category=custom" className="text-gray-600 hover:text-cake-500 transition-colors">Custom Cakes</Link>
              </li>
              <li>
                <Link to="/products?category=party" className="text-gray-600 hover:text-cake-500 transition-colors">Party Supplies</Link>
              </li>
              <li>
                <Link to="/products?category=tools" className="text-gray-600 hover:text-cake-500 transition-colors">Baking Tools</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cake-500 mr-2 mt-0.5" />
                <span className="text-gray-600">123 Bakery Street, Sweet City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-cake-500 mr-2" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-cake-500 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-cake-500 mr-2" />
                <a href="mailto:info@cakeosaur.us" className="text-gray-600 hover:text-cake-500 transition-colors">
                  info@cakeosaur.us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Cake-O-Saurus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-cake-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-cake-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
