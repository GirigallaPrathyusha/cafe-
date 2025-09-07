import { motion } from 'framer-motion';

export default function FloatingBeans() {
  const beans = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 6,
    size: 0.5 + Math.random() * 1,
    rotation: Math.random() * 360,
  }));

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      data-testid="floating-beans-container"
    >
      {beans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute"
          style={{
            left: `${bean.x}%`,
            top: '-50px',
          }}
          initial={{ y: -50, opacity: 0, rotateZ: bean.rotation }}
          animate={{
            y: ['-50px', '100vh'],
            opacity: [0, 1, 1, 0],
            rotateZ: [bean.rotation, bean.rotation + 360],
            x: [0, Math.sin(bean.id) * 100, Math.cos(bean.id) * 50],
          }}
          transition={{
            duration: bean.duration,
            repeat: Infinity,
            delay: bean.delay,
            ease: "linear",
          }}
        >
          {/* Coffee bean shape */}
          <motion.div
            className="relative bg-amber-900 rounded-full shadow-lg"
            style={{
              width: `${8 * bean.size}px`,
              height: `${12 * bean.size}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Coffee bean crack */}
            <div 
              className="absolute bg-amber-800 rounded-full"
              style={{
                width: '2px',
                height: '60%',
                left: '50%',
                top: '20%',
                transform: 'translateX(-50%)',
              }}
            />
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: bean.delay + 1,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
