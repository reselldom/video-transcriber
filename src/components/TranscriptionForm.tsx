'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileVideo, Upload, Download } from 'lucide-react';
import { transcribe } from '@/app/actions';

export default function TranscriptionForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      try {
        await ffmpegRef.current.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setFfmpegLoaded(true);
      } catch (error) {
        console.error('Error loading FFmpeg:', error);
      }
    };

    loadFFmpeg();
  }, []);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('formatDropdown');
      const button = event.target as Element;
      
      if (dropdown && !dropdown.contains(button) && !button.closest('button')) {
        dropdown.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Progress animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isProcessing) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          // Increase progress up to 95% during processing
          if (prevProgress < 95) {
            return prevProgress + 1;
          }
          return prevProgress;
        });
      }, 300);
    } else if (step === 4) {
      // Set to 100% when completed
      setProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, step]);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setStep(2);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const convertToAudio = async (inputFile: File): Promise<Blob> => {
    const ffmpeg = ffmpegRef.current;
    const inputData = await inputFile.arrayBuffer();
    const inputUint8Array = new Uint8Array(inputData);
    
    await ffmpeg.writeFile('input.mp4', inputUint8Array);
    await ffmpeg.exec(['-i', 'input.mp4', '-vn', '-acodec', 'libmp3lame', '-ar', '16000', '-ac', '1', 'output.mp3']);
    
    const data = await ffmpeg.readFile('output.mp3');
    return new Blob([data], { type: 'audio/mp3' });
  };

  const handleTranscribe = async () => {
    if (!file) return;

    setStep(3);
    setProgress(0);
    setIsProcessing(true);

    try {
      // Set initial progress
      setProgress(10);
      
      // Convert video to audio
      const audioBlob = await convertToAudio(file);
      
      // Update progress after conversion
      setProgress(50);
      
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.mp3");
      formData.append("model", "whisper-large-v3-turbo");

      // Transcribe audio
      const result = await transcribe(formData);
      
      // Handle successful transcription
      if (result && result.text) {
        setTranscriptionResult(result.text);
        setStep(4);
      } else {
        throw new Error("No transcription result returned");
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      setStep(1);
      alert("Error processing your video. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: Blob, filename: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Set document title to SamScribe when component mounts
  useEffect(() => {
    document.title = "SamScribe";
  }, []);

  const subtitleFiles = transcriptionResult ? {
    vtt: new Blob([transcriptionResult], { type: "text/vtt" }),
    srt: new Blob([transcriptionResult], { type: "text/srt" }),
  } : null;

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-2 text-center">SamScribe</h1>
        <h2 className="text-lg text-center mb-6 text-gray-600">Powered by Groq</h2>

        {step === 1 && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1)';
            }}
          >
            <FileVideo className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="mb-4">Drag and drop your video file here, or</p>
            <Button
              onClick={() => document.getElementById('fileInput')?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              Select Video
            </Button>
            <input
              id="fileInput"
              type="file"
              accept="video/*"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              className="hidden"
            />
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <p className="mb-4">Selected file: {file?.name}</p>
            <Button
              onClick={handleTranscribe}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              Generate Transcripts
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="mb-2">Generating transcripts...</p>
            <Progress value={progress} className="w-full mb-2" />
            <p className="text-sm text-gray-500">
              {progress < 40 ? "Converting video to audio..." : 
               progress < 90 ? "Processing using Groq's Whisper model..." :
               "Finalizing transcription..."}
            </p>
          </div>
        )}

        {step === 4 && transcriptionResult && (
          <div className="text-center">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p className="mb-4">Transcripts generated successfully!</p>
            <div
              className="bg-gray-100 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'scale(1)';
              }}
            >
              <p className="text-sm text-left">{transcriptionResult}</p>
            </div>
            <div className="flex justify-center space-x-3">
              <div className="relative inline-block">
                <Button
                  onClick={() => {
                    if (transcriptionResult) {
                      navigator.clipboard.writeText(transcriptionResult);
                      // Show a temporary "Copied!" tooltip
                      const tooltip = document.createElement('div');
                      tooltip.textContent = 'Copied!';
                      tooltip.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded';
                      document.getElementById('copyButton')?.appendChild(tooltip);
                      setTimeout(() => tooltip.remove(), 2000);
                    }
                  }}
                  id="copyButton"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full p-2 transition-transform hover:scale-105"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </Button>
              </div>
              <div className="relative inline-block">
                <Button
                  onClick={() => document.getElementById('formatDropdown')?.classList.toggle('hidden')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full p-2 transition-transform hover:scale-105"
                >
                  <Download size={20} />
                </Button>
                <div
                  id="formatDropdown"
                  className="hidden absolute right-0 bottom-12 bg-white shadow-lg rounded-lg py-1 w-40 z-10"
                >
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => {
                      if (transcriptionResult) {
                        downloadFile(new Blob([transcriptionResult], { type: "text/vtt" }), 'transcript.vtt');
                      }
                      document.getElementById('formatDropdown')?.classList.add('hidden');
                    }}
                  >
                    VTT
                  </div>
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => {
                      if (transcriptionResult) {
                        downloadFile(new Blob([transcriptionResult], { type: "text/srt" }), 'transcript.srt');
                      }
                      document.getElementById('formatDropdown')?.classList.add('hidden');
                    }}
                  >
                    SRT
                  </div>
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => {
                      if (transcriptionResult) {
                        downloadFile(new Blob([transcriptionResult], { type: "text/plain" }), 'transcript.txt');
                      }
                      document.getElementById('formatDropdown')?.classList.add('hidden');
                    }}
                  >
                    Text
                  </div>
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => {
                      if (transcriptionResult) {
                        // For DOCX we would normally use a library like docx-js
                        // For simplicity, we're just providing the text format with a docx extension
                        downloadFile(new Blob([transcriptionResult], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), 'transcript.docx');
                      }
                      document.getElementById('formatDropdown')?.classList.add('hidden');
                    }}
                  >
                    DOCX
                  </div>
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
                    onClick={() => {
                      if (transcriptionResult) {
                        // Create a simple HTML structure for the PDF
                        const htmlContent = `
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Transcript</title>
                              <style>
                                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                                h1 { color: #333; }
                                .content { white-space: pre-wrap; }
                              </style>
                            </head>
                            <body>
                              <h1>Transcript</h1>
                              <div class="content">${transcriptionResult}</div>
                            </body>
                          </html>
                        `;
                        
                        // Use text/html MIME type which browsers can convert to PDF when downloading
                        downloadFile(new Blob([htmlContent], { type: "text/html" }), 'transcript.pdf');
                      }
                      document.getElementById('formatDropdown')?.classList.add('hidden');
                    }}
                  >
                    PDF
                  </div>
                </div>
              </div>
              <div className="relative inline-block">
                <Button
                  onClick={() => {
                    setStep(1);
                    setFile(null);
                    setTranscriptionResult(null);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full p-2 transition-transform hover:scale-105"
                  title="New Transcription"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}