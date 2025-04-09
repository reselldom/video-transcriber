'use client';

import { Sidebar } from "@/components/Sidebar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pl-64"
      >
        <div className="container mx-auto p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 