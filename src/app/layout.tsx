import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { SignUpButton } from "@clerk/nextjs";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SamScribe',
  description: 'Transcribe videos using Groq\'s Whisper model',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
      <SignedOut>
      <SignInButton />
      <SignUpButton />
      </SignedOut>
      <SignedIn>
      <UserButton />
      </SignedIn>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}