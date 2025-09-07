import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Coffee } from 'lucide-react';

interface ThreeJSCoffeeProps {
  className?: string;
}

export default function ThreeJSCoffee({ className = "" }: ThreeJSCoffeeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={containerRef}
      className={`relative w-96 h-96 mx-auto ${className}`}
      data-testid="coffee-3d-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          className="relative"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Main coffee cup image with enhanced 3D effect */}
          <motion.div
            className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
              alt="Close-up of roasted coffee beans with rich texture" 
              className="w-full h-full object-cover"
              data-testid="coffee-beans-background"
              animate={{
                scale: isHovered ? 1.1 : 1,
                brightness: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Glossy overlay effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
              animate={{
                opacity: isHovered ? 0.3 : 0.1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          {/* Enhanced steam particles with physics */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/70 rounded-full"
                style={{
                  left: Math.random() * 20 - 10,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: [-20, -80, -120],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 1.5],
                  x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Floating 3D coffee cup icon */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transformStyle: "preserve-3d",
              translateZ: 50,
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Coffee 
                className="w-32 h-32 text-white drop-shadow-2xl" 
                data-testid="coffee-icon"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Floating coffee beans */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-4 bg-amber-800 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
                rotateZ: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Sparkle effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
