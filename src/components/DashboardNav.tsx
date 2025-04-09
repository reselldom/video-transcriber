'use client';

import { UserButton } from "@clerk/nextjs";

export default function DashboardNav() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">SamScribe</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
} 