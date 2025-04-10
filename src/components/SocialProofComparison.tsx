"use client";

import { X, Check } from "lucide-react";

export function SocialProofComparison() {
  return (
    <section className="w-full py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Without SamScribe */}
          <div className="rounded-xl bg-red-50 p-4 sm:p-6 border border-red-100">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Traditional Transcription
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">Hours spent on manual transcription</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">Limited language support</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">Low accuracy and consistency</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">Complex setup and software installation</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">Expensive professional services</span>
              </div>
              <div className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">No support for multiple file formats</span>
              </div>
            </div>
          </div>

          {/* With SamScribe */}
          <div className="rounded-xl bg-green-50 p-4 sm:p-6 border border-green-100">
            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
              SamScribe Transcription
              <span className="text-xl">⚡️</span>
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Instant transcription in seconds</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Support for 95+ languages</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">99.8% accuracy guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">No setup required - just upload and go</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Affordable pricing for all creators</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Works with any audio or video format</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}