
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Truck } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getBestSellers } from '../data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  
  const [isVisible, setIsVisible] = useState({
    features: false,
    products: false,
    testimonials: false,
    cta: false
  });
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === featuresRef.current) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === productsRef.current) {
            setIsVisible(prev => ({ ...prev, products: true }));
          } else if (entry.target === testimonialsRef.current) {
            setIsVisible(prev => ({ ...prev, testimonials: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (productsRef.current) observer.observe(productsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);
  
  const features = [
    {
      icon: <Award className="h-10 w-10 text-cake-500" />,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients, sourced locally whenever possible.'
    },
    {
      icon: <Heart className="h-10 w-10 text-cake-500" />,
      title: 'Made with Love',
      description: 'Every cake is handcrafted with attention to detail and passion.'
    },
    {
      icon: <Truck className="h-10 w-10 text-cake-500" />,
      title: 'Fast Delivery',
      description: 'Same-day delivery available for orders placed before noon.'
    }
  ];
  
  const testimonials = [
    {
      quote: "The wedding cake exceeded all our expectations. Not only was it stunning, but it was the most delicious cake we've ever tasted!",
      author: "Emily & James",
      role: "Newlyweds"
    },
    {
      quote: "I've ordered multiple birthday cakes from Cake-O-Saurus and they always deliver perfection. My kids love the designs!",
      author: "Sarah Thompson",
      role: "Loyal Customer"
    },
    {
      quote: "Their custom cake for our company event left everyone impressed. Professional service and incredible attention to detail.",
      author: "Michael Rodriguez",
      role: "Event Manager"
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.features ? 'animate-fade-in' : 'opacity-0'}`}>
              Why Choose Our Cakes?
            </h2>
            <p className={`text-xl text-gray-600 ${isVisible.features ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
              We combine artistry with taste to create memorable dessert experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`glass-card flex flex-col items-center text-center p-8 ${isVisible.features ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="mb-5 p-3 bg-cake-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section 
        ref={productsRef} 
        className="py-20 bg-gradient-to-b from-white to-cake-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.products ? 'animate-fade-in' : 'opacity-0'}`}>
                Featured Creations
              </h2>
              <p className={`text-xl text-gray-600 max-w-2xl ${isVisible.products ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
                Explore our most popular and signature cakes loved by our customers
              </p>
            </div>
            <Link 
              to="/products" 
              className={`mt-4 md:mt-0 inline-flex items-center text-cake-600 font-medium hover:text-cake-700 transition-colors ${isVisible.products ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={isVisible.products ? 'animate-fade-in' : 'opacity-0'}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <ProductCard product={product} featured={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef} 
        className="py-20 bg-cake-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.testimonials ? 'animate-fade-in' : 'opacity-0'}`}>
              What Our Customers Say
            </h2>
            <p className={`text-xl text-gray-600 ${isVisible.testimonials ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
              Don't just take our word for it – hear from our happy customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`glass-card p-8 ${isVisible.testimonials ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="mb-6 text-cake-600">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">★</span>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto glass-card bg-gradient-to-r from-cake-500/10 to-cake-100/30 p-10 sm:p-16 text-center ${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Order Your Dream Cake?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              From birthdays to weddings and everything in between, we've got the perfect cake for your special occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-cake-500 hover:bg-cake-600 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                to="/contact" 
                className="bg-white hover:bg-gray-50 text-cake-700 border border-cake-200 py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
