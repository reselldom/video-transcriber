'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Transcribe", href: "/dashboard/transcribe", icon: "🎥" },
  { name: "History", href: "/dashboard/history", icon: "📜" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-3 justify-center">
          <Image
            src="/Samscribe_icon.png"
            alt="SamScribe Icon"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <span className="text-2xl font-bold">SamScribe</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile - Now positioned at bottom */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName || user?.username || 'Welcome'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 