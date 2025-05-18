import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { motion } from 'framer-motion';

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  // Variantes para las animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const shimmerVariants = {
    initial: { 
      backgroundPosition: '-200% 0',
      opacity: 0.5
    },
    animate: { 
      backgroundPosition: '200% 0',
      opacity: 0.8,
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header skeleton */}
      <motion.div 
        className="flex gap-2 mb-4 bg-blue-50 p-2 rounded-t-lg"
        variants={rowVariants}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <motion.div
            key={`header-${index}`}
            className="flex-1"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)',
              backgroundSize: '200% 100%',
              height: '2rem',
              borderRadius: '0.375rem'
            }}
          />
        ))}
      </motion.div>

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.div 
          key={`row-${rowIndex}`} 
          className={`flex gap-2 p-2 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
          variants={rowVariants}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <motion.div
              key={`cell-${rowIndex}-${colIndex}`}
              className="flex-1"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              style={{
                background: 'linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)',
                backgroundSize: '200% 100%',
                height: '3rem',
                borderRadius: '0.375rem'
              }}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TableSkeleton; 