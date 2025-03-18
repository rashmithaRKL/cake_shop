
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    story: false,
    mission: false,
    team: false,
    process: false,
    cta: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === storyRef.current) {
            setIsVisible(prev => ({ ...prev, story: true }));
          } else if (entry.target === missionRef.current) {
            setIsVisible(prev => ({ ...prev, mission: true }));
          } else if (entry.target === teamRef.current) {
            setIsVisible(prev => ({ ...prev, team: true }));
          } else if (entry.target === processRef.current) {
            setIsVisible(prev => ({ ...prev, process: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (storyRef.current) observer.observe(storyRef.current);
    if (missionRef.current) observer.observe(missionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (storyRef.current) observer.unobserve(storyRef.current);
      if (missionRef.current) observer.unobserve(missionRef.current);
      if (teamRef.current) observer.unobserve(teamRef.current);
      if (processRef.current) observer.unobserve(processRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);
  
  const team = [
    {
      name: 'Emily Chen',
      role: 'Head Pastry Chef',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'With over 15 years of experience in fine pastry, Emily brings creativity and precision to every creation.'
    },
    {
      name: 'Michael Torres',
      role: 'Cake Designer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Michael specializes in structural cake design, turning your wildest cake dreams into reality.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Customer Experience Manager',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      bio: 'Sarah ensures that every customer has a seamless and delightful experience from order to delivery.'
    }
  ];
  
  const process = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We discuss your vision, preferences, dietary needs, and event details to create the perfect cake concept.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our designers create a custom cake design based on your ideas and our expertise.'
    },
    {
      number: '03',
      title: 'Crafting',
      description: 'Using premium ingredients, our skilled bakers and decorators bring your cake to life with meticulous attention to detail.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'We carefully deliver your cake to ensure it arrives in perfect condition for your special occasion.'
    }
  ];
  
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="py-24 bg-cake-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isVisible.hero ? 'animate-fade-in' : 'opacity-0'}`}
            >
              Our Sweet Journey
            </h1>
            <p 
              className={`text-xl text-gray-600 mb-8 ${isVisible.hero ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}
            >
              From humble beginnings to becoming the city's premier cake destination, discover the passion behind Cake-O-Saurus.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <div className="absolute -right-20 top-1/4 w-96 h-96 bg-cake-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute right-20 bottom-1/3 w-64 h-64 bg-cake-300 rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section 
        ref={storyRef} 
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={isVisible.story ? 'animate-fade-in' : 'opacity-0'}>
              <img 
                src="https://images.unsplash.com/photo-1560156710-0580247f9f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Bakery Interior" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isVisible.story ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
                Our Story
              </h2>
              <div className={`space-y-4 text-gray-700 ${isVisible.story ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
                <p>
                  Cake-O-Saurus was born in 2010 from founder Emily Chen's passion for creating artful, delicious desserts that bring joy to special moments.
                </p>
                <p>
                  What started as a small home kitchen operation quickly grew as word spread about our unique designs and exceptional taste. By 2015, we opened our first brick-and-mortar bakery in the heart of the city.
                </p>
                <p>
                  Today, we're proud to be a team of 15 passionate cake artists, bakers, and customer service specialists dedicated to making your celebrations unforgettable through the art of cake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values Section */}
      <section 
        ref={missionRef} 
        className="py-20 bg-gradient-to-b from-white to-cake-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.mission ? 'animate-fade-in' : 'opacity-0'}`}>
              Our Mission & Values
            </h2>
            <p className={`text-xl text-gray-600 ${isVisible.mission ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
              Guided by passion and commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`glass-card ${isVisible.mission ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on ingredients or execution. Every cake is made with premium ingredients and meticulous attention to detail.
              </p>
            </div>
            
            <div className={`glass-card ${isVisible.mission ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold mb-4">Creative Excellence</h3>
              <p className="text-gray-600">
                We push the boundaries of cake design while maintaining the highest standards of taste and structure.
              </p>
            </div>
            
            <div className={`glass-card ${isVisible.mission ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
              <h3 className="text-xl font-semibold mb-4">Customer Delight</h3>
              <p className="text-gray-600">
                We measure our success by the joy our creations bring to our customers' special moments and celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section 
        ref={teamRef} 
        className="py-20 bg-cake-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.team ? 'animate-fade-in' : 'opacity-0'}`}>
              Meet Our Team
            </h2>
            <p className={`text-xl text-gray-600 ${isVisible.team ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
              The talented people behind our delicious creations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className={`glass-card overflow-hidden ${isVisible.team ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-cake-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Process Section */}
      <section 
        ref={processRef} 
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isVisible.process ? 'animate-fade-in' : 'opacity-0'}`}>
              Our Process
            </h2>
            <p className={`text-xl text-gray-600 ${isVisible.process ? 'animate-fade-in animate-delay-100' : 'opacity-0'}`}>
              How we turn your cake dreams into delicious reality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div 
                key={index} 
                className={`glass-card ${isVisible.process ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <span className="text-4xl font-bold text-cake-200">{step.number}</span>
                <h3 className="text-xl font-semibold mt-2 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-20 bg-cake-50"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto glass-card bg-gradient-to-r from-cake-500/10 to-cake-100/30 p-10 sm:p-16 text-center ${isVisible.cta ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Create Something Sweet Together</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to bring your cake vision to life? Browse our collection or contact us for a custom creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-cake-500 hover:bg-cake-600 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                to="/contact" 
                className="bg-white hover:bg-gray-50 text-cake-700 border border-cake-200 py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
