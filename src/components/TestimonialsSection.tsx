"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";
import { Star, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Alex Rodriguez",
    username: "@alexcreates",
    body: "Real-time transcription with 98% accuracy. My YouTube content workflow is 3x faster now!",
    img: "/avatars/creator-1.png",
    stars: 5,
    timestamp: "2 hours ago"
  },
  {
    name: "Sophie Chen",
    username: "@sophiepodcasts",
    body: "The AI-powered timestamps and chapter suggestions are game-changing for my podcast editing.",
    img: "/avatars/podcaster-1.png",
    stars: 5,
    timestamp: "Just now"
  },
  {
    name: "Marcus Thompson",
    username: "@marcusedits",
    body: "Multilingual support is perfect - transcribes my Spanish and English content with equal accuracy!",
    img: "/avatars/creator-2.png",
    stars: 5,
    timestamp: "1 day ago"
  },
  {
    name: "Priya Patel",
    username: "@priyateaches",
    body: "Auto-generated subtitles in multiple languages made my online courses accessible globally.",
    img: "/avatars/educator-1.png",
    stars: 5,
    timestamp: "3 hours ago"
  },
  {
    name: "Tom Wilson",
    username: "@tomtech",
    body: "The speaker diarization feature perfectly separates different voices in my interview series.",
    img: "/avatars/tech-1.png",
    stars: 5,
    timestamp: "5 hours ago"
  },
  {
    name: "Nina García",
    username: "@ninacreatrix",
    body: "Love how it captures technical terms accurately. Perfect for my software tutorial videos!",
    img: "/avatars/tech-2.png",
    stars: 5,
    timestamp: "1 hour ago"
  },
  {
    name: "Jordan Lee",
    username: "@jordanstudios",
    body: "The custom vocabulary feature learns my niche terminology. No more manual corrections!",
    img: "/avatars/creator-3.png",
    stars: 5,
    timestamp: "4 hours ago"
  },
  {
    name: "Aisha Mohammed",
    username: "@aishalearns",
    body: "Batch processing multiple files saves me hours. Perfect for my weekly course content!",
    img: "/avatars/educator-2.png",
    stars: 5,
    timestamp: "2 days ago"
  }
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
  stars,
  timestamp
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  stars: number;
  timestamp: string;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4 mx-4",
        // light styles
        "border-gray-950/[.1] bg-white/80 hover:bg-white/90 transition-all duration-300 hover:shadow-lg",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-950/[.1] dark:hover:bg-gray-950/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {!imageError ? (
            <Image
              className="rounded-full object-cover"
              src={img}
              alt={`${name}'s avatar`}
              fill
              sizes="40px"
              onError={() => setImageError(true)}
            />
          ) : (
            <User className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-white/40">
            {username}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 mb-1">
        <div className="flex">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
      </div>
      <blockquote className="mt-2 text-sm text-gray-700 dark:text-white/80">
        {body}
      </blockquote>
    </figure>
  );
};

export function TestimonialsSection() {
  return (
    <section className="w-full py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Real-Time Social Proof
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See what creators, educators, and professionals are saying about SamScribe in real-time
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-8">
          <div className="w-full">
            <Marquee pauseOnHover>
              {reviews.slice(0, 4).map((review, i) => (
                <ReviewCard key={`row1-${review.username}-${i}`} {...review} />
              ))}
            </Marquee>
          </div>
          <div className="w-full">
            <Marquee pauseOnHover>
              {reviews.slice(4).reverse().map((review, i) => (
                <ReviewCard key={`row2-${review.username}-${i}`} {...review} />
              ))}
            </Marquee>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
} 