"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const ThreeStepProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 sm:py-28 bg-background relative overflow-x-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Video & Audio to Text in Seconds
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Transform your media into perfectly transcribed text with our simple
            three-step process
          </p>
        </div>

        <div className="mt-16 relative max-w-6xl mx-auto">
          {/* Desktop connecting line */}
          <div className="hidden sm:block absolute top-1/3 left-[15%] w-[70%] h-0.5 bg-border -z-10 mx-auto"></div>

          {/* Desktop animated connecting line */}
          <div
            className="hidden sm:block absolute top-1/3 left-[15%] h-0.5 bg-gradient-to-r from-primary to-secondary -z-5 transition-all duration-1000 ease-out"
            style={{
              width: isVisible ? "70%" : "0%",
              transitionDelay: "0.5s",
            }}
          ></div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
            {/* Step 1 */}
            <div
              className={`relative flex flex-col items-center transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative mb-8 group">
                {/* Step Number */}
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg z-10 transform transition-transform group-hover:scale-110">
                  1
                </div>

                {/* Card with hover effect */}
                <div className="rounded-lg bg-card p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden relative h-[280px] w-full border">
                  {/* Decorative corner */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full"></div>

                  <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    <Image
                      src="/images/step1-upload.png"
                      alt="Upload your media"
                      width={400}
                      height={280}
                      className="w-full h-48 rounded-md object-cover mb-5"
                    />
                    <div className="flex items-center justify-center mt-4">
                      <svg
                        className="w-6 h-6 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-lg font-medium text-card-foreground">
                        Upload File
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Upload
              </h3>
              <p className="text-center text-muted-foreground max-w-xs">
                Simply drag & drop your video or audio file onto our platform
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`relative flex flex-col items-center transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="relative mb-8 group">
                {/* Step Number */}
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold shadow-lg z-10 transform transition-transform group-hover:scale-110">
                  2
                </div>

                {/* Card with hover effect */}
                <div className="rounded-lg bg-card p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden relative h-[280px] w-full border">
                  {/* Decorative corner */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary/5 rounded-full"></div>

                  <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    <Image
                      src="/images/step2-transcribe.png"
                      alt="Transcribe your content"
                      width={400}
                      height={280}
                      className="w-full h-48 rounded-md object-cover mb-5"
                    />
                    <div className="flex items-center justify-center mt-4">
                      <svg
                        className="w-6 h-6 text-secondary-foreground mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                      <span className="text-lg font-medium text-card-foreground">
                        Process Content
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Transcribe
              </h3>
              <p className="text-center text-muted-foreground max-w-xs">
                Our AI automatically transcribes your content with high accuracy
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`relative flex flex-col items-center transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <div className="relative mb-8 group">
                {/* Step Number */}
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shadow-lg z-10 transform transition-transform group-hover:scale-110">
                  3
                </div>

                {/* Card with hover effect */}
                <div className="rounded-lg bg-card p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden relative h-[280px] w-full border">
                  {/* Decorative corner */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-accent/5 rounded-full"></div>

                  <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    <Image
                      src="/images/step3-export.png"
                      alt="Export your text"
                      width={400}
                      height={280}
                      className="w-full h-48 rounded-md object-cover mb-5"
                    />
                    <div className="flex items-center justify-center mt-4">
                      <svg
                        className="w-6 h-6 text-accent-foreground mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-lg font-medium text-card-foreground">
                        Export Text
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Export
              </h3>
              <p className="text-center text-muted-foreground max-w-xs">
                Download your transcription in multiple formats (TXT, DOC, SRT)
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-16 text-center transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-medium text-lg px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
            >
              ⚡ Try It Now
            </Button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}; 