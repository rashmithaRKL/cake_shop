
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        >
          <source 
            src="https://player.vimeo.com/progressive_redirect/playback/815162673/rendition/1080p/file.mp4?loc=external&signature=fdc9468ee2dff01d7bbd9b4eaa9003ff8ef24c6313ae07b28c3fb4af8547673b" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 pt-24 sm:pt-32">
        <div className="max-w-3xl">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 opacity-0"
            style={{ transitionDelay: '200ms' }}
          >
            Artisanal Cakes for 
            <span className="text-cake-300 block mt-2">Unforgettable Moments</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-8 opacity-0"
            style={{ transitionDelay: '400ms' }}
          >
            Handcrafted with love and premium ingredients for your special occasions. 
            Elevate your celebrations with our exquisite designs.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 opacity-0"
            style={{ transitionDelay: '600ms' }}
          >
            <Link 
              to="/products" 
              className="bg-cake-500 hover:bg-cake-600 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/contact" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
