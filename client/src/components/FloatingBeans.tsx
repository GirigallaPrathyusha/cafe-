import { useEffect, useRef } from 'react';

export default function FloatingBeans() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const numberOfBeans = 15;

    for (let i = 0; i < numberOfBeans; i++) {
      const bean = document.createElement('div');
      bean.className = 'coffee-bean';
      bean.style.left = Math.random() * 100 + '%';
      bean.style.animationDelay = Math.random() * 8 + 's';
      bean.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(bean);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      data-testid="floating-beans-container"
    />
  );
}
