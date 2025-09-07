import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingBeans from '@/components/FloatingBeans';
import ThreeJSCoffee from '@/components/ThreeJSCoffee';
import ParticleBackground from '@/components/ParticleBackground';
import StatsCounter from '@/components/StatsCounter';
import MenuCard from '@/components/MenuCard';
import TestimonialCard from '@/components/TestimonialCard';
import ContactForm from '@/components/ContactForm';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  Coffee,
  Heart,
  Award,
  MapPin,
  Truck,
  Leaf,
  Clock,
  Star,
  Phone,
  Mail,
  MapPinIcon,
  ChevronDown,
  Play,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Smartphone,
  Gift,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

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
    },
    {
      name: "Premium Blend",
      description: "Our signature blend crafted from the finest beans, offering a complex flavor profile that evolves with every sip.",
      price: "$6.99",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Cold Coffee",
      description: "Refreshing cold brew coffee that's smooth, less acidic, and perfect for warm days or afternoon coding sessions.",
      price: "$4.99",
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Tea Lover",
      description: "Much like writing code, brewing the perfect cup of tea requires patience, precision, and a dash of passion.",
      price: "$3.99",
      imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
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

      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-20 shadow-lg' : ''}`} data-testid="navigation-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coffee className="w-8 h-8 text-primary" data-testid="logo-icon" />
            <span className="font-serif font-bold text-xl text-foreground">JavaJunction</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-home">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-about">About</button>
            <button onClick={() => scrollToSection('menu')} className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-menu">Menu</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-testimonials">Reviews</button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-contact">Contact</button>
          </div>

          <Button className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium" data-testid="button-order-now-nav">
            Order Now
          </Button>

          {/* Mobile menu toggle */}
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
          <div className="md:hidden mt-4 p-4 bg-card rounded-lg shadow-lg" data-testid="mobile-menu">
            <div className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('home')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-home">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-about">About</button>
              <button onClick={() => scrollToSection('menu')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-menu">Menu</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-testimonials">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-card-foreground hover:text-primary transition-colors font-medium" data-testid="mobile-nav-contact">Contact</button>
              <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium mt-3" data-testid="button-order-now-mobile">
                Order Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden" 
        data-testid="hero-section"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Parallax background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Cozy coffee shop interior with warm lighting and wooden furniture" 
            className="w-full h-full object-cover scale-110"
            data-testid="hero-background-image"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </motion.div>

        {/* Animated coffee beans background */}
        <motion.div 
          className="coffee-beans-bg absolute inset-0 z-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Dynamic light rays */}
        <div className="absolute inset-0 z-15">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-full bg-gradient-to-t from-transparent via-yellow-300/10 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                transformOrigin: 'bottom',
              }}
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.2, 0.6, 0.2],
                rotateZ: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-20 max-w-7xl mx-auto px-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-left space-y-6"
              variants={fadeInUpVariants}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full text-accent font-medium text-sm backdrop-blur-sm"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <Star className="w-4 h-4 mr-2" />
                Since 1941
              </motion.div>
              
              <motion.h1 
                className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight" 
                data-testid="hero-title"
                variants={fadeInUpVariants}
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Fresh Coffee
                </motion.span>
                <motion.span 
                  className="block text-accent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  in the Morning
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 max-w-lg leading-relaxed" 
                data-testid="hero-description"
                variants={fadeInUpVariants}
              >
                Start your day right with a cup of our freshly brewed coffee. 
                Whether you're here for a quick pick-me-up or a leisurely morning, 
                we're here to make your mornings better.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUpVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all relative overflow-hidden group" data-testid="button-get-yours-now">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <Coffee className="w-5 h-5 mr-2" />
                      Get Yours Now
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-foreground transition-all backdrop-blur-sm" data-testid="button-watch-story">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Story
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-8 pt-6"
                variants={staggerContainer}
              >
                {[
                  { icon: Truck, text: "Free Delivery" },
                  { icon: Leaf, text: "100% Organic" },
                  { icon: Clock, text: "24/7 Service" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.text}
                    className="flex items-center space-x-2 text-white"
                    variants={fadeInUpVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <item.icon className="w-5 h-5 text-accent" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={fadeInUpVariants}
            >
              <ThreeJSCoffee />

              <motion.div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-6 h-6 text-white" />
                <p className="text-white mt-2 text-sm">Scroll Down</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section id="about" className="py-20 bg-card relative overflow-hidden" data-testid="stats-section">
        <div className="absolute inset-0 coffee-beans-bg opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-4" data-testid="stats-title">Our Achievements</h2>
            <p className="text-muted-foreground text-lg">Numbers that speak for our quality and dedication</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCounter 
              target={120}
              label="Cups Served Daily"
              icon={<Coffee className="w-8 h-8 text-primary" />}
            />
            <StatsCounter 
              target={400}
              label="Happy Customers"
              icon={<Heart className="w-8 h-8 text-primary" />}
            />
            <StatsCounter 
              target={82}
              label="Years of Excellence"
              icon={<Award className="w-8 h-8 text-primary" />}
            />
            <StatsCounter 
              target={15}
              label="Locations"
              icon={<MapPin className="w-8 h-8 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-background relative overflow-hidden" data-testid="menu-section">
        <div className="absolute inset-0 parallax-bg opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="menu-title">
              We serve the <span className="text-primary">richest Coffee</span> in the city
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Coffee And Code - The perfect blend for developers and coffee enthusiasts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <MenuCard
                key={item.name}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                onAddToCart={() => handleAddToCart(item.name)}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-4 bg-card p-2 rounded-full shadow-lg">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">Premium Coffee</div>
              <div className="px-4 py-2 text-muted-foreground text-sm font-medium">Hot Coffee</div>
              <div className="px-4 py-2 text-muted-foreground text-sm font-medium">Cold Coffee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden" data-testid="mobile-app-section">
        <div className="coffee-beans-bg absolute inset-0 opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight" data-testid="app-section-title">
                Coffee Café is available for 
                <span className="text-accent">Android and iOS</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed" data-testid="app-section-description">
                Take our premium coffee experience with you wherever you go. Order ahead, 
                earn rewards, and never wait in line again with our mobile app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors" data-testid="button-play-store">
                  <Smartphone className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>
                <Button className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors" data-testid="button-app-store">
                  <Smartphone className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-accent" />
                  <span className="text-sm">Easy Ordering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-accent" />
                  <span className="text-sm">Loyalty Rewards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm">Order Ahead</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800" 
                  alt="Modern coffee shop interior with comfortable seating and warm ambiance" 
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                  data-testid="app-section-image"
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-4 animate-float">
                    <Smartphone className="w-16 h-16 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted relative overflow-hidden" data-testid="testimonials-section">
        <div className="coffee-beans-bg absolute inset-0 opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-muted-foreground mb-4" data-testid="testimonials-title">Testimonials</h2>
            <p className="text-muted-foreground/70 text-lg">What our coffee lovers say about us</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                review={testimonial.review}
                rating={testimonial.rating}
                imageUrl={testimonial.imageUrl}
              />
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-2" data-testid="testimonial-navigation">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-3 h-3 rounded-full p-0 hover:scale-110 transition-transform ${
                  index === currentTestimonial ? 'bg-accent' : 'bg-border'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card relative overflow-hidden" data-testid="contact-section">
        <div className="absolute inset-0 parallax-bg opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-4" data-testid="contact-title">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">We'd love to hear from you. Send us a message!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-6" data-testid="contact-info-title">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Email</p>
                      <p className="text-card-foreground font-medium">hello@javajunction.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-phone">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Phone</p>
                      <p className="text-card-foreground font-medium">+49 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-location">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Location</p>
                      <p className="text-card-foreground font-medium">123 Coffee Street, Berlin, Germany</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-hours">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Hours</p>
                      <p className="text-card-foreground font-medium">Mon-Sun: 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-4">Follow Us</h4>
                <div className="flex space-x-4" data-testid="social-links">
                  <Button size="sm" className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors" data-testid="social-facebook">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors" data-testid="social-instagram">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors" data-testid="social-twitter">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors" data-testid="social-youtube">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Coffee className="w-6 h-6 text-accent" />
                <span className="font-serif font-bold text-xl">JavaJunction</span>
              </div>
              <p className="text-background/70 leading-relaxed">
                Crafted Coffee, Cozy Vibes, Unforgettable Moments – Your Perfect Espresso Escape
              </p>
              <Button variant="ghost" className="inline-flex items-center text-accent hover:text-accent/80 transition-colors p-0" data-testid="footer-youtube-link">
                <Youtube className="w-4 h-4 mr-2" />
                Visit our YouTube Channel
              </Button>
            </div>

            <div>
              <h4 className="font-semibold text-background mb-4">Important Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-background/70 hover:text-background transition-colors text-left" data-testid="footer-home">Home</button>
                <button onClick={() => scrollToSection('about')} className="block text-background/70 hover:text-background transition-colors text-left" data-testid="footer-about">About</button>
                <button onClick={() => scrollToSection('menu')} className="block text-background/70 hover:text-background transition-colors text-left" data-testid="footer-menu">Menu</button>
                <button onClick={() => scrollToSection('contact')} className="block text-background/70 hover:text-background transition-colors text-left" data-testid="footer-contact">Contact</button>
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-blog">Blog</Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-order-online">Order Online</Button>
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-catering">Catering</Button>
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-gift-cards">Gift Cards</Button>
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-careers">Careers</Button>
                <Button variant="ghost" className="block text-background/70 hover:text-background transition-colors p-0 h-auto text-left" data-testid="footer-franchise">Franchise</Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background mb-4">Newsletter</h4>
              <p className="text-background/70 mb-4">Subscribe to get updates on new offers and menu items.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex" data-testid="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-background/10 border border-background/20 rounded-l-xl text-background placeholder-background/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  className="bg-accent text-accent-foreground px-6 py-2 rounded-r-xl hover:bg-accent/90 transition-colors"
                  data-testid="button-newsletter-submit"
                >
                  {newsletterMutation.isPending ? (
                    <div className="animate-spin w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-background/70">&copy; 2024 JavaJunction. All rights reserved. Made with <Heart className="inline w-4 h-4 text-accent" /> and lots of <Coffee className="inline w-4 h-4 text-accent" /></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
