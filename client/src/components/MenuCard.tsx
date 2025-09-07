import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onAddToCart: () => void;
}

export default function MenuCard({ name, description, price, imageUrl, onAddToCart }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="menu-card bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group relative"
        data-testid={`menu-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Like button */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Rating stars */}
        <motion.div
          className="absolute top-4 left-4 z-20 flex space-x-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="w-3 h-3 text-yellow-400 fill-current drop-shadow-sm" 
            />
          ))}
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.img 
            src={imageUrl} 
            alt={`${name} - premium coffee served in elegant cup`}
            className="w-full h-64 object-cover"
            variants={imageVariants}
            data-testid={`menu-image-${name.toLowerCase().replace(/\s+/g, '-')}`}
          />
          
          {/* Animated overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            variants={overlayVariants}
          />

          {/* Floating sparkles */}
          {isHovered && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
        
        <CardContent className="p-6">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl font-bold text-card-foreground" data-testid={`menu-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h3>
            <motion.span 
              className="text-2xl font-bold text-primary"
              data-testid={`menu-price-${name.toLowerCase().replace(/\s+/g, '-')}`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                color: isHovered ? "#d97706" : "hsl(var(--primary))",
              }}
              transition={{ duration: 0.2 }}
            >
              {price}
            </motion.span>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mb-6 leading-relaxed" 
            data-testid={`menu-description-${name.toLowerCase().replace(/\s+/g, '-')}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={onAddToCart}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold relative overflow-hidden group"
              data-testid={`button-add-to-cart-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                className="relative z-10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    rotate: isHovered ? 90 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                </motion.div>
                Add to Order
              </motion.div>
            </Button>
          </motion.div>
        </CardContent>

        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}
