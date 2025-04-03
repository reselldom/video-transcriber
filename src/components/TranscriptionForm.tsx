'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileVideo, Upload } from 'lucide-react';
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
      formData.append("model", "distil-whisper-large-v3-en");

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

  const subtitleFiles = transcriptionResult ? {
    vtt: new Blob([transcriptionResult], { type: "text/vtt" }),
    srt: new Blob([transcriptionResult], { type: "text/srt" }),
  } : null;

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-2 text-center">Video Transcriber</h1>
        <h2 className="text-lg text-center mb-6 text-gray-600">Powered by Groq</h2>

        {step === 1 && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileVideo className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="mb-4">Drag and drop your video file here, or</p>
            <Button
              onClick={() => document.getElementById('fileInput')?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
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
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto">
              <p className="text-sm text-left">{transcriptionResult}</p>
            </div>
            <div className="flex space-x-2 justify-center">
              <Button
                onClick={() => subtitleFiles && downloadFile(subtitleFiles.vtt, 'transcript.vtt')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                <Upload className="mr-2" size={16} />
                Download VTT
              </Button>
              <Button
                onClick={() => subtitleFiles && downloadFile(subtitleFiles.srt, 'transcript.srt')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
              >
                <Upload className="mr-2" size={16} />
                Download SRT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}