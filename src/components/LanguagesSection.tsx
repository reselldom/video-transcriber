"use client";

import React from "react";

export default function LanguagesSection() {
  const languages = [
    { name: "English", localName: "English", flag: "🇺🇸" },
    { name: "Spanish", localName: "Español", flag: "🇪🇸" },
    { name: "French", localName: "Français", flag: "🇫🇷" },
    { name: "German", localName: "Deutsch", flag: "🇩🇪" },
    { name: "Italian", localName: "Italiano", flag: "🇮🇹" },
    { name: "Portuguese", localName: "Português", flag: "🇵🇹" },
    { name: "Dutch", localName: "Nederlands", flag: "🇳🇱" },
    { name: "Swedish", localName: "Svenska", flag: "🇸🇪" },
    { name: "Polish", localName: "Polski", flag: "🇵🇱" },
    { name: "Romanian", localName: "Română", flag: "🇷🇴" },
    { name: "Norwegian", localName: "Norsk", flag: "🇳🇴" },
  ];

  return (
    <section
      id="languages"
      className="w-full py-20 px-4 bg-background border-t border-b border-border overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            LANGUAGES
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Transcribe Audio in Multiple Languages
          </h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            SamScribe supports transcription in a wide range of languages,
            making it easy to convert audio to text in your preferred language.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {languages.map((language, index) => (
            <div
              key={index}
              className="flex flex-col items-center py-4 px-2 sm:p-4 md:p-6 transition-all duration-500 hover:bg-gradient-to-b hover:from-background hover:to-primary/5 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-lg transform hover:-translate-y-2 group animate-slide-up"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div
                className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3 transition-all duration-500 ease-in-out transform group-hover:scale-110 language-flag"
                aria-hidden="true"
              >
                {language.flag}
              </div>
              <h4 className="font-medium text-foreground text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                {language.name}
              </h4>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {language.localName}
              </p>
            </div>
          ))}

          <div className="flex flex-col items-center py-4 px-2 sm:p-4 md:p-6 bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5 rounded-xl border border-primary/20 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-slide-up animate-delay-last">
            <div
              className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3 animate-float"
              aria-hidden="true"
            >
              🌍
            </div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
              All Languages
            </h4>
            <p className="text-xs text-primary group-hover:text-primary/80 transition-colors duration-300">
              98+ Supported
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s backwards;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out backwards;
        }

        .animate-delay-last {
          animation-delay: 0.9s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .language-flag {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .group:hover .language-flag {
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
} 