'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  icon: JSX.Element;
  items: string[];
  timeSaved: number;
}

const features: Feature[] = [
  {
    id: 'transcription',
    title: 'Transcription',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
      </svg>
    ),
    items: [
      'Automated timestamping for easy reference',
      'Speaker identification with 98% accuracy',
      'Punctuation and grammar precision',
      'Auto-formatting for readability',
      'Background noise filtering'
    ],
    timeSaved: 4
  },
  {
    id: 'audio-processing',
    title: 'Audio Processing',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
      </svg>
    ),
    items: [
      'Enhanced audio clarity algorithms',
      'Support for 50+ audio formats',
      'Audio normalization for consistent quality',
      'Background noise reduction',
      'Batch processing capabilities'
    ],
    timeSaved: 3
  },
  {
    id: 'translation',
    title: 'Translation',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
      </svg>
    ),
    items: [
      'Support for 95+ languages and dialects',
      'Context-aware translations',
      'Industry-specific terminology options',
      'Simultaneous transcription and translation',
      'Regional accent recognition'
    ],
    timeSaved: 6
  },
  {
    id: 'storage',
    title: 'Storage',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
    ),
    items: [
      'Secure encrypted cloud storage',
      'Unlimited file history',
      'Searchable transcript library',
      'Multiple export formats (TXT, DOC, SRT, PDF)',
      'Team sharing capabilities'
    ],
    timeSaved: 2
  },
  {
    id: 'accuracy',
    title: 'Accuracy',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    items: [
      '99.8% accuracy for clear audio',
      'AI-powered contextual correction',
      'Technical terminology recognition',
      'Custom vocabulary training',
      'Human-in-the-loop verification option'
    ],
    timeSaved: 5
  },
  {
    id: 'customization',
    title: 'Customization',
    icon: (
      <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    ),
    items: [
      'Custom formatting templates',
      'Branding options for exports',
      'API access for workflow integration',
      'Webhook notifications',
      'Custom metadata tagging'
    ],
    timeSaved: 3
  }
];

const moreFeatures: Feature = {
  id: 'more',
  title: 'More Features',
  icon: (
    <svg className="w-6 h-6 text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
    </svg>
  ),
  items: [
    'Team collaboration tools',
    'Realtime transcription for meetings',
    'Content summarization',
    'Sentiment analysis',
    'Keyword extraction and topic detection'
  ],
  timeSaved: 8
};

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const currentFeature = activeFeature === 'more' 
    ? moreFeatures 
    : features.find(f => f.id === activeFeature)!;

  return (
    <div className="w-full py-24 bg-white overflow-x-hidden" id="features">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supercharge your transcriptions instantly,
            <br />
            convert faster, make $
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform audio and video into accurate text at lightspeed. Spend your time building your content, not struggling with transcription. Our service provides you with the precision you need, FAST.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-[#4f46e5]/5 rounded-full">
            <svg className="w-5 h-5 text-[#4f46e5] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[#4f46e5] font-medium">Whisper powered by Groq for 216% faster speed</span>
          </div>
        </motion.div>

        {/* Features Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-4 rounded-lg transition-colors ${
                activeFeature === feature.id ? 'bg-[#4f46e5]/5' : 'bg-white group-hover:bg-[#4f46e5]/5'
              }`}>
                {feature.icon}
              </div>
              <span className={`mt-2 text-sm font-medium transition-colors ${
                activeFeature === feature.id ? 'text-[#4f46e5]' : 'text-gray-600 group-hover:text-[#4f46e5]'
              }`}>
                {feature.title}
              </span>
            </motion.button>
          ))}

          <motion.button 
            onClick={() => setActiveFeature('more')}
            className="flex flex-col items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`p-4 rounded-lg transition-colors ${
              activeFeature === 'more' ? 'bg-[#4f46e5]/5' : 'bg-white group-hover:bg-[#4f46e5]/5'
            }`}>
              {moreFeatures.icon}
            </div>
            <span className={`mt-2 text-sm font-medium transition-colors ${
              activeFeature === 'more' ? 'text-[#4f46e5]' : 'text-gray-600 group-hover:text-[#4f46e5]'
            }`}>
              More
            </span>
          </motion.button>
        </div>

        {/* Feature Content */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={currentFeature.id}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[#4f46e5]/10">
                {currentFeature.icon}
              </div>
              <h3 className="text-xl font-semibold">{currentFeature.title}</h3>
            </div>
            <ul className="space-y-4">
              {currentFeature.items.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="mt-6 flex items-center text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm font-medium">Time saved: {currentFeature.timeSaved} hours</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 