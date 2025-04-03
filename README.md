# Video Transcriber

A modern web application that transcribes video files into text using Groq's Whisper model. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Video Transcriber Screenshot](public/screenshot.png)

## Features

- 🎥 Video to text transcription
- 🔄 Real-time progress tracking
- 📝 Download transcripts in VTT or SRT format
- 🎨 Modern, responsive UI
- 🖥️ Client-side video to audio conversion
- 🚀 Powered by Groq's Whisper model

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- FFmpeg for video processing
- Groq API for transcription
- Bun package manager

## Prerequisites

Before you begin, ensure you have installed:
- [Bun](https://bun.sh/) (Package manager)
- [Node.js](https://nodejs.org/) (v18 or higher)

You'll also need:
- A Groq API key (get one at [groq.com](https://groq.com))

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-transcriber.git
cd video-transcriber
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Drag and drop a video file or click to select one
2. Click "Generate Transcripts" to start the transcription process
3. Wait for the processing to complete
4. Download your transcription in either VTT or SRT format

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key for accessing the transcription service

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Groq](https://groq.com) for providing the Whisper model API
- [FFmpeg](https://ffmpeg.org) for video processing capabilities
- [Next.js](https://nextjs.org) for the awesome framework
