import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingBeans from '@/components/FloatingBeans';
import ParticleBackground from '@/components/ParticleBackground';
import MenuCard from '@/components/MenuCard';
import TestimonialCard from '@/components/TestimonialCard';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Coffee,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Play,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Smartphone,
  Menu,
  X,
  Code,
  Download,
  ArrowRight
} from 'lucide-react';

export default function CoffeeLoverHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter', { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setNewsletterEmail('');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      newsletterMutation.mutate(newsletterEmail);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    {
      name: "Espresso",
      description: "Rich, bold, and perfectly extracted shot of pure coffee essence. The foundation of all great coffee experiences.",
      price: "$4.99",
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Americano", 
      description: "Smooth and clean coffee flavor with the perfect balance of strength and smoothness. A classic choice for purists.",
      price: "$3.99",
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Cappuccino",
      description: "Creamy perfection with steamed milk and foam art. The ideal harmony of espresso, steamed milk, and velvety foam.",
      price: "$5.99", 
      imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    }
  ];

  const testimonials = [
    {
      name: "Sabir Ali",
      review: "The coffee here is absolutely amazing! The baristas know exactly how to craft the perfect cup. It's become my daily ritual and I couldn't be happier with the quality and service.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Dipankar Kumar",
      review: "As a developer, this place has become my second office. Great WiFi, amazing coffee, and the perfect atmosphere for coding. The mobile app makes ordering so convenient!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Satya Narayan",
      review: "The premium blend is exceptional! You can taste the quality in every sip. The staff is knowledgeable and always recommends the perfect drink for my mood.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Dilshad",
      review: "The ambiance is perfect for meetings and the coffee quality is consistently excellent. I love how they've combined traditional coffee culture with modern convenience.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  const handleAddToCart = (itemName: string) => {
    toast({
      title: "Added to Cart!",
      description: `${itemName} has been added to your order.`,
    });
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingBeans />
      <ParticleBackground />

      {/* Header */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-20 shadow-lg' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        data-testid="navigation-bar"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Coffee className="w-8 h-8 text-primary" data-testid="logo-icon" />
            </motion.div>
            <span className="font-serif font-bold text-2xl text-foreground">Coffee Cafe</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-foreground hover:text-primary transition-colors font-medium relative group" 
              data-testid="nav-home"
            >
              Home
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-foreground hover:text-primary transition-colors font-medium relative group" 
              data-testid="nav-services"
            >
              Services
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-foreground hover:text-primary transition-colors font-medium relative group" 
              data-testid="nav-about"
            >
              About
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </button>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium" 
              data-testid="button-order-now-nav"
            >
              Order
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 p-4 bg-card rounded-lg shadow-lg" 
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('home')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-home">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-services">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-about">About</button>
              <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium mt-3" data-testid="button-order-now-mobile">
                Order
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" 
        data-testid="hero-section"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Beautiful coffee beans background" 
            className="w-full h-full object-cover opacity-20"
            data-testid="hero-background-image"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div variants={fadeInUpVariants}>
            <motion.h1 
              className="font-serif text-6xl md:text-8xl font-bold text-foreground leading-tight mb-8" 
              data-testid="hero-title"
            >
              We serve the 
              <motion.span 
                className="text-primary block"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255, 153, 51, 0.5)",
                    "0 0 20px rgba(255, 153, 51, 0.8)",
                    "0 0 0px rgba(255, 153, 51, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                richest Coffee
              </motion.span>
              in the city
            </motion.h1>
          </motion.div>

          <motion.div
            className="mb-12"
            variants={fadeInUpVariants}
          >
            <motion.p 
              className="text-2xl text-muted-foreground flex items-center justify-center gap-3"
              data-testid="hero-subtitle"
            >
              <Code className="w-6 h-6 text-primary" />
              Coffee And Code
            </motion.p>
          </motion.div>

          <motion.div 
            className="mb-16"
            variants={fadeInUpVariants}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
              alt="Premium coffee cup"
              className="w-64 h-64 mx-auto rounded-full object-cover shadow-2xl border-4 border-primary/20"
              data-testid="hero-coffee-image"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <motion.h2 
              className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-8"
              data-testid="hero-coder-title"
            >
              Hey Coder
            </motion.h2>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <motion.h3 
              className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4"
              data-testid="hero-best-coffee"
            >
              Best Coffee
            </motion.h3>
            <motion.h4 
              className="font-serif text-2xl md:text-4xl font-bold text-foreground"
              data-testid="hero-best-coffee-for-you"
            >
              Best Coffee For You
            </motion.h4>
          </motion.div>
        </div>
      </motion.section>

      {/* Menu Section */}
      <motion.section 
        id="services" 
        className="py-20 bg-card relative overflow-hidden" 
        data-testid="menu-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={fadeInUpVariants}
                className="text-center"
              >
                <motion.img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h3 className="font-serif text-3xl font-bold text-card-foreground mb-4">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium Blend Section */}
          <motion.div 
            className="text-center mb-20"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Premium Blend Coffee"
              className="w-64 h-64 mx-auto rounded-full object-cover mb-8 shadow-2xl"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-6">Premium Blend Coffee</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Much like writing code, brewing the perfect cup requires patience, precision, and a dash of passion to create a comforting blend of flavors.
            </p>
            
            <motion.div 
              className="flex justify-center space-x-8 mb-12"
              variants={staggerContainer}
            >
              {["Premium Coffee", "Hot Coffee", "Cold Coffee"].map((type, index) => (
                <motion.div
                  key={type}
                  className="text-center"
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coffee className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-card-foreground font-medium">{type}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tea Lover Section */}
          <motion.div 
            className="text-center"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-6">Tea Lover</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Much like writing code, brewing the perfect cup of tea requires patience, precision, and a dash of passion to create a comforting blend of flavors.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile App Section */}
      <motion.section 
        className="py-20 bg-background relative overflow-hidden" 
        data-testid="mobile-app-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12" 
            data-testid="app-section-title"
            variants={fadeInUpVariants}
          >
            Coffee Cafe is available for 
            <span className="text-primary block">Android and iOS</span>
          </motion.h2>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors" data-testid="button-play-store">
                <Download className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </motion.div>
            
            <motion.div
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors" data-testid="button-app-store">
                <Download className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        id="about" 
        className="py-20 bg-card relative overflow-hidden" 
        data-testid="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUpVariants}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-4" data-testid="testimonials-title">Testimonials</h2>
            <p className="text-muted-foreground text-lg">What our coffee lovers say about us</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                variants={fadeInUpVariants}
              >
                <TestimonialCard
                  name={testimonial.name}
                  review={testimonial.review}
                  rating={testimonial.rating}
                  imageUrl={testimonial.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <motion.div 
            className="flex justify-center items-center mt-12 space-x-2" 
            data-testid="testimonial-navigation"
            variants={fadeInUpVariants}
          >
            {[1, 2, 3, 4].map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="sm"
                className={`w-8 h-8 rounded-full p-0 ${
                  page === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
                data-testid={`testimonial-page-${page}`}
              >
                {page}
              </Button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-16 bg-background border-t border-border"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div variants={fadeInUpVariants}>
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="w-8 h-8 text-primary" />
                <span className="font-serif font-bold text-2xl text-foreground">Coffee Cafe</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Crafted Coffee, Cozy Vibes, Unforgettable Moments – Your Perfect Espresso Escape
              </p>
              <a 
                href="https://www.youtube.com" 
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit our YouTube Channel
              </a>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Important Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">About</button></li>
                <li><button className="text-muted-foreground hover:text-primary transition-colors">Contact</button></li>
                <li><button className="text-muted-foreground hover:text-primary transition-colors">Blog</button></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">About</button></li>
                <li><button className="text-muted-foreground hover:text-primary transition-colors">Contact</button></li>
                <li><button className="text-muted-foreground hover:text-primary transition-colors">Blog</button></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Address</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">coffee@cafe.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">+1 234 567 890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">123 Coffee Street, City</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Facebook className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Instagram className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Twitter className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Youtube className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-border mt-12 pt-8 text-center"
            variants={fadeInUpVariants}
          >
            <p className="text-muted-foreground">
              © 2024 Coffee Cafe. All rights reserved. Made with ❤️ for coffee lovers.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}