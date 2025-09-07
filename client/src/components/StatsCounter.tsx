import { useEffect, useRef, useState } from 'react';

interface StatsCounterProps {
  target: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

export default function StatsCounter({ target, label, icon, suffix = "" }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animateCounter();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const animateCounter = () => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
  };

  return (
    <div ref={counterRef} className="text-center group" data-testid={`stats-counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="bg-primary/10 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-5xl font-bold text-accent mb-2">
        {count}{suffix}
      </div>
      <p className="text-card-foreground font-medium">{label}</p>
    </div>
  );
}
