import { useEffect, useRef, useState } from 'react';
import { Coffee } from 'lucide-react';

interface ThreeJSCoffeeProps {
  className?: string;
}

export default function ThreeJSCoffee({ className = "" }: ThreeJSCoffeeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      setMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-96 h-96 mx-auto ${className}`}
      data-testid="coffee-3d-container"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="relative transition-transform duration-500 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
          }}
        >
          {/* Coffee beans close up background */}
          <img 
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
            alt="Close-up of roasted coffee beans with rich texture" 
            className="w-80 h-80 rounded-full object-cover animate-pulse-slow shadow-2xl"
            data-testid="coffee-beans-background"
          />
          
          {/* Steam particles */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <div className="steam-particle"></div>
            <div className="steam-particle"></div>
            <div className="steam-particle"></div>
            <div className="steam-particle"></div>
          </div>

          {/* Floating coffee cup overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Coffee className="w-32 h-32 text-white animate-float drop-shadow-2xl" data-testid="coffee-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
