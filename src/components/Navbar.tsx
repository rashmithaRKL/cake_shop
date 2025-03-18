
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
        isMenuOpen ? 'bg-white' : ''
      )}
    >
      <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl sm:text-3xl font-bold text-cake-700 flex items-center"
          aria-label="Cake-O-Saurus"
        >
          <span className="animate-fade-in">Cake-O</span>
          <span className="text-cake-500 animate-fade-in animate-delay-100">Saurus</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-cake-500 relative link-underline',
                location.pathname === link.path ? 'text-cake-600' : 'text-gray-700'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Cart & Mobile Menu Toggle */}
        <div className="flex items-center">
          <Link 
            to="/cart" 
            className="relative p-2 mr-2 text-gray-700 hover:text-cake-500 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-cake-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-cake-500 transition-colors md:hidden"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2 font-medium transition-colors hover:text-cake-500',
                  location.pathname === link.path ? 'text-cake-600' : 'text-gray-700'
                )}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
