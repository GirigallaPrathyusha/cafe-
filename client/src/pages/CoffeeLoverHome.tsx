import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingBeans from '@/components/FloatingBeans';
import ParticleBackground from '@/components/ParticleBackground';
import MenuCard from '@/components/MenuCard';
import TestimonialCard from '@/components/TestimonialCard';
import StatsCounter from '@/components/StatsCounter';
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
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  Globe,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Utensils,
  Bike
} from 'lucide-react';

export default function CoffeeLoverHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const galleryImages = [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  ];

  const stats = [
    { icon: Users, number: 50000, label: "Happy Customers", suffix: "+" },
    { icon: Coffee, number: 150000, label: "Cups Served", suffix: "+" },
    { icon: Award, number: 25, label: "Awards Won", suffix: "+" },
    { icon: Globe, number: 15, label: "Locations", suffix: "" }
  ];

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

  useEffect(() => {
    const galleryInterval = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(galleryInterval);
  }, [galleryImages.length]);

  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isStatsInView) {
      controls.start("visible");
    }
  }, [isStatsInView, controls]);

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
      name: "Latte",
      description: "Silky steamed milk with a smooth espresso base, finished with light foam.",
      price: "$5.49",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Mocha",
      description: "Chocolate meets espresso with steamed milk and a whipped cream crown.",
      price: "$5.99",
      imageUrl: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Flat White",
      description: "Velvety microfoam poured over a rich double shot for a bold, creamy sip.",
      price: "$5.49",
      imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Macchiato",
      description: "A bold espresso stained with a touch of foam for a concentrated flavor.",
      price: "$4.49",
      imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Affogato",
      description: "A scoop of vanilla gelato drowned in a hot shot of espresso.",
      price: "$6.49",
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Iced Caramel Latte",
      description: "Chilled espresso, milk, and buttery caramel over ice — sweet and refreshing.",
      price: "$5.99",
      imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&h=400"
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
    },
    {
      name: "Aisha Khan",
      review: "Love the seasonal specials! The cinnamon latte is my go-to comfort drink.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Marco Rossi",
      review: "Friendly staff and great beans. Perfect spot to start the day.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Liu Wei",
      review: "The flat white is legit. Consistent microfoam and rich espresso every time.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Emma Wilson",
      review: "Cozy vibes and fast Wi‑Fi. I finish half my assignments here.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Noah Smith",
      review: "Pastries are fresh and pair perfectly with the pour-over.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1546456073-6712f79251bb?auto=format&fit=crop&w=150&h=150"
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

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
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
              data-testid="nav-menu"
            >
              Menu
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className="text-foreground hover:text-primary transition-colors font-medium relative group" 
              data-testid="nav-experience"
            >
              Experience
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
            <button 
              onClick={() => scrollToSection('story')} 
              className="text-foreground hover:text-primary transition-colors font-medium relative group" 
              data-testid="nav-story"
            >
              Story
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-primary text-primary-foreground px-3 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
                className="bg-primary text-primary-foreground px-3 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium" 
              data-testid="button-order-now-nav"
            >
              Order
            </Button>
          </motion.div>
          </div>

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
        <AnimatePresence>
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
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20" 
        data-testid="hero-section"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentGalleryImage}
              src={galleryImages[currentGalleryImage]}
              alt="Dynamic coffee background" 
              className="w-full h-full object-cover opacity-30"
              data-testid="hero-background-image"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"
            animate={{
              background: [
                "linear-gradient(to top, rgba(255, 153, 51, 0.1), transparent)",
                "linear-gradient(to top, rgba(255, 153, 51, 0.2), transparent)",
                "linear-gradient(to top, rgba(255, 153, 51, 0.1), transparent)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="relative z-20 w-full grid lg:grid-cols-2 gap-8 items-center pl-8 pr-6 md:pl-16">
          <motion.div variants={fadeInUpVariants} className="order-2 lg:order-1">
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
            className="mb-12 order-3 lg:order-3"
            variants={fadeInUpVariants}
          >
            <motion.p 
              className="text-2xl text-muted-foreground"
              data-testid="hero-subtitle"
            >
              Coffee. Comfort. Conversations
            </motion.p>
          </motion.div>

          {/* Removed ThreeJSCoffee visual per requirements */}

          {/* Removed 'Best Coffee' heading per request */}

          {/* Right: 3D-styled coffee cup visual */}
          <motion.div 
            className="order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full shadow-2xl ring-8 ring-black/5 bg-gradient-to-b from-card to-background"
              style={{ perspective: 1000 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
              animate={{ y: [0, -10, 0], rotateZ: [-2, 2, -2], rotateY: [-3, 3, -3], boxShadow: [
                "0 20px 40px rgba(0,0,0,0.2)",
                "0 28px 50px rgba(0,0,0,0.25)",
                "0 20px 40px rgba(0,0,0,0.2)"
              ] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&h=600&q=80" 
                  alt="3D Coffee Cup" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-white/10 to-black/10 pointer-events-none"></div>
              <div className="absolute -z-10 inset-0 rounded-full blur-2xl bg-primary/20" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={slideInLeft}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 3, delay: index * 0.2, repeat: Infinity, ease: "linear" }}
                >
                  <stat.icon className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                >
                  {stat.number.toLocaleString()}{stat.suffix}
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Menu Section */}
      <motion.section 
        id="services" 
        ref={menuRef}
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
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-full mb-6 mx-auto w-48 h-48"
                  whileHover={{ rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover shadow-lg group-hover:scale-110 transition-transform duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                <h3 className="font-serif text-3xl font-bold text-card-foreground mb-4">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleAddToCart(item.name)}
                  >
                    Add to Cart - {item.price}
                  </Button>
                </motion.div>
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
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, delay: index * 0.5, repeat: Infinity, ease: "linear" }}
                  >
                    <Coffee className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <p className="text-card-foreground font-medium">{type}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tea Lover section removed as requested */}
        </div>
      </motion.section>

      {/* Interactive Coffee Brewing Process */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-background to-card relative overflow-hidden"
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2 
            className="font-mono text-4xl md:text-5xl font-extrabold text-foreground mb-12 tracking-tight"
            variants={fadeInUpVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(245,158,11,0.35)]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Coffee Brewing Process
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
          >
            {[
              { step: 1, title: "Bean Selection", description: "Handpicked premium beans from the finest coffee regions", icon: "🌱" },
              { step: 2, title: "Roasting", description: "Perfectly roasted to unlock rich flavors and aromas", icon: "🔥" },
              { step: 3, title: "Grinding", description: "Fresh ground to optimal consistency for extraction", icon: "⚙️" },
              { step: 4, title: "Brewing", description: "Expertly brewed with precision and passion", icon: "☕" }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center group"
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                  }}
                >
                  {process.icon}
                </motion.div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Step {process.step}: {process.title}
                </h3>
                <p className="text-muted-foreground">{process.description}</p>
                
                <motion.div
                  className="mt-4 h-1 bg-primary/20 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                >
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Gallery Section */}
      <motion.section 
        className="py-20 bg-background relative overflow-hidden"
        id="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2 
            className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-12 text-center"
            variants={fadeInUpVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(245,158,11,0.35)]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Coffee Gallery
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="relative h-[34rem] md:h-[38rem] rounded-2xl overflow-hidden shadow-2xl group"
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* 3D animated background behind carousel */}
            <motion.div
              className="absolute -z-10 inset-0"
              aria-hidden
            >
              {/* Rotating ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.08) 0 35%, transparent 36%)",
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.25)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              {/* Conic gradient halo */}
              <motion.div
                className="absolute inset-[-20%] rounded-[40px] opacity-30"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255,153,51,0.2), transparent 30%, rgba(255,153,51,0.15), transparent 60%, rgba(255,153,51,0.2))",
                  filter: "blur(12px)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              {/* Parallax 3D grid */}
              <motion.div
                className="absolute inset-0"
                style={{ perspective: 1200 }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{ rotateX: 55, rotateZ: [0, 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              {/* Gradient blobs */}
              <motion.div
                className="absolute -bottom-12 -left-12 w-80 h-80 bg-primary/20 blur-3xl rounded-full"
                animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -top-12 -right-12 w-80 h-80 bg-accent/20 blur-3xl rounded-full"
                animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Floating particles */}
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/50 rounded-full shadow-md"
                  style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: (i % 10) * 0.15 }}
                />)
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentGalleryImage}
                src={galleryImages[currentGalleryImage]}
                alt="Coffee gallery"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                initial={{ x: 300, opacity: 0, scale: 1.1 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -300, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </AnimatePresence>
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              animate={{
                background: [
                  "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                  "linear-gradient(to top, rgba(255,153,51,0.3), transparent)",
                  "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Navigation arrows */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentGalleryImage ? 'bg-primary w-8' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentGalleryImage(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Gallery thumbnails */}
          <motion.div 
            className="grid grid-cols-5 gap-4 mt-8"
            variants={staggerContainer}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={`relative h-24 md:h-28 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  index === currentGalleryImage ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentGalleryImage(index)}
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Advanced Features Showcase */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-card to-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2 
            className="font-mono text-4xl md:text-5xl font-extrabold text-foreground mb-12 text-center tracking-tight"
            variants={fadeInUpVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(251,146,60,0.35)]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Why Choose Coffee Cafe?
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              { 
                icon: Sparkles, 
                title: "Premium Quality", 
                description: "Only the finest beans from sustainable farms worldwide",
                color: "from-yellow-400 to-orange-500"
              },
              { 
                icon: Zap, 
                title: "Lightning Fast", 
                description: "Quick service without compromising on quality",
                color: "from-blue-400 to-purple-500"
              },
              { 
                icon: Heart, 
                title: "Made with Love", 
                description: "Every cup crafted with passion and precision",
                color: "from-pink-400 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile App Section */}
      <motion.section 
        className="pt-20 pb-16 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden" 
        data-testid="mobile-app-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="font-mono text-4xl md:text-5xl font-extrabold text-foreground mb-12 tracking-tight"
            data-testid="app-section-title"
            variants={fadeInUpVariants}
          >
            Coffee Cafe is available for 
            <motion.span 
              className="block bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Android and iOS
            </motion.span>
          </motion.h2>
          {/* Re-added large 3D animated cafe images flanking the heading (md+) */}
          <motion.div
            className="hidden md:block absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: [-60, 60] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          >
            <motion.div
              className="relative w-56 h-56 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem] rounded-full overflow-hidden ring-8 ring-white/10 shadow-2xl"
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
              style={{ perspective: 1000 }}
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=880&h=880&q=80"
                alt="Cafe latte art"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: [60, -60] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          >
            <motion.div
              className="relative w-52 h-52 lg:w-72 lg:h-72 xl:w-[20rem] xl:h-[20rem] rounded-full overflow-hidden ring-8 ring-white/10 shadow-2xl"
              whileHover={{ rotateX: -6, rotateY: 6, scale: 1.03 }}
              style={{ perspective: 1000 }}
            >
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=820&h=820&q=80"
                alt="Coffee beans"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
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
              variants={slideInRight}
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

          {/* Food Delivery CTAs */}
          <motion.div 
            className="my-16 flex flex-col sm:flex-row gap-8 justify-center items-center"
            variants={staggerContainer}
          >
            <motion.div
              animate={{ y: [0, -4, 0], boxShadow: [
                '0 12px 28px rgba(226,55,68,0.25)',
                '0 18px 36px rgba(226,55,68,0.35)',
                '0 12px 28px rgba(226,55,68,0.25)'
              ] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.07, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => window.open('https://www.zomato.com', '_blank')}
                className="inline-flex items-center justify-center bg-[#E23744] text-white w-64 md:w-72 px-8 py-7 rounded-2xl font-semibold text-xl hover:brightness-110 transition-colors"
              >
                <Utensils className="w-7 h-7 mr-3" />
                Order on Zomato
              </Button>
            </motion.div>
            <motion.div
              animate={{ y: [0, -4, 0], boxShadow: [
                '0 12px 28px rgba(252,128,25,0.25)',
                '0 18px 36px rgba(252,128,25,0.35)',
                '0 12px 28px rgba(252,128,25,0.25)'
              ] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              whileHover={{ scale: 1.07, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => window.open('https://www.swiggy.com', '_blank')}
                className="inline-flex items-center justify-center bg-[#FC8019] text-white w-64 md:w-72 px-8 py-7 rounded-2xl font-semibold text-xl hover:brightness-110 transition-colors"
              >
                <Bike className="w-7 h-7 mr-3" />
                Order on Swiggy
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="pt-16 pb-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="font-mono text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight"
            variants={fadeInUpVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(251,146,60,0.35)]"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Stay Updated with Coffee Cafe
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            variants={fadeInUpVariants}
          >
            Subscribe to our newsletter for exclusive offers, new menu items, and coffee brewing tips
          </motion.p>
          
          <motion.form 
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            variants={fadeInUpVariants}
          >
            <motion.input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              required
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit"
                disabled={newsletterMutation.isPending}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            className="mt-8 flex justify-center space-x-8"
            variants={staggerContainer}
          >
            {[
              { icon: "📧", text: "Weekly Updates" },
              { icon: "🎁", text: "Exclusive Offers" },
              { icon: "☕", text: "Brewing Tips" }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                className="flex items-center space-x-2"
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-muted-foreground">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.section>

      {/* Testimonials Section (About) with horizontal marquee and 3D background */}
      <motion.section 
        id="about" 
        className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-[#0b0f14] to-background" 
        data-testid="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section-wide animated 3D background */}
        <motion.div className="absolute inset-0 -z-10" aria-hidden>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.12) 0 32%, transparent 33%)",
              boxShadow: "inset 0 0 160px rgba(0,0,0,0.35)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
          {/* Conic swirl for stronger energy */}
          <motion.div
            className="absolute inset-[-20%] opacity-40"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(255,180,80,0.18), transparent 30%, rgba(255,140,40,0.22), transparent 60%, rgba(255,180,80,0.18))",
              filter: "blur(10px)"
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateX: 55, rotateZ: [0, 360] }}
              transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <motion.div className="absolute -left-24 -bottom-24 w-[28rem] h-[28rem] bg-primary/30 blur-3xl rounded-full" animate={{ y: [0, -24, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -right-24 -top-24 w-[28rem] h-[28rem] bg-accent/30 blur-3xl rounded-full" animate={{ y: [0, 24, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
          {/* Sweeping light beams */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute -left-1/3 top-0 w-2/3 h-full rotate-12"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,200,120,0.20) 45%, rgba(255,255,255,0) 80%)',
                filter: 'blur(3px)'
              }}
              animate={{ x: ['-40%', '130%'] }}
              transition={{ duration: 10 + i * 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.9 }}
            />
          ))}
          {/* Floating bokeh particles */}
          {Array.from({ length: 36 }).map((_, i) => (
            <motion.span
              key={`bokeh-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${(i * 41) % 100}%`,
                top: `${(i * 29) % 100}%`,
                background: 'radial-gradient(circle, rgba(255,200,120,0.75) 0%, rgba(255,200,120,0.0) 70%)',
                filter: 'blur(0.8px)'
              }}
              animate={{ y: [0, -24, 0], opacity: [0.25, 1, 0.25], scale: [0.85, 1.2, 0.85] }}
              transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: (i % 12) * 0.15 }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUpVariants}
          >
            <h2 className="font-sans uppercase text-3xl md:text-4xl font-extrabold tracking-widest mb-8 text-center" data-testid="testimonials-title"><motion.span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]" animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} style={{ backgroundSize: '200% 200%' }}>Testimonials</motion.span></h2>
            <motion.p 
              className="text-lg font-medium bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              What our coffee lovers say about us
            </motion.p>
          </motion.div>
          <motion.div className="mx-auto mb-10 h-1 w-24 bg-primary rounded-full" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          {/* Marquee container */}
          <div className="relative overflow-hidden">
              <motion.div
              className="flex gap-6 will-change-transform"
              variants={fadeInUpVariants}
              animate={{ x: [0, -1200] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...testimonials, ...testimonials].map((t, index) => (
                <motion.div
                  key={`${t.name}-${index}`}
                  className={`min-w-[320px] w-[320px] h-[360px] shrink-0 rounded-2xl border-2 transition-all duration-200 hover:border-orange-500 hover:ring-4 hover:ring-orange-500 hover:ring-offset-2 hover:ring-offset-card ${
                    activeTestimonial === index ? 'border-orange-500 ring-4 ring-orange-500 ring-offset-2 ring-offset-card shadow-[0_8px_28px_rgba(234,88,12,0.25)]' : 'border-border'
                  }`}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  onClick={() => setActiveTestimonial(prev => prev === index ? null : index)}
                >
                  <Card className="h-full flex flex-col items-center text-center shadow-lg border-0 bg-background/70 backdrop-blur-sm rounded-2xl">
                    <div className="pt-6">
                      <img src={t.imageUrl} alt={t.name} className="w-16 h-16 rounded-full object-cover mx-auto shadow" />
                    </div>
                    <CardContent className="flex-1 w-full flex flex-col items-center px-6 py-4">
                      <h3 className="font-semibold text-card-foreground mb-2">{t.name}</h3>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-primary' : 'text-muted-foreground/40'}`} />
                        ))}
                      </div>
                      <p className="text-muted-foreground line-clamp-4">
                        {t.review}
                      </p>
                    </CardContent>
                  </Card>
              </motion.div>
            ))}
          </motion.div>
          </div>
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
            <motion.div variants={slideInLeft}>
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="w-8 h-8 text-primary" />
                <span className="font-serif font-bold text-2xl text-foreground">Coffee Cafe</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Crafted Coffee, Cozy Vibes, Unforgettable Moments – Your Perfect Espresso Escape
              </p>
              <motion.a 
                href="https://www.youtube.com" 
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
              >
                Visit our YouTube Channel
              </motion.a>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Important Links</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">About</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button className="text-muted-foreground hover:text-primary transition-colors">Contact</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button className="text-muted-foreground hover:text-primary transition-colors">Blog</button>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">Home</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">About</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button className="text-muted-foreground hover:text-primary transition-colors">Contact</button>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button className="text-muted-foreground hover:text-primary transition-colors">Blog</button>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div variants={slideInRight}>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">Address</h3>
              <div className="space-y-3">
                <motion.div className="flex items-center space-x-3" whileHover={{ x: 5 }}>
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">coffee@cafe.com</span>
                </motion.div>
                <motion.div className="flex items-center space-x-3" whileHover={{ x: 5 }}>
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">+1 234 567 890</span>
                </motion.div>
                <motion.div className="flex items-center space-x-3" whileHover={{ x: 5 }}>
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">123 Coffee Street, City</span>
                </motion.div>
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