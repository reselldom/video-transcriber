'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AnimatedTooltip } from "@/components/AnimatedTooltip";
import { AnimatedText } from "@/components/AnimatedText";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Features from '@/components/Features';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading spinner while checking auth state
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  // If user is signed in, show loading spinner while redirecting
  if (isSignedIn) {
    return <LoadingSpinner />;
  }

  const people = [
    {
      id: 1,
      name: "Sam Wilson",
      designation: "Content Creator",
      image: "/avatars/avatar-1.png"
    },
    {
      id: 2,
      name: "Emma Davis",
      designation: "YouTuber",
      image: "/avatars/avatar-2.png"
    },
    {
      id: 3,
      name: "Michael Chen",
      designation: "Podcaster",
      image: "/avatars/avatar-3.png"
    },
    {
      id: 4,
      name: "Lisa Taylor",
      designation: "Video Editor",
      image: "/avatars/avatar-4.png"
    },
    {
      id: 5,
      name: "David Kim",
      designation: "Educator",
      image: "/avatars/avatar-5.png"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4f46e5]/5 via-white to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/Samscribe_icon.png"
                alt="SamScribe Icon"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold">SamScribe</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-[#4f46e5]">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-[#4f46e5]">Pricing</Link>
              <Link href="#faq" className="text-gray-600 hover:text-[#4f46e5]">FAQ</Link>
              <Link href="#reviews" className="text-gray-600 hover:text-[#4f46e5]">Reviews</Link>
              <Link href="#blog" className="text-gray-600 hover:text-[#4f46e5]">Blog</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="hover:text-[#4f46e5]">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-[#4f46e5] hover:bg-[#4338ca]">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5]/10 to-transparent" />
          <div className="absolute top-20 -left-64 w-96 h-96 bg-[#4f46e5]/10 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-64 w-96 h-96 bg-[#4f46e5]/10 rounded-full blur-3xl" />

          <div className="container relative mx-auto px-4 pt-20 pb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <p className="text-base font-medium flex items-center gap-1">
                  ⚡️ Founder&apos;s Pricing
                </p>
                <span className="bg-[#ff8a4c]/10 text-[#ff8a4c] px-2 py-0.5 rounded-full text-xs font-medium">
                  Limited Time
                </span>
              </div>
              <h1 className="text-6xl font-bold text-[#1a1f36] mb-6">
                Convert audio & video{' '}
                <br />
                to text{' '}
                <span className="bg-gradient-to-r from-[#4f46e5] to-[#4338ca] text-white px-4 py-1 rounded-lg inline-block">
                  instantly
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Tired of spending hours on manual transcription? SamScribe is the fastest way to 
                convert your audio and video to precise text. 99.8% accuracy, 95+ languages, no 
                setup required—just upload and transcribe!
              </p>
              <div className="flex flex-col items-center gap-8">
                {/* Avatar Group with Rating */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center">
                    <AnimatedTooltip items={people} />
                    <div className="ml-4">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: i * 0.1,
                              ease: "easeOut"
                            }}
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                      <AnimatedText text="Trusted by 60K+ creators" className="text-sm font-medium text-gray-900" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <SignUpButton mode="modal">
                    <Button size="lg" className="bg-gradient-to-r from-[#4f46e5] to-[#4338ca] hover:from-[#4338ca] hover:to-[#4f46e5] text-lg px-8">
                      ⚡ Get Started
                    </Button>
                  </SignUpButton>
                  <Button variant="outline" size="lg" className="text-lg px-8 border-[#4f46e5] text-[#4f46e5] hover:bg-[#4f46e5]/5">
                    View Features
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Features />

        {/* Pricing Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-4">Free Trial</h3>
                <p className="text-center text-gray-600 mb-6">Try SamScribe with no commitment</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#4f46e5] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>5 minutes of free transcription</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#4f46e5] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>All export formats included</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#4f46e5] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>No credit card required</span>
                  </li>
                </ul>
                <div className="text-center">
                  <SignUpButton mode="modal">
                    <Button size="lg" className="bg-[#4f46e5] hover:bg-[#4338ca] w-full">
                      Start Free Trial
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1a1f36] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-400">© 2024 SamScribe. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}