
import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState({
    map: false,
    form: false,
    info: false
  });
  
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === mapRef.current) {
            setIsVisible(prev => ({ ...prev, map: true }));
          } else if (entry.target === formRef.current) {
            setIsVisible(prev => ({ ...prev, form: true }));
          } else if (entry.target === infoRef.current) {
            setIsVisible(prev => ({ ...prev, info: true }));
          }
        }
      });
    }, observerOptions);
    
    if (mapRef.current) observer.observe(mapRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    
    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent successfully!");
      
      // Reset form after a delay
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-cake-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in animate-delay-100">
              We'd love to hear from you. Get in touch with our team for inquiries, custom orders, or feedback.
            </p>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section 
        ref={mapRef}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`glass-card overflow-hidden rounded-2xl h-96 ${isVisible.map ? 'animate-fade-in' : 'opacity-0'}`}>
            <iframe 
              title="Cake-O-Saurus Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369674846028!3d40.71277447933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1637150706452!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-12 bg-cake-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formRef} 
              className={isVisible.form ? 'animate-fade-in' : 'opacity-0'}
            >
              <div className="glass-card">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cake-500 focus:border-cake-500 transition-colors"
                        disabled={submitting || submitted}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cake-500 focus:border-cake-500 transition-colors"
                        disabled={submitting || submitted}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cake-500 focus:border-cake-500 transition-colors"
                      disabled={submitting || submitted}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cake-500 focus:border-cake-500 transition-colors resize-none"
                      disabled={submitting || submitted}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting || submitted}
                    className="w-full bg-cake-500 hover:bg-cake-600 disabled:bg-cake-300 text-white py-3 rounded-full flex items-center justify-center transition-colors duration-300 font-medium"
                  >
                    {submitting ? (
                      <>
                        <div className="mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <Check className="mr-2 h-5 w-5 animate-scale-in" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div 
              ref={infoRef} 
              className={isVisible.info ? 'animate-fade-in animate-delay-100' : 'opacity-0'}
            >
              <div className="glass-card h-full">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-cake-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-cake-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        123 Bakery Street<br />
                        Sweet City, SC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-cake-100 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-cake-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-1">
                        <a href="tel:+15551234567" className="hover:text-cake-600 transition-colors">
                          (555) 123-4567
                        </a>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Mon-Fri: 9:00 AM - 6:00 PM<br />
                        Sat-Sun: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-cake-100 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-cake-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-1">
                        <a href="mailto:info@cakeosaur.us" className="hover:text-cake-600 transition-colors">
                          info@cakeosaur.us
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:orders@cakeosaur.us" className="hover:text-cake-600 transition-colors">
                          orders@cakeosaur.us
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                  <table className="w-full text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-2">Monday - Friday</td>
                        <td className="py-2 text-right">9:00 AM - 6:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2">Saturday</td>
                        <td className="py-2 text-right">10:00 AM - 4:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2">Sunday</td>
                        <td className="py-2 text-right">10:00 AM - 4:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to the most common questions about our cakes and services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto glass-card">
            <div className="divide-y divide-gray-100">
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Do you deliver cakes?</h3>
                <p className="text-gray-600">
                  Yes, we offer delivery services within the city limits for a small fee. For locations outside the city, please contact us for custom delivery options.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">How far in advance should I order a custom cake?</h3>
                <p className="text-gray-600">
                  For custom cakes, we recommend placing your order at least 2 weeks in advance. For wedding cakes, we suggest 3-6 months advance booking to ensure availability.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Do you cater to dietary restrictions?</h3>
                <p className="text-gray-600">
                  Yes, we offer gluten-free, dairy-free, and vegan options. Please specify your dietary requirements when placing an order, and we'll accommodate your needs.
                </p>
              </div>
              
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Can I provide my own design for a custom cake?</h3>
                <p className="text-gray-600">
                  Absolutely! We welcome your ideas and can work from photos, sketches, or descriptions. Our designers will collaborate with you to bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
