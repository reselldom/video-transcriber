'use client'

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileVideo, Download, Zap, Copy, Check } from 'lucide-react';
import { transcribe, generateSubtitleFiles } from '@/app/actions';

export default function TranscriptionForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);
  const [subtitleFiles, setSubtitleFiles] = useState<{ txt: string, vtt: string, srt: string } | null>(null);
  const [preprocessingProgress, setPreprocessingProgress] = useState(0);
  const [apiProgress, setApiProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());
  const [copySuccess, setCopySuccess] = useState(false);
  const [processingTime, setProcessingTime] = useState<number>(0);

  // Add version info
  const version = "1.0.2";
  const creator = "Fred & Sam";

  const loadFFmpeg = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    });
    setFfmpegLoaded(true);
  };

  useEffect(() => {
    loadFFmpeg();
  }, []);

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
    await ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
    
    ffmpeg.on('progress', ({ progress }) => {
      setPreprocessingProgress(Math.round(progress * 100));
    });
    
    await ffmpeg.exec(['-i', 'input.mp4', '-vn', '-acodec', 'libmp3lame', '-ar', '16000', '-ac', '1', 'output.mp3']);
    const data = await ffmpeg.readFile('output.mp3');
    return new Blob([data], { type: 'audio/mp3' });
  };

  const handleTranscribe = async () => {
    if (!file) return;
    
    setStep(3);
    if (!ffmpegLoaded) {
      await loadFFmpeg();
    }
    
    try {
      console.log("Starting audio conversion");
      setPreprocessingProgress(0);
      const startTime = Date.now();
      const audioBlob = await convertToAudio(file);
      console.log("Audio conversion complete");
      
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.mp3');
      formData.append('model', 'whisper-large-v3-turbo');
      
      console.log("Preparing to send request to Groq API");
      setApiProgress(0);
      
      // Simulate API progress
      const progressInterval = setInterval(() => {
        setApiProgress((prev) => Math.min(prev + 10, 90));
      }, 1000);
      
      const result = await transcribe(formData);
      
      clearInterval(progressInterval);
      setApiProgress(100);
      
      const endTime = Date.now();
      setProcessingTime((endTime - startTime) / 1000); // Convert to seconds
      
      console.log("Transcription result received:", result);
      
      if (result && result.text) {
        setTranscriptionResult(result.text);
        const files = await generateSubtitleFiles(result);
        setSubtitleFiles(files);
        setStep(4);
      } else {
        throw new Error("Transcription result is empty or invalid");
      }
    } catch (error: any) {
      console.error('Error during transcription:', error);
      setStep(1);
      // Display error to user
      alert(`Transcription failed: ${error.message}`);
    }
  };

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (transcriptionResult) {
      try {
        await navigator.clipboard.writeText(transcriptionResult);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const resetTranscription = () => {
    setStep(1);
    setFile(null);
    setTranscriptionResult(null);
    setSubtitleFiles(null);
    setPreprocessingProgress(0);
    setApiProgress(0);
  };

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-2 text-center">SamScribe</h1>
        <h2 className="text-lg text-center mb-6 text-gray-600">Powered by Groq</h2>
        
        {/* Progress indicators */}
        <div className="mb-6">
          {/* Checkmarks with progress bar between them */}
          <div className="flex justify-between mb-4 relative">
            {/* Progress bar in the center */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 px-4">
              <Progress 
                value={(step / 3) * 100} 
                className="h-1.5 bg-gray-200" 
              />
            </div>
            
            {/* Checkmarks */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative border-2 border-white ${
                  step > i ? 'bg-green-500 text-white' : 
                  step === i ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 
                  'bg-gray-300 text-white'
                }`}
              >
                {step > i ? <CheckCircle size={18} /> : i}
              </div>
            ))}
          </div>
        </div>
        
        {step === 1 && (
          <>
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
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full"
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
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold flex items-center"><Zap className="mr-2 text-yellow-500" size={16} />Lightning-Fast Transcription</h3>
              <p className="text-sm mt-2">Using Groq&apos;s Whisper model for fast and accurate transcription.</p>
            </div>
            
            {/* Display creator info at bottom */}
            <div className="text-center text-gray-400 text-xs mt-10">
              Created by {creator}
              <br />
              Version {version}
            </div>
          </>
        )}
        
        {step === 2 && (
          <div className="text-center">
            <p className="mb-4">Selected file: {file?.name}</p>
            <Button
              onClick={handleTranscribe}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              Generate Transcripts
            </Button>
            
            {/* Display creator info at bottom */}
            <div className="text-center text-gray-400 text-xs mt-10">
              Created by {creator}
              <br />
              Version {version}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div>
            <p className="mb-2 text-center">Processing audio...</p>
            <Progress 
              value={preprocessingProgress} 
              className="w-full mb-2 h-2 bg-gray-200" 
            />
            <p className="text-center text-sm text-gray-500">
              Couldn&apos;t process file. Please try again.
            </p>
            
            {preprocessingProgress === 100 && (
              <>
                <p className="mt-4 mb-2 text-center">Generating transcripts...</p>
                <Progress 
                  value={apiProgress} 
                  className="w-full mb-2 h-2 bg-gray-200" 
                />
                <p className="text-center text-sm text-gray-500">
                  Couldn&apos;t upload file. Please try again.
                </p>
              </>
            )}
            
            {/* Display creator info at bottom */}
            <div className="text-center text-gray-400 text-xs mt-10">
              Created by {creator}
              <br />
              Version {version}
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="text-center">
            <div className="mx-auto mb-4 bg-gray-100 rounded-full p-3 inline-block">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <p className="mb-2">Transcripts generated successfully!</p>
            <p className="text-sm text-gray-500 mb-4">
              Processing time: {processingTime.toFixed(2)} seconds
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-h-40 overflow-y-auto relative">
              <p className="text-sm text-left whitespace-pre-wrap">{transcriptionResult}</p>
              <Button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 rounded-full"
                size="sm"
              >
                {copySuccess ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </Button>
            </div>
            <div className="flex justify-center space-x-2 mt-4 mb-4">
              <Button
                onClick={() => subtitleFiles && downloadFile(subtitleFiles.txt, 'transcript.txt', 'text/plain')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-full"
              >
                TXT
              </Button>
              <Button
                onClick={() => subtitleFiles && downloadFile(subtitleFiles.vtt, 'transcript.vtt', 'text/vtt')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-full"
              >
                VTT
              </Button>
              <Button
                onClick={() => subtitleFiles && downloadFile(subtitleFiles.srt, 'transcript.srt', 'application/x-subrip')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-full"
              >
                SRT
              </Button>
            </div>
            <Button
              onClick={resetTranscription}
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full mt-2"
            >
              New Transcription
            </Button>
            
            {/* Display creator info at bottom */}
            <div className="text-center text-gray-400 text-xs mt-10">
              Created by {creator}
              <br />
              Version {version}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}