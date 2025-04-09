'use client';

import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4f46e5]/5 via-white to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#4f46e5]/20"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-[#4f46e5] border-t-transparent animate-spin"></div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
} 