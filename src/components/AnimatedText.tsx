'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedText = ({ text, className, children }: AnimatedTextProps) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap items-center gap-1", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span
          variants={child}
          key={idx}
          className="inline-block"
        >
          {word + (idx !== words.length - 1 ? ' ' : '')}
        </motion.span>
      ))}
      {children}
    </motion.div>
  );
}; 