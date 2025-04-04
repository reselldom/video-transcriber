'use server'

interface Word {
  word: string;
  start: number;
  end: number;
}

interface Segment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResponse {
  text: string;
  segments: Segment[];
}

export async function transcribe(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Update the formData to request verbose_json format
    formData.set('response_format', 'verbose_json');
    
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Transcription request failed');
    }
    
    const result = await response.json();
    console.log('Transcription result:', result); // Log the result for debugging
    return result as TranscriptionResponse;
  } catch (error) {
    console.error('Error in transcribe action:', error);
    throw error;
  }
}

function formatTimestamp(seconds: number, format: 'srt' | 'vtt'): string {
  const date = new Date(seconds * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const secs = date.getUTCSeconds().toString().padStart(2, '0');
  const ms = Math.floor(date.getUTCMilliseconds()).toString().padStart(3, '0');
  
  if (format === 'vtt') {
    return `${hours}:${minutes}:${secs}.${ms}`;
  } else {
    return `${hours}:${minutes}:${secs},${ms}`;
  }
}

function splitTextIntoLines(text: string, maxChars: number = 42): string[] {
  const lines: string[] = [];
  let currentLine = '';
  
  // Split by words and handle punctuation
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
    
    if (nextLine.length <= maxChars) {
      currentLine = nextLine;
    } else {
      // Push current line if not empty
      if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Handle words longer than maxChars by splitting them
        let remainingWord = word;
        while (remainingWord.length > maxChars) {
          lines.push(remainingWord.slice(0, maxChars));
          remainingWord = remainingWord.slice(maxChars);
        }
        currentLine = remainingWord;
      }
    }
  }
  
  // Add the last line if not empty
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return lines;
}

export async function generateSubtitleFiles(transcription: TranscriptionResponse): Promise<{ txt: string; vtt: string; srt: string }> {
  let txt = transcription.text;
  let vtt = 'WEBVTT\n\n';
  let srt = '';
  let srtCounter = 1;
  
  transcription.segments.forEach((segment) => {
    const startTime = formatTimestamp(segment.start, 'vtt');
    const endTime = formatTimestamp(segment.end, 'vtt');
    const text = segment.text.trim();
    
    // Split text into lines with strict 42 char limit
    const lines = splitTextIntoLines(text);
    
    // Format VTT - each line gets its own timestamp
    lines.forEach((line) => {
      vtt += `${startTime} --> ${endTime}\n${line}\n\n`;
    });
    
    // Format SRT - each line gets its own timestamp and number
    lines.forEach((line) => {
      srt += `${srtCounter}\n`;
      srt += `${formatTimestamp(segment.start, 'srt')} --> ${formatTimestamp(segment.end, 'srt')}\n`;
      srt += `${line}\n\n`;
      srtCounter++;
    });
  });
  
  return { txt, vtt, srt };
}